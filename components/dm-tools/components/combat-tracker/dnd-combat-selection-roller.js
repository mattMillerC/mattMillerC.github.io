class CombatSelectionRoller extends mixins.DiceRollerMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <vaadin-dialog id="dialog" opened\$="{{dialogOpened}}">
      <template>
        <style>
          [hidden] {
            display: none !important;
          }
          vaadin-checkbox {
            display: block;
          }
          .window {
            padding-bottom: 20px;
          }
          .fields-wrap {
            display: flex;
          }
          .roll-results {
            max-height: 200px;
            height: 200px;
            overflow: scroll;
          }
          .check-wrap {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            margin-top: 10px;
          }
          .rolls-wrap {
            margin-left: 20px;
          }
          .roll-wrap {
            margin-bottom: 5px;
          }
          .damage-label {
            margin-left: 5px;
          }
          .totals-wrap {
            border-top: 2px solid #333;
            margin-top: 10px;
            height: 36px;
            display: flex;
            align-items: center;
          }
          .totals-wrap dnd-button {
            padding-left: 0;
          }
          .totals-wrap span {
            margin-right: 10px;
          }
        </style>

        <div class="window">
          <header class="toolbar toolbar-header">
            <h2 class="title">Roller</h2>
          </header>

          <div class="window-content">
            <div class="fields-wrap">
              <vaadin-text-field class="ac-field" required="" label="Target's AC" placeholder="Target's AC" pattern="[0-9]*" error-message="Please enter a number."></vaadin-text-field>
              <div class="check-wrap">
                <vaadin-checkbox class="advantage">Advantage</vaadin-checkbox>
                <vaadin-checkbox class="disadvantage">Disadvantage</vaadin-checkbox>
                <vaadin-checkbox class="critOn19">Crit on 19</vaadin-checkbox>
                <vaadin-checkbox class="halfCover">1/2 Cover</vaadin-checkbox>
                <vaadin-checkbox class="threeQuartersCover">3/4 Cover</vaadin-checkbox>
              </div>
              <div class="rolls-wrap">
                <template is="dom-repeat" items="[[rolls]]">
                  <div class="roll-wrap">
                    <dnd-button bigicon="" icon="arrows-ccw" on-click="_rollIt"></dnd-button>
                    <strong>To Hit: </strong><span hidden\$="[[!_isPositive(item.toHit)]]">+ </span>[[item.toHit]]
                    <strong class="damage-label">Damage: </strong>
                    <template is="dom-repeat" items="[[item.damages]]" as="dmg">
                      <span>[[dmg.damageRoll]] [[dmg.damageType]]</span><span hidden\$="[[_isLastItem(item.damages, index)]]">,
                      </span>
                    </template>
                  </div>
                </template>
              </div>
            </div>

            <div class="totals-wrap">
              <dnd-button hidden\$="[[_isEmpty(reversedDamageResults)]]" bigicon="" icon="cancel-circled" on-click="_clearResults"></dnd-button>
              <template is="dom-repeat" items="[[totalDamages]]">
                <strong>[[_capitalize(item.damageType)]]:&nbsp;</strong>
                <span>[[item.damage]]</span>
              </template>
            </div>

            <div class="roll-results">
              <template is="dom-repeat" items="[[reversedDamageResults]]">
                <div class="damage-wrap">
                  <template is="dom-if" if="[[item.hit]]">
                    <template is="dom-if" if="[[item.crit]]">
                      CRITICAL!! ([[item.attackRoll]])
                    </template>
                    <template is="dom-if" if="[[!item.crit]]">
                      Hit! ([[item.attackRoll]])
                    </template>
                    <template is="dom-repeat" items="[[item.damageDealt]]" as="dealt">
                      <span>[[dealt.damage]] [[dealt.damageType]] damage</span><span hidden\$="[[_isLastItem(item.damageDealt, index)]]">,
                      </span>
                    </template>
                  </template>
                  <template is="dom-if" if="[[!item.hit]]">
                    Miss... ([[item.attackRoll]])
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </vaadin-dialog>

    <dnd-button default="" icon="attach" on-click="_openDialog"></dnd-button>
`;
  }

  static get is() {
    return 'dnd-combat-selection-roller';
  }

  static get properties() {
    return {
      rolls: {
        type: Array,
      },
      dialogOpened: {
        type: Boolean,
        value: false,
      },
      damageResults: {
        type: Array,
        value: [],
      },
      reversedDamageResults: {
        type: Array,
        computed: '_reverse(damageResults.*)',
      },
      totalDamages: {
        type: Array,
        value: [],
      },
    };
  }

  static get observers() {
    return ['_calcTotalDamages(damageResults.*)'];
  }

  _calcTotalDamages() {
    let totals = [];

    for (let damage of this.damageResults) {
      if (damage.damageDealt) {
        for (let dealt of damage.damageDealt) {
          let isDamageTypeInArray = false;

          for (let total of totals) {
            if (total.damageType === dealt.damageType) {
              isDamageTypeInArray = true;
              total.damage += dealt.damage;
              break;
            }
          }

          if (!isDamageTypeInArray) {
            totals.push({
              damage: dealt.damage,
              damageType: dealt.damageType,
            });
          }
        }
      }
    }
    this.set('totalDamages', totals);
  }

  _rollIt(e) {
    let rollObj = e.model.item,
      acField = e.target
        .closest('.window-content')
        .querySelector('.ac-field'),
      ac = parseInt(acField.value),
      hasAdvantage = e.target
        .closest('.window-content')
        .querySelector('.advantage').checked,
      hasDisadvantage = e.target
        .closest('.window-content')
        .querySelector('.disadvantage').checked,
      hasThreeQuartersCover = e.target
        .closest('.window-content')
        .querySelector('.threeQuartersCover').checked,
      hasHalfCover = e.target
        .closest('.window-content')
        .querySelector('.halfCover').checked,
      isCritOn19 = e.target
        .closest('.window-content')
        .querySelector('.critOn19').checked;

    if (hasThreeQuartersCover) {
      ac += 5;
    } else if (hasHalfCover) {
      ac += 2;
    }

    if (acField.validate()) {
      let result = this._attackRoll(
        ac,
        hasAdvantage,
        hasDisadvantage,
        isCritOn19,
        rollObj
      );
      this.push('damageResults', result);
    }
  }

  _clearResults() {
    this.damageResults = [];
  }

  _reverse(change) {
    return change.base.slice().reverse();
  }

  _openDialog() {
    this.$.dialog.opened = true;
    this.damageResults = [];
  }

  _isLastItem(list, index) {
    return list.length - 1 === index;
  }

  _isPositive(number) {
    return typeof number === 'number' ? number >= 0 : false;
  }

  _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _isEmpty(array) {
    return array instanceof Array && array.length === 0;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(
  CombatSelectionRoller.is,
  CombatSelectionRoller
);
