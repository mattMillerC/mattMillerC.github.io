import './dnd-list-field-item.js';
import './dnd-list-field-spell.js';
class ListField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        width: 100%;
      }
      [hidden] {
        display: none !important;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
      }
      :host([mode='edit']) .wrapper {
        margin-left: 42px;
      }
      .wrapper > * {
        text-align: left;
        font-weight: bold;
      }
      .item-wrap {
        display: flex;
        align-items: flex-start;
      }
      :host([mode='view']) .text-item.item-wrap:not(:last-of-type) {
        margin-bottom: 15px;
      }
      .item-wrap dnd-button {
        flex-grow: 0;
        margin-right: 10px;
      }
      .item-wrap *:not(dnd-button) {
        flex-grow: 1;
      }
      .spell-level {
        flex: 0 1 calc(15% - 12.5px);
      }
      .spell-slots {
        flex: 0 1 calc(15% - 12.5px);
      }
      .spell-prepared {
        flex: 0 1 70%;
      }
      hr {
        margin-top: 10px;
        border-width: 1px;
        border-style: solid;
        border-top: none;
      }
      .spell-mods-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      dnd-basic-field {
        margin-top: 5px;
        margin-bottom: 15px;
        width: calc(50% - 12.5px);
      }
    </style>

    <hr hidden\$="{{!hasItems}}">

    <div hidden\$="[[!hasItems]]">
      <h3>[[title]]</h3>

      <template is="dom-if" if="{{_isEqual(listType, 'row')}}">
        <template is="dom-repeat" items="{{listItems}}">
          <div class="item-wrap text-item">
            <dnd-button default="" icon="minus" on-click="_removeItem" hidden\$="[[!_isEqual(mode, 'edit')]]"></dnd-button>
            <dnd-list-field-item item="{{item}}"></dnd-list-field-item>
          </div>
        </template>
      </template>

      <template is="dom-if" if="{{_isEqual(listType, 'spell')}}">
        <div class="spell-mods-wrapper">
          <dnd-basic-field label="Spell Difficulty Class" validate-number="" value="{{spellDc}}"></dnd-basic-field>
          <dnd-basic-field label="Spell Casting Modifier" validate-number="" value="{{spellMod}}"></dnd-basic-field>
        </div>
        <div class="wrapper">
          <div class="spell-level">Level</div>
          <div class="spell-slots">Slots</div>
          <div class="spell-prepared">Prepared</div>
        </div>
        <template is="dom-repeat" items="{{listItems}}">
          <div class="item-wrap spell-item">
            <dnd-button default="" icon="minus" on-click="_removeItem" hidden\$="[[!_isEqual(mode, 'edit')]]"></dnd-button>
            <dnd-list-field-spell spell="{{item}}"></dnd-list-field-spell>
          </div>
        </template>
      </template>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <dnd-button default="" icon="plus" on-click="_addItem"></dnd-button>
    </div>
`;
  }

  static get is() {
    return 'dnd-list-field';
  }

  static get properties() {
    return {
      listItems: {
        type: Array,
        notify: true,
      },
      listType: {
        type: String,
        value: 'row',
      },
      title: {
        type: String,
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
        reflectToAttribute: true,
      },
      hasItems: {
        type: Boolean,
        computed: '_hasItems(mode, listItems.*)',
      },
      spellMod: {
        type: Number,
        notify: true,
      },
      spellDc: {
        type: Number,
        notify: true,
      },
    };
  }

  _addItem(e) {
    if (!this.listItems || this.listItems.length === 0) {
      this.listItems = [];
      this.notifyPath('listItems');
    }

    if (this.listType === 'row') {
      this.push('listItems', { name: '', description: '' });
    } else if (this.listType === 'spell') {
      this.push('listItems', { level: '', slots: '', prepared: '' });
    }
  }

  _removeItem(e) {
    this.splice('listItems', e.model.index, 1);
  }

  _isEqual(a, b) {
    return a === b;
  }

  _hasItems(mode, listItems) {
    return (
      this.mode === 'edit' || (this.listItems && this.listItems.length > 0)
    );
  }
}
window.customElements.define(ListField.is, ListField);
