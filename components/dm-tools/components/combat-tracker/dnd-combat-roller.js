class CombatRoller extends mixins.DiceRollerMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <style>
    </style>

    <vaadin-dialog opened$="{{dialogOpened}}">
        <template>

        </template>
    </vaadin-dialog>
`;
  }

  static get is() { return 'dnd-combat-roller'; }

  static get properties() {
    return {
      combatant: {
        type: Object
      },
      dialogOpened: {
        type: Boolean
      }
    };
  }

  _rollAttacks(ac) {
    if (combatant.model === 'massCombat') {
          
    }
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(
  CombatRoller.is,
  CombatRoller
);
