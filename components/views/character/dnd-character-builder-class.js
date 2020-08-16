import { PolymerElement, html } from "@polymer/polymer";
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import { getCharacterChannel, getSelectedCharacter, getClassReferences, setClassLevels, mergeSubclass, setClassSkillProficiencies, getSubclassChoiceLevel, mergeFeature} from "../../../util/charBuilder";
import "@vaadin/vaadin-grid";
import "../../dnd-select-add";
import "../../dnd-switch";
import "../../dnd-button";
import "../../dnd-asi-select";
import { jqEmpty, getEntryName } from "../../../js/utils";
import EntryRenderer from "../../../util/entryrender";
import { } from '@polymer/polymer/lib/elements/dom-if.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';

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
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
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
    this.levels = character.levels;
    this.classes = await getClassReferences(character);
    this.subclasses = JSON.parse(JSON.stringify(character.subclasses));
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
              const subclassDef = classRef.subclasses.find(i => subclasses[className] === i.name);
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

  _findChoices(levels, name, index, classes) {
    if (classes && name && levels && levels.length && index < levels.length) {
      let classDef = classes[name];

      if (classDef) {
        let choices = [],
          subclassChoiceLevel = getSubclassChoiceLevel(classDef);

        if (subclassChoiceLevel !== undefined) {
          let classLevelCount = 0;
          for (let i = 0; i <= index; i++) {
            let level = levels[i]
            if (level.name === name) {
              classLevelCount ++;
            }
          }

          if (classLevelCount === subclassChoiceLevel) {
            choices.push({id: "subclass"});
          }
        }

        let features = this._getClassLevelFeatures(levels, index, classes);
        if (features && features.length
            && features.find((f) => { return f.name === "Ability Score Improvement"; })) {
          choices.push({id: "asi"});
        }

        if (index === 0) {
          const classSkillOptions = classDef.startingProficiencies.skills[0].choose;
          choices.push({
            id: "profs",
            count: classSkillOptions.count,
            from: classSkillOptions.from,
            selections: this.character.classSkillProficiencies
          });
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

  _indexOfLevel(level, levels) {
    return levels.indexOf(level);
  }

  _isMobile() {
    return window.innerWidth < 921;
  }

  _objArray(obj) {
    return Object.values(obj);
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
        vaadin-grid {
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        #stats {
          margin-top: 0px;
        }
        .details {
          padding: 0 24px;
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
          margin: 10px;
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
          align-items: center;
        }
        .open-details:hover {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .level-col__level {
          margin-right: 10px;
          position: relative;
          top: -2px;
        }
        .level-col__class {
          font-size: 20px;
        }

        .features-col {
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0 30px 0 12px;
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
          right: 0;
          top: 0;
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
      </style>

      <div class="button-wrap">
        <dnd-select-add model="classes" placeholder="Add a Level"></dnd-select-add>
        <template is="dom-repeat" items="[[_objArray(classes)]]">
          <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
        </template>
      </div>

      <vaadin-grid id="classGrid" rows-draggable height-by-rows items=[[levels]] theme="no-border">
        <vaadin-grid-column flex-grow="1">
          <template>
            <div class="row">
              <div class="open-details" on-click="_expandDetails">
                <div class="level-col">
                  <span class="level-col__level">[[_level(index)]]</span>
                  <span class="level-col__class">[[item.name]]</span>
                </div>

                <div class="features-col hidden-mobile-down">
                  <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses)]]">
                    <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                  </template>
                </div>
              </div>

              <div class="choices-col">
                <template is="dom-repeat" items="[[_findChoices(levels, item.name, index, classes)]]" as="choice">
                  <div class="choices-col__choice">
                    <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                      <dnd-select-add class="choices-col__subclass-choice" label="Subclass" add-callback="[[_genSubclassCallback(item)]]" options="[[_genSubclassOptions(item)]]" value="[[_getSubclassSelection(item, subclasses, character)]]" placeholder="<Choose Subclass>"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                      <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]"></dnd-asi-select>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'profs')]]">
                      <dnd-select-add choices="[[choice.count]]" label="Skill Proficiency" placeholder="<Choose Skills>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
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