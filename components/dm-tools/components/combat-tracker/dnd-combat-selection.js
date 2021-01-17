class CombatSelection extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-toolbar.css">
    <link rel="stylesheet" href="./css/photon-fields.css">
    <style>
      [hidden] {
        display: none !important;
      }
      .wrap {
        display: flex;
        flex-direction: column;
        margin: 15px;
      }
      .name {
        font-size: 20px;
        margin: 0;
        font-weight: bold;
      }

      #editNotes {
        cursor: pointer;
      }
      .notes-container {
        margin: 0 10px;
      }
      .notes-container vaadin-text-area {
        width: 100%;
      }
    </style>

    <div hidden\$="[[_emptySelection(selection)]]">
      <dnd-toolbar>
        <div>
          <dnd-button-input validate-number="" id="removeHp" icon="minus" placeholder="Hit Points"></dnd-button-input>
          <dnd-button-input validate-number="" id="addHp" icon="plus" placeholder="Hit Points"></dnd-button-input>
          <dnd-button-input validate-number="" id="changeInit" icon="back-in-time" placeholder="Initiative"></dnd-button-input>
        </div>
        <dnd-confirm-button id="removeCombatant" click-callback="[[_removeCombatant()]]" icon="trash" text="Remove"></dnd-confirm-button>
      </dnd-toolbar>
      <div class="scroll-wrap">
        <div class="wrap">
          <div class="name">
            [[selection.creatureData.name]] [[selection.index]]
          </div>
          <div class="health">
            <strong>Hit Points: </strong>[[_computeHp(selection)]]
          </div>
          <div class="initiative">
            <strong>Initiative: </strong>[[initiativeFloor]]
          </div>
          <div class="notes">
            <strong>Notes: </strong>
            <dnd-button id="editNotes" borderless="" mini="" center="" icon="[[_editNotesIcon(editingNotes)]]"></dnd-button>
            <div class="notes-container">
              <div id="notesDisplay" hidden\$="[[editingNotes]]">
                [[selection.status]]
              </div>
              <vaadin-text-area id="notesInput" hidden\$="[[!editingNotes]]" value="{{selection.status}}"></vaadin-text-area>
            </div>
          </div>
          <div hidden\$="[[!_hasRolls(selection.rolls)]]" class="rolls">
            <strong>Rolls: </strong>
            <dnd-combat-selection-roller rolls="[[selection.creatureData.rolls]]"></dnd-combat-selection-roller>
          </div>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-combat-selection';
  }

  static get properties() {
    return {
      selection: {
        type: Object,
        statePath: 'combat.selection',
      },
      initiativeFloor: {
        type: Number,
        computed: '_initiativeFloor(selection.combatData.initiative)',
      },
      editingNotes: {
        type: Boolean,
        value: false,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.addHp.addEventListener('change', (e) => {
      let value = e.detail;
      this.changeHealth(value);
    });

    this.$.removeHp.addEventListener('change', (e) => {
      let value = e.detail * -1;
      this.changeHealth(value);
    });

    this.$.changeInit.addEventListener('change', (e) => {
      let value = e.detail;
      this.changeInitiative(value);
    });

    Polymer.Gestures.addListener(this.$.editNotes, 'tap', (e) => {
      this.editingNotes = !this.editingNotes;

      if (this.editingNotes) {
        this.$.notesInput.focus();
      }
    });

    this.$.notesInput.addEventListener('keyup', (e) => {
      if (e.which === 13) {
        e.preventDefault();
        this.editingNotes = false;
      }
    });

    this.$.notesInput.addEventListener('blur', (e) => {
      this.editingNotes = false;
    });

    this.$.notesDisplay.addEventListener('click', (e) => {
      this.editingNotes = true;
      this.$.notesInput.focus();
    });
  }

  _removeCombatant() {
    return function () {
      this.dispatch({
        type: 'REMOVE_COMBATANT',
        combatant: this.selection,
      });
      this.dispatch({
        type: 'SET_COMBAT_SELECTION',
        selectedCombatant: {},
      });
    }.bind(this);
  }

  changeHealth(hpDelta) {
    let adjustedHealthDelta =
      hpDelta + this.selection.combatData.healthDelta;

    if (adjustedHealthDelta) {
      this.dispatch({
        type: 'SET_HEALTH_DELTA',
        healthDelta: adjustedHealthDelta,
        combatant: this.selection,
      });
    }
  }

  changeInitiative(initValue) {
    let adjustedInit =
      this.selection.combatData.initiative -
      this.initiativeFloor +
      initValue;

    if (adjustedInit) {
      this.dispatch({
        type: 'SET_INITIATIVE',
        initiative: adjustedInit,
        combatant: this.selection,
      });
    }
  }

  _initiativeFloor() {
    return this.selection && this.selection.combatData
      ? Math.floor(this.selection.combatData.initiative)
      : NaN;
  }

  _emptySelection() {
    return !this.selection || Object.keys(this.selection).length === 0;
  }

  _noZeroIndex() {
    return this.selection && this.selection.index > 0
      ? this.selection.index
      : '';
  }

  _computeHp() {
    return this.selection && this.selection.creatureData
      ? this.selection.creatureData.hp +
          this.selection.combatData.healthDelta +
          ' / ' +
          this.selection.creatureData.hp
      : '';
  }

  _editNotesIcon() {
    return this.editingNotes ? 'floppy' : 'pencil';
  }

  _hasRolls() {
    return (
      this.selection &&
      this.selection.creatureData &&
      this.selection.creatureData.rolls &&
      this.selection.creatureData.rolls.length > 0
    );
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(CombatSelection.is, CombatSelection);
