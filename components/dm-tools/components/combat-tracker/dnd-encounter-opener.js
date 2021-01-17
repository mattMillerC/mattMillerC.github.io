class EncounterOpener extends AsyncActionsMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <vaadin-dialog id="dialog" opened\$="{{dialogOpened}}">
      <template>
        <link rel="stylesheet" href="./css/photon-table.css">
        <style>
          [hidden] {
            display: none !important;
          }

          .window {
            padding-bottom: 20px;
          }

          .flex-wrap {
            display: flex;
            width: 100%;
            margin-top: 10px;
            justify-content: center;
          }
          dnd-button {
            margin: 10px;
          }
          .empty {
            font-size: 16px;
          }
          .table {
            border: 1px solid #aaa;
          }
        </style>

        <div class="window">
          <header class="toolbar toolbar-header">
            <h2 class="title">Open Encounter</h2>
          </header>

          <div class="window-content">
            <div hidden\$="[[isEmpty]]">
              <div class="table table-striped">
                <div class="table-head">
                  <div class="table-row">
                    <div class="table-head-cell">Name</div>
                    <div class="table-head-cell">Date</div>
                  </div>
                </div>
                <div class="table-body">
                  <template is="dom-repeat" items="[[encounters]]">
                    <div class="table-row" id="[[item._id]]" selected\$="[[_isEqual(item._id, selectedId)]]" on-click="_selectCallback">
                      <div class="table-cell">[[_getTitle(item.title)]]</div>
                      <div class="table-cell">
                        [[_getTimestamp(item.title)]]
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="flex-wrap">
                <dnd-button text="Open" primary="" disabled\$="[[_isEqual(selectedId, '')]]" on-click="_openCallback"></dnd-button>
                <dnd-button text="Delete" negative="" disabled\$="[[_isEqual(selectedId, '')]]" on-click="_deleteCallback"></dnd-button>
              </div>
            </div>
            <div class="empty" hidden\$="[[!isEmpty]]">No saved encounters.</div>
          </div>
        </div>
      </template>
    </vaadin-dialog>

    <dnd-button default="" text="[[text]]" icon="[[icon]]" on-click="_openDialog"></dnd-button>
`;
  }

  static get is() {
    return 'dnd-encounter-opener';
  }

  static get properties() {
    return {
      text: {
        type: String,
        value: 'Open Encounter',
      },
      icon: {
        type: String,
        value: 'folder',
      },
      dialogOpened: {
        type: Boolean,
        value: false,
      },
      encounters: {
        type: Array,
        statePath: 'selectData.encounters',
      },
      isEmpty: {
        type: Boolean,
        computed: '_isEmpty(encounters)',
      },
      selectedId: {
        type: String,
        value: '',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.dispatch('loadSelectSource', 'encounters');
  }

  _selectCallback(e) {
    let targetId = e.target.closest('.table-row').id;
    if (this.selectedId === targetId) {
      this.selectedId = '';
    } else {
      this.selectedId = targetId;
    }
  }

  _deleteCallback(e) {
    if (this.selectedId) {
      this.dispatch('remove', 'encounters', this.selectedId, (combat) => {
        this.dispatch('loadSelectSource', 'encounters');
      });
      this.selectedId = '';
    }
  }

  _openCallback() {
    if (this.selectedId) {
      this.dispatch('load', 'encounters', this.selectedId, (combat) => {
        combat.encounter.title = combat.title;
        combat.encounter._id = combat._id;
        this.dispatch({ type: 'SET_COMBAT', combat: combat.encounter });
        this._closeDialog();
      });
      this.selectedId = '';
    }
  }

  _getTitle(title) {
    if (title.indexOf(' - ') > -1) {
      return title.substring(0, title.indexOf(' - '));
    } else {
      return title;
    }
  }

  _getTimestamp(title) {
    if (title.indexOf(' - ') > -1) {
      return title.substring(title.indexOf(' - ') + 3);
    } else {
      return '';
    }
  }

  _openDialog() {
    this.$.dialog.opened = true;
  }

  _closeDialog() {
    this.$.dialog.opened = false;
  }

  _isEmpty(a) {
    return a.length === undefined || a.length === 0;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(EncounterOpener.is, EncounterOpener);
