import { PolymerElement, html } from "@polymer/polymer";
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import { getCharacterChannel, getSelectedCharacter, getClassReferences, setClassLevels, mergeSubclass, setClassSkillProficiencies, getSubclassChoiceLevel, mergeFeature, setSubclassChoice, setClassChoice, getSubclassChoice, getClassChoice} from "../../../util/charBuilder";
import "@vaadin/vaadin-grid";
import "../../dnd-select-add";
import "../../dnd-switch";
import "../../dnd-button";
import "../../dnd-asi-select";
import "../../dnd-svg";
import { jqEmpty, getEntryName } from "../../../js/utils";
import { classOptionsMap } from "../../../data/choices";
import EntryRenderer from "../../../util/entryrender";
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import { getEditModeChannel } from "../../../util/editMode";
import {filterModel} from "../../../util/data";

class DndCharacterBuilderClass extends MutableData(PolymerElement) {
  
  static get properties() {
    return {
      levels: {
        type: Array,
        value: []
      },
      classes: {
        type: Object,
      },
      subclasses: {
        type: Object,
        value: undefined
      },
      heightByRows: {
        type: Boolean,
        value: () => {
          return window.innerWidth < 900;
        }
      },
      isEditMode: {
        type: Boolean,
        value: false
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  ready() {
    super.ready();

    const renderer = new EntryRenderer();

    setTimeout(() => {
      const grid = this.$.classGrid;
      let draggedItem;

      grid.rowDetailsRenderer = ((root, grid, rowData) => {
        if (!root.firstElementChild) {
          root.innerHTML =
          '<div class="details" id="stats"></div>';
        }
        let renderStack = [],
          features = this._getClassLevelFeatures(this.levels, rowData.index, this.classes, this.subclasses);
        
        for (let feature of features) {
          renderer.recursiveEntryRender(
            feature,
            renderStack,
            0,
            undefined,
            true
          );
        }

        const deets = root.querySelector('.details');
        jqEmpty(deets);
        deets.innerHTML = renderStack.join("");
      }).bind(this);

      grid.addEventListener('grid-dragstart', function(e) {
        draggedItem = e.detail.draggedItems[0];
        grid.dropMode = 'between';
      });

      grid.addEventListener('grid-dragend', function(e) {
        draggedItem = grid.dropMode = null;
      });

      grid.addEventListener('grid-drop', function(e) {
        const dropTargetItem = e.detail.dropTargetItem;
        if (draggedItem && draggedItem !== dropTargetItem) {
          // Reorder the items
          const items = grid.items.filter(function(i) {
            return i !== draggedItem;
          });
          const dropIndex = items.indexOf(dropTargetItem)
            + (e.detail.dropLocation === 'below' ? 1 : 0);
          items.splice(dropIndex, 0, draggedItem);
          setClassLevels(items);
        }
      });
    }, 0);
  }

  async updateFromCharacter(character) {
    this.character = character;
    this.classes = await getClassReferences(character);
    this.subclasses = JSON.parse(JSON.stringify(character.subclasses));

    this.classChoices = await this._findLevelChoices(character, this.classes);

    this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));

    this.levels = character.levels;
    this.$.classGrid.clearCache();
  }

  _getClassLevelFeatures(levels, index, classes, subclasses) {
    if (classes && levels[index]) {
      const className = levels[index].name;
      const classRef = classes[className];

      if (classRef) {
        const classFeatures = classRef.classFeatures;
        let levelsInClass = 0;
        let levelsInSubclass = -1;

        if (levels.length >= index + 1) {
          for (let i = 0; i < index; i ++) {
            if (levels[i].name === className) {
              levelsInClass ++;

              const classFeaturesForLevel = classFeatures[levelsInClass];
              if (classFeaturesForLevel) {
                const hasSubclassFeature = classFeaturesForLevel.find(i => i.gainSubclassFeature);
                if (hasSubclassFeature) {
                  levelsInSubclass ++;
                }
              }
            }
          }

          const classFeaturesForLevel = classFeatures[levelsInClass];
          if (classFeaturesForLevel) {
            const hasSubclassFeature = classFeaturesForLevel.find(i => i.gainSubclassFeature);
            if (hasSubclassFeature && subclasses && subclasses[className] && classRef.subclasses && classRef.subclasses.length) {
              const subclassDef = classRef.subclasses.find(i => subclasses[className].name === i.name);
              if (subclassDef.subclassFeatures[levelsInSubclass]) {
                subclassDef.subclassFeatures[levelsInSubclass].map((i) => { i.isSubclass = true; return i; })
                return [...classFeaturesForLevel].concat(subclassDef.subclassFeatures[levelsInSubclass]);
              }
            }
            return classFeaturesForLevel;
          }
        }
      }
    }
  }

  _getClassLevelFeatureStringArray(levels, index, classes, subclasses) {
    if (levels && index !== undefined && classes && subclasses) {
      const classLevelFeatures = this._getClassLevelFeatures(levels, index, classes, subclasses);

      if (classLevelFeatures) {
        return classLevelFeatures.map(f => {
          return { name: getEntryName(f), isSubclass: f.isSubclass };
        });
      }
    }
  }

  _level(index) {
    return index + 1;
  }

  _deleteLevel(e) {
    let index = e.model.__data.index;
    this.levels.splice(index, 1);
    setClassLevels(this.levels);
  }

  _expandDetails(e) {
    let data = e.model.__data.item,
      stayClosed = this.$.classGrid.detailsOpenedItems.indexOf(data) > -1;

    for (let item of this.$.classGrid.detailsOpenedItems) {
      this.$.classGrid.closeItemDetails(item);
    }

    if (stayClosed) {
      this.$.classGrid.closeItemDetails(data);
    } else {
      this.$.classGrid.openItemDetails(data);
    }
  }

  async _findLevelChoices(character, classes) {
    const levelChoices = [];
    if (character && character.levels && character.levels.length) {
      for (let i = 0; i < character.levels.length; i++) {
        levelChoices.push(await this._findChoices(character, classes, i));
      }
    }
    return levelChoices;
  }

  async _findChoices(character, classes, levelIndex) {
    if (classes && character.levels && character.levels.length && character.levels.length > levelIndex) {
      let levels = character.levels,
        subclasses = character.subclasses,
        name = levels[levelIndex].name,
        classDef = classes[name];

      if (classDef) {
        let choices = [],
          classLevelCount = 0,
          subclassChoiceLevel = getSubclassChoiceLevel(classDef);

        for (let i = 0; i <= levelIndex; i++) {
          let level = levels[i]
          if (level.name === name) {
            classLevelCount ++;
          }
        }

        if (subclassChoiceLevel !== undefined && classLevelCount === subclassChoiceLevel) {
          choices.push({
            id: "subclass",
            from: classDef.subclasses,
            selections: character.subclasses[name]
          });
        }

        let features = this._getClassLevelFeatures(levels, levelIndex, classes);
        if (features && features.length
            && features.find((f) => { return f.name === "Ability Score Improvement"; })) {
          choices.push({
            id: "asi"
          });
        }

        if (levelIndex === 0) {
          const classSkillOptions = classDef.startingProficiencies.skills[0].choose;
          choices.push({
            id: "profs",
            count: classSkillOptions.count,
            from: classSkillOptions.from,
            selections: character.classSkillProficiencies
          });
        }

        if (classLevelCount) {
          const classOptions = classOptionsMap[name.toLowerCase()];

          if (classOptions && classOptions.class && classOptions.class[classLevelCount]) {
            const classLevelOptions = [].concat(classOptions.class[classLevelCount]);
            
            for (const classLevelOption of classLevelOptions) {
              if (classLevelOption.options) {
                choices.push({
                  id: "classFeature",
                  name: classLevelOption.name,
                  from: classLevelOption.options,
                  count: classLevelOption.count > 1 ? classLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  feature: classLevelOption.name,
                  level: classLevelCount,
                  selections: getClassChoice(name.toLowerCase(), classLevelCount, classLevelOption.name)
                });
              } else if (classLevelOption.type) {
                const options = await filterModel("features", classLevelOption.type);
                choices.push({
                  id: "classFeature",
                  name: classLevelOption.name,
                  from: options,
                  count: classLevelOption.count > 1 ? classLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  feature: classLevelOption.name,
                  level: classLevelCount,
                  selections: getClassChoice(name.toLowerCase(), classLevelCount, classLevelOption.name)
                });
              }
            }
          }

          if (classOptions && classOptions.subclasses && subclasses[name] && classOptions.subclasses[subclasses[name]] && classOptions.subclasses[subclasses[name]][classLevelCount]) {
            const subclassLevelOptions = [].concat(classOptions.subclasses[subclasses[name]][classLevelCount]);
            
            for (const subclassLevelOption of subclassLevelOptions) {
              if (subclassLevelOption.options) {
                choices.push({
                  id: "subclassFeature",
                  name: subclassLevelOption.name,
                  from: subclassLevelOption.options,
                  count: subclassLevelOption.count > 1 ? subclassLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  subclass: subclasses[name],
                  feature: subclassLevelOption.name,
                  level: classLevelCount,
                  selections: getSubclassChoice(name.toLowerCase(), subclasses[name], classLevelCount, subclassLevelOption.name)
                });
              } else if (subclassLevelOption.type) {
                const options = await filterModel("features", subclassLevelOption.type);
                choices.push({
                  id: "subclassFeature",
                  name: subclassLevelOption.name,
                  from: options,
                  count: subclassLevelOption.count > 1 ? subclassLevelOption.count : undefined,
                  class: name.toLowerCase(),
                  subclass: subclasses[name],
                  feature: subclassLevelOption.name,
                  level: classLevelCount,
                  selections: getSubclassChoice(name.toLowerCase(), subclasses[name], classLevelCount, subclassLevelOption.name)
                });
              }
            }
          }
        }

        return choices;
      }
    }
    return [];
  }

  _equal(a, b) {
    return a === b;
  }

  _genSubclassCallback(level) {
    return (subclass) => {
      mergeSubclass(undefined, level.name, subclass);
    }
  }

  _genSubclassOptions(level) {
    return this.classes[level.name].subclasses;
  }

  _getSubclassSelection(level, subclasses) {
    return subclasses[level.name];
  }

  _classFeatureOptionAddCallback(classs, level, feature) {
    return (choice) => {
      let adjChoice;
      if (Array.isArray(choice)) {
        adjChoice = choice.map(c => {
          if (c.name) {
            return { name: c.name, source: c.source }
          } else {
            return c;
          }
        });
      } else if (choice.name) {
        adjChoice = { name: choice.name, source: choice.source };
      } else {
        adjChoice = choice;
      }
      setClassChoice(classs, level, feature, adjChoice);
    };
  }

  _subclassFeatureOptionAddCallback(classs, subclass, level, feature) {
    return (choice) => {
      let adjChoice;
      if (Array.isArray(choice)) {
        adjChoice = choice.map(c => {
          if (c.name) {
            return { name: c.name, source: c.source }
          } else {
            return c;
          }
        });
      } else if (choice.name) {
        adjChoice = { name: choice.name, source: choice.source };
      } else {
        adjChoice = choice;
      }
      setSubclassChoice(classs, subclass, level, feature, adjChoice);
    };
  }

  _indexOfLevel(level, levels) {
    return levels.indexOf(level);
  }

  _isMobile() {
    return window.innerWidth < 921;
  }

  _objArray(obj) {
    return Object.values(obj);
  }

  _atIndex(data, index) {
    return data ? data[index] : null;
  }

  _svgFromClass(className) {
    return className ? className.replace(/(\s|\(|\))/g, "") : '';
  }

  _addClassLevel(e) {
    mergeFeature(undefined, e.model.item, "classes");
  }

  _classSkillAddCallback(skills) {
    setClassSkillProficiencies(skills);
  }

  static get template() {
    return html`
      <style include="material-styles my-styles">
        .something {
          display: block;
        }
        #stats {
          margin-top: 16px;
          line-height: 1.9;
        }
        .details {
          padding: 0 24px;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 5px;
          align-items: center;
        }

        .button-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px;
        }
        .button-wrap > * {
          margin: 4px;
        }

        .row {
          position: relative;
        }
        .row:after {
          content: "";
          display: table;
          clear: both;
        }

        .open-details {
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .open-details:hover {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
          padding: 6px 0;
        }
        .level-col__level {
          margin-right: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .level-col__image-wrap {
          width: 30px;
          position: relative;
          height: 21px;
          display: inline-block;
        }
        .level-col__image {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: -1px;
        }
        .level-col__class {
          font-size: 20px;
          font-weight: bold;
        }

        .features-col {
          white-space: normal;
          margin: 0;
          padding: 8px 0;
          width: 100%;
          font-size: 15px;
        }
        .class-feature:not(:last-of-type)::after {
          content: ', ';
        }
        .class-feature[subclass] {
          color: var(--mdc-theme-secondary);
        }

        .choices-col {
          display: flex;
          float: left;
          flex-wrap: wrap;
        }
        .choices-col__choice {
          margin-top: 10px;
          margin-right: 16px;
        }
        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          position: absolute;
          right: -8px;
          top: 4px;
        }
        .delete-btn {
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
        }
        .delete-btn:hover {
          color: var(--mdc-theme-secondary);
        }
        .details {
          padding: 0 6px;
        }
        @media(min-width: 921px) {
          .open-details {
            flex-wrap: nowrap;
          }
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
            font-size: 16px;
          }
        }
      </style>

      <div class="heading-wrap">
        <dnd-select-add model="classes" placeholder="Add a Level"></dnd-select-add>
      </div>
      <div class="button-wrap">
        <template is="dom-repeat" items="[[_objArray(classes)]]">
          <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
        </template>
      </div>

      <vaadin-grid id="classGrid" rows-draggable items=[[levels]] theme="no-border" height-by-rows$="[[heightByRows]]">
        <vaadin-grid-column flex-grow="1">
          <template>
            <div class="row">
              <div class="open-details" on-click="_expandDetails">
                <div class="level-col">
                  <span class="level-col__level">[[_level(index)]]</span>
                  <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                  <span class="level-col__class">[[item.name]]</span>
                </div>

                <div class="features-col">
                  <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses)]]">
                    <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                  </template>
                </div>
              </div>

              <div class="choices-col">
                <template is="dom-repeat" items="[[_atIndex(classChoices, index)]]" as="choice">
                  <div class="choices-col__choice">
                    <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                      <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item)]]"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                      <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]"></dnd-asi-select>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'profs')]]">
                      <dnd-select-add choices="[[choice.count]]" label="Skill Proficiency" placeholder="<Choose Skills>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                      <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                      <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
                    </template>
                  </div>
                </template>
              </div>

              <div class="delete-col">
                <button class="mdc-icon-button material-icons delete-btn" on-click="_deleteLevel">close</button>
              </div>
            </div>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

customElements.define("dnd-character-builder-class", DndCharacterBuilderClass);