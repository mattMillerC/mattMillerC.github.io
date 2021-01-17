import './redux-store.js';
import './theme/dnd-vaadin-theme-split.js';
import './theme/dnd-vaadin-theme-textfield.js';
import './theme/dnd-vaadin-theme-combobox.js';
import './theme/dnd-vaadin-theme-dialog.js';
import './ui/dnd-toolbar.js';
import './ui/dnd-icon.js';
import './ui/dnd-select.js';
import './ui/dnd-addto-combobox.js';
import './ui/dnd-button.js';
import './ui/dnd-button-input.js';
import './ui/dnd-confirm-button.js';
import './ui/dnd-error.js';
import './ui/dnd-loading-spinner.js';
import './ui/dnd-reference.js';
import './mixins/dnd-term-lookup-mixin.js';
import './mixins/dnd-dice-roller-mixin.js';
import './creature-list/dnd-creature-list.js';
import './selection-details/dnd-selection-details.js';
import './combat-tracker/dnd-combat-tracker.js';
import './dnd-main-toolbar.js';
import '@polymer/marked-element';
import '@polymer/iron-pages';
import '@vaadin/vaadin-split-layout';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-tabs';

class DndDmTools extends mixins.DiceRollerMixin(AsyncActionsMixin(ReduxMixin(Polymer.Element))) {
  static get template() {
    return Polymer.html`
    <style>
      #layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
      }
      dnd-main-toolbar {
        display: block;
      }
      vaadin-split-layout {
        flex-grow: 1;
      }
      dnd-creature-list {
        min-width: 50px;
        max-width: 380px;
        width: 380px;
        overflow-x: hidden;
      }
      dnd-selection-details,
      dnd-combat-tracker {
        max-width: 60%;
        min-width: 40%;
        width: 50%;
      }
    </style>

    <dnd-error></dnd-error>

    <div id="layout">
      <dnd-main-toolbar></dnd-main-toolbar>
      <vaadin-split-layout>
        <dnd-creature-list></dnd-creature-list>
        <vaadin-split-layout>
          <dnd-combat-tracker></dnd-combat-tracker>
          <dnd-selection-details></dnd-selection-details>
        </vaadin-split-layout>
      </vaadin-split-layout>
    </div>
`;
  }

  static get is() {
    return 'dnd-dm-tools';
  }

  static get properties() {
    return {
    };
  }

}
customElements.define(DndDmTools.is, DndDmTools);
