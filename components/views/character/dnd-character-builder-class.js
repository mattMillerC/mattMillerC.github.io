import { PolymerElement, html } from "@polymer/polymer";
import { MutableData } from '@polymer/polymer/lib/mixins/mutable-data.js';
import { getCharacterChannel, getSelectedCharacter, getClassReferences, setClassLevels, mergeSubclass, addFeature, getSubclassChoiceLevel} from "../../../util/charBuilder";
import "@vaadin/vaadin-grid";
import "../../dnd-select-add";
import "../../dnd-switch";
import "../../dnd-asi-select";
import { jqEmpty } from "../../../js/utils";
import EntryRenderer from "../../../util/entryrender";

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
          features = this._getClassLevelFeatures(this.levels, rowData.index, this.classes);
        
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

  _getClassLevelFeatures(levels, index, classes) {
    if (classes && levels[index]) {
      const name = levels[index].name;
      const classRef = classes[name];

      if (classRef) {
        const classFeatures = classRef.classFeatures;
        let levelsInClass = 0;

        if (levels.length >= index + 1) {
          for (let i = 0; i < index; i ++) {
            if (levels[i].name === name) {
              levelsInClass ++;
            }
          }

          if (classFeatures[levelsInClass]) {
            return classFeatures[levelsInClass];
          }
        }
      }
    }
  }

  _getClassLevelFeatureString(levels, index, classes) {
    const classLevelFeatures = this._getClassLevelFeatures(levels, index, classes);

    if (classLevelFeatures) {
      return classLevelFeatures.map(f => {return f.name}).join(', ');
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
            choices.push("subclass");
          }
        }

        let features = this._getClassLevelFeatures(levels, index, classes);
        if (features && features.length
            && features.find((f) => { return f.name === "Ability Score Improvement"; })) {
          choices.push("asi");
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

  static get template() {
    return html`
      <style include="material-styles my-styles">
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #stats {
          margin-top: 0px;
        }
        .details {
          padding: 0 24px;
        }
        .remove-btn {
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
        }
        .subclass-add {
          display: block;
        }
        .features-col {
          width: 100%;
          height: 48px;
          white-space: break-spaces;
          display: flex;
          align-items: center;
        }
      </style>

      <vaadin-grid id="classGrid" rows-draggable items=[[levels]]>
        <vaadin-grid-column width="42px" flex-grow="0">
          <template class="header">#</template>
          <template><div on-click="_expandDetails">[[_level(index)]]</div></template>
        </vaadin-grid-column>

        <vaadin-grid-column flex-grow="0" header="Class" path="name"></vaadin-grid-column>

        <vaadin-grid-column flex-grow="4">
          <template class="header">Features</template>
          <template><div class="features-col"><span>[[_getClassLevelFeatureString(levels, index, classes)]]</span></div></template>
        </vaadin-grid-column>

        <vaadin-grid-column width="140px">
          <template>
            <template is="dom-repeat" items="[[_findChoices(levels, item.name, index, classes)]]" as="choice">
              <template is="dom-if" if="[[_equal(choice, 'subclass')]]">
                <dnd-select-add class="subclass-add" label="Subclass" add-callback="[[_genSubclassCallback(item)]]" options="[[_genSubclassOptions(item)]]" value="[[_getSubclassSelection(item, subclasses, character)]]" placeholder="<Choose Subclass>"></dnd-select-add>
              </template>
              <template is="dom-if" if="[[_equal(choice, 'asi')]]">
                <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]"></dnd-asi-select>
              </template>
            </template>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column width="56px" flex-grow="0">
          <template>
            <button class="mdc-icon-button material-icons remove-btn" on-click="_deleteLevel">close</button>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>

      <dnd-select-add model="classes" placeholder="Add a Level"></dnd-select-add>
    `;
  }
}

customElements.define("dnd-character-builder-class", DndCharacterBuilderClass);