import './dnd-monster-form.js';
import './dnd-player-form.js';
import './dnd-npc-form.js';
import './dnd-form-toolbar.js';
import '../ui/form/dnd-basic-field.js';
import '../ui/form/dnd-cr-field.js';
import '../ui/form/dnd-image-field.js';
import '../ui/form/dnd-list-field.js';
import '../ui/form/dnd-name-field.js';
import '../ui/form/dnd-stats-field.js';
import '../ui/form/dnd-subname-field.js';
import '../ui/form/dnd-class-level-field.js';
import '../ui/form/dnd-source-field.js';
import '../ui/form/dnd-extended-text-field.js';
import '../ui/form/dnd-spell-subname-field.js';
import '../ui/form/dnd-rich-text-area.js';
import '../ui/form/dnd-rolls-field.js';
class SelectionDetails extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      [hidden] {
        display: none;
      }
      .wrap {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        flex: 1;
      }
      dnd-form-toolbar {
        width: 100%;
      }
      #content {
        width: calc(100% - 36px);
        padding: 18px;
        flex: 1 1 auto;
        overflow-y: auto;
        height: 0px;
      }
    </style>

    <div class="wrap">
      <dnd-form-toolbar creature="{{selection.creature}}" model="{{selection.model}}"></dnd-form-toolbar>

      <div id="content">
        <template is="dom-if" if="{{isModel('monsters', selection.model)}}">
          <dnd-monster-form monster="{{selection.creature}}"></dnd-monster-form>
        </template>

        <template is="dom-if" if="{{isModel('players', selection.model)}}">
          <dnd-player-form player="{{selection.creature}}"></dnd-player-form>
        </template>

        <template is="dom-if" if="{{isModel('npcs', selection.model)}}">
          <dnd-npc-form npc="{{selection.creature}}"></dnd-npc-form>
        </template>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-selection-details';
  }

  static get properties() {
    return {
      selection: {
        type: Object,
        statePath: 'selection',
        observer: 'selectionChanged',
      },
    };
  }

  selectionChanged() {
    this.$.content.scrollTop = 0;
  }

  isModel(model) {
    return (
      this.selection &&
      this.selection.creature &&
      this.selection.model === model
    );
  }
}
window.customElements.define(SelectionDetails.is, SelectionDetails);
