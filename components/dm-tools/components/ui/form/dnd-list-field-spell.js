import '../../mixins/dnd-term-lookup-mixin.js';
class ListFieldSpell extends mixins.TermLookupMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <style>
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
      }
      .spell-level {
        flex: 0 1 calc(15% - 12.5px);
      }
      .spell-slots {
        flex: 0 1 calc(15% - 12.5px);
      }
      .spell-prepared {
        flex: 0 1 70%;
        width: initial;
      }
    </style>

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <div class="wrapper view">
        <div class="spell-level">[[spell.level]]</div>
        <div class="spell-slots">[[spell.slots]]</div>
        <div class="spell-prepared">
          <template is="dom-repeat" items="[[spells]]">
            <a href="[[item]]" on-click="_lookupSpell">[[item]]</a>
          </template>
        </div>
      </div>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <div class="wrapper">
        <vaadin-text-field class="spell-level" value="{{spell.level}}"></vaadin-text-field>
        <vaadin-text-field class="spell-slots" value="{{spell.slots}}"></vaadin-text-field>
        <vaadin-text-area class="spell-prepared" value="{{spell.prepared}}"></vaadin-text-area>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-list-field-spell';
  }

  static get properties() {
    return {
      spell: {
        type: Object,
        notify: true,
      },
      spells: {
        type: Array,
        computed: '_splitSpells(spell)',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      spellLink: {
        type: String,
        statePath: 'spellLink',
      },
    };
  }

  _splitSpells(spell) {
    return spell.prepared.split(',').map((i) => {
      let res = i.replace(/[^\w\s\']/g, '');
      return res.trim();
    });
  }

  _lookupSpell(e) {
    let spell = e.target.textContent,
      link = encodeURIComponent(spell).replace("'", '%27') + '_phb';

    e.preventDefault();
    this.dispatch({ type: 'SET_SPELL_LINK', spellLink: link });
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(ListFieldSpell.is, ListFieldSpell);
