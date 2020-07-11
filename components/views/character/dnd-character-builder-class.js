import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter, getClassReferences, setClassLevels } from "../../../util/charBuilder";
import "@vaadin/vaadin-grid";
import "../../dnd-class-add";

class DndCharacterBuilderClass extends PolymerElement {
  
  static get properties() {
    return {
      levels: {
        type: Array,
        value: []
      },
      classes: {
        type: Object,
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

    setTimeout(() => {
      const grid = this.$.classGrid;
      let draggedItem;

      grid.rowDetailsRenderer = function(root, grid, rowData) {
        if (!root.firstElementChild) {
          root.innerHTML =
          '<div class="details">' +
          '<img><p><span></span><br>' +
          '<small></small></p>' +
          '</div>';
        }
        root.firstElementChild.querySelector('img').src = rowData.item.picture.large;
        root.firstElementChild.querySelector('span').textContent = 'Hi! My name is ' + rowData.item.name.first + '!';
        root.firstElementChild.querySelector('small').textContent = rowData.item.email;
      };

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
    this.levels = character.levels;
    this.classes = await getClassReferences(character);
    this.$.classGrid.clearCache();
  }

  _getClassLevelFeatures(levels, name, index, classes) {
    if (classes) {
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

  _getClassLevelFeatureString(levels, name, index, classes) {
    const classLevelFeatures = this._getClassLevelFeatures(levels, name, index, classes);

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

  static get template() {
    return html`
      <style include="material-styles">
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>

      <vaadin-grid id="classGrid" rows-draggable items=[[levels]]>
        <vaadin-grid-column width="60px" flex-grow="0">
          <template class="header">#</template>
          <template>[[_level(index)]]</template>
        </vaadin-grid-column>

        <vaadin-grid-column flex-grow="0" header="Class" path="name"></vaadin-grid-column>

        <vaadin-grid-column flex-grow="1">
          <template class="header">Features</template>
          <template>[[_getClassLevelFeatureString(levels, item.name, index, classes)]]</template>
        </vaadin-grid-column>

        <vaadin-grid-column flex-grow="0">
          <template>
            <button class="mdc-icon-button material-icons" on-click="_deleteLevel">close</button>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>

      <dnd-class-add></dnd-class-add>
    `;
  }
}

customElements.define("dnd-character-builder-class", DndCharacterBuilderClass);