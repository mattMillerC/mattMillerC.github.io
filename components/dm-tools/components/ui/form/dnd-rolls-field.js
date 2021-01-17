class RollsField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        width: 100%;
      }
      [hidden] {
        display: none !important;
      }
      hr {
        margin-top: 10px;
        border-width: 1px;
        border-style: solid;
        border-top: none;
      }
      .fields {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .fields .toHit {
        flex-basis: 60px;
      }
      .fields .dmgRoll {
        flex-basis: calc(70% - 4px);
        position: relative;
        right: -1px;
      }
      .fields .dmgRoll[view] {
        flex-basis: auto;
        margin-right: 10px;
      }
      .flex-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .dmgs-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-basis: 75%;
        margin-bottom: 10px;
      }
      .dmg-wrap {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
        width: 100%;
      }
      dnd-button[icon='minus'] {
        margin-right: 10px;
      }
      .addDamage {
        margin-bottom: 10px;
      }
    </style>

    <div hidden\$="[[isHidden]]">
      <hr>

      <h3>Rolls</h3>
      <template is="dom-repeat" items="{{rolls}}">
        <div class="flex-wrap">
          <dnd-button hidden\$="[[_isEqual(mode, 'view')]]" default="" icon="minus" on-click="_removeRoll"></dnd-button>
          <div class="fields">
            <dnd-basic-field class="toHit" placeholder="To Hit" value="{{item.toHit}}" validate-number=""></dnd-basic-field>
            <div class="dmgs-wrap">
              <template is="dom-repeat" items="{{item.damages}}" as="dmg">
                <div class="dmg-wrap">
                  <dnd-button hidden\$="[[_isEqual(mode, 'view')]]" default="" icon="minus" on-click="_removeDamage"></dnd-button>
                  <dnd-basic-field class="dmgRoll" view\$="[[_isEqual(mode, 'view')]]" placeholder="Roll" value="{{dmg.damageRoll}}"></dnd-basic-field>
                  <div hidden\$="[[_isEqual(mode, 'edit')]]">
                    [[dmg.damageType]]
                  </div>
                  <vaadin-combo-box hidden\$="[[_isEqual(mode, 'view')]]" value="{{dmg.damageType}}" placeholder="Damage Type" items="[[damageTypeOptions]]"></vaadin-combo-box>
                </div>
              </template>
              <dnd-button hidden\$="[[_isEqual(mode, 'view')]]" class="addDamage" default="" icon="plus" text="Add Damage" on-click="_addDamage"></dnd-button>
            </div>
          </div>
        </div>
      </template>
      <dnd-button hidden\$="[[_isEqual(mode, 'view')]]" default="" icon="plus" text="Add Roll" on-click="_addRoll"></dnd-button>
    </div>
`;
  }

  static get is() {
    return 'dnd-rolls-field';
  }

  static get properties() {
    return {
      rolls: {
        type: Array,
        notify: true,
        value: [],
      },
      damageTypeOptions: {
        type: Array,
        statePath: 'selectData.damageType',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      hasRolls: {
        type: Boolean,
        computed: '_hasRolls(rolls)',
      },
      isHidden: {
        type: Boolean,
        computed: '_isHidden(hasRolls, mode)',
      },
    };
  }

  _isHidden(hasRolls, mode) {
    return !hasRolls && mode !== 'edit';
  }

  _hasRolls() {
    return this.rolls && this.rolls.length > 0;
  }

  _defaultRoll() {
    return {
      toHit: null,
      damages: [],
    };
  }

  _defaultDamage() {
    return {
      damageRoll: '',
      damageType: '',
    };
  }

  _addRoll() {
    if (this.rolls === undefined) {
      this.rolls = [];
      this.notifyPath('rolls');
    }
    this.push('rolls', this._defaultRoll());
  }

  _addDamage(e) {
    this.push('rolls.' + e.model.index + '.damages', this._defaultDamage());
  }

  _removeRoll(e) {
    this.splice('rolls', e.model.index, 1);
  }

  _removeDamage(e) {
    this.splice(
      'rolls.' + e.model.parentModel.index + '.damages',
      e.model.index,
      1
    );
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(RollsField.is, RollsField);
