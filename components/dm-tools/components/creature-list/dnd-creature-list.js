import './dnd-creature-list-filter.js';
import './dnd-creature-list-tab.js';
import './dnd-creature-list-item.js';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
class CreatureList extends AsyncActionsMixin(ReduxMixin(Polymer.Element)) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon.css">
    <style>
      .wrapper {
        display: flex;
        flex-direction: column;
      }
      vaadin-grid {
        height: calc(100vh - 306px);
      }
    </style>

    <dnd-creature-list-tab></dnd-creature-list-tab>

    <div class="wrapper">
      <dnd-creature-list-filter></dnd-creature-list-filter>

      <vaadin-grid id="grid" items="[[creatures]]" active-item="{{activeItem}}">
        <vaadin-grid-column>
          <template>
            <dnd-creature-list-item item="[[item]]" model="[[model]]" selected\$="[[selected]]"></dnd-creature-list-item>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    </div>
`;
  }

  static get is() {
    return 'dnd-creature-list';
  }

  static get properties() {
    return {
      creatures: {
        type: Array,
        statePath: 'cursor.creatures',
      },
      selection: {
        type: Object,
        statePath: 'selection.creature',
      },
      activeItem: {
        type: Object,
      },
      model: {
        type: String,
        statePath: 'cursor.model',
      },
    };
  }

  static get observers() {
    return [
      'creatureListChange(creatures)',
      'selectionChange(selection)',
      'activeItemChange(activeItem)',
    ];
  }

  creatureListChange() {
    this.$.grid.$.table.scrollTop = 0;
  }

  selectionChange(item) {
    this.$.grid.selectedItems = [];

    if (item) {
      for (let creature of this.creatures) {
        if (creature.model === item.model && creature._id === item._id) {
          this.$.grid.selectedItems = [creature];
          break;
        }
      }
    }
  }

  activeItemChange(item) {
    this.dispatch({
      type: 'SET_SELECTION',
      selection: { model: this.model, creature: this.activeItem },
    });
  }
}
window.customElements.define(CreatureList.is, CreatureList);
