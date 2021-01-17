import './dnd-combat-toolbar.js';
import './dnd-combatant.js';
import './dnd-combat-selection.js';
import './dnd-combat-selection-roller.js';
import './dnd-encounter-opener.js';
class CombatTracker extends AsyncActionsMixin(ReduxMixin(Polymer.Element)) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-table.css">
    <style>
      [hidden] {
        display: none !important;
      }
      :host {
        overflow-x: hidden;
      }
      .wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        flex: 1;
      }
      .no-combatants {
        font-size: 16px;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 20px;
        width: calc(100% - 40px);
      }
      dnd-encounter-opener {
        margin-bottom: 10px;
      }
      dnd-combat-selection {
        height: 50%;
      }
      vaadin-split-layout {
        height: 100%;
      }
    </style>

    <div class="wrap" hidden\$="[[!_hasCombatant(combatants)]]">
      <dnd-combat-toolbar></dnd-combat-toolbar>

      <vaadin-split-layout vertical="">
        <div class="table-wrap">
          <div class="table table-striped">
            <div class="table-head">
              <div class="table-row">
                <div class="table-head-cell">Initiative</div>
                <div class="table-head-cell">Name</div>
                <div class="table-head-cell">Time</div>
                <div class="table-head-cell">CR</div>
                <div class="table-head-cell">HP</div>
              </div>
            </div>
            <div class="table-body">
              <template is="dom-repeat" items="{{combatants}}">
                <dnd-combatant dead\$="[[item.combatData.isDead]]" turn\$="[[item.combatData.isTurn]]" selected\$="[[_isSelected(item, selected, combatants)]]" combatant="{{item}}"></dnd-combatant>
              </template>
            </div>
          </div>
        </div>

        <dnd-combat-selection></dnd-combat-selection>
      </vaadin-split-layout>
    </div>
    <div class="wrap no-combatants" hidden\$="[[_hasCombatant(combatants)]]">
      <dnd-encounter-opener></dnd-encounter-opener>
      or<br>&lt;-- Add combatants from the creature browser
    </div>
`;
  }

  static get is() {
    return 'dnd-combat-tracker';
  }

  static get properties() {
    return {
      combatants: {
        type: Array,
        statePath: 'combat.combatants',
      },
      selected: {
        type: Object,
        statePath: 'combat.selection',
      },
    };
  }

  _isSelected(combatant) {
    return (
      this.selected &&
      this.selected.model &&
      this.selected.model === combatant.model &&
      this.selected.creatureId === combatant.creatureId &&
      this.selected.index === combatant.index
    );
  }

  _hasCombatant() {
    return this.combatants.length > 0;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(CombatTracker.is, CombatTracker);
