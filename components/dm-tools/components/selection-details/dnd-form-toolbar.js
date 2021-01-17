class FormToolbar extends AsyncActionsMixin(ReduxMixin(Polymer.Element)) {
  static get template() {
    return Polymer.html`
    <style>
      [hidden] {
        display: none;
      }
      .tools {
        min-height: 22px;
        background-color: #4c5e5e;
        padding: 5px;
      }
      .tools:after,
      .tools:before {
        display: table;
        content: ' ';
      }
    </style>

    <div hidden\$="[[!_hasSelection(creature)]]">
      <dnd-toolbar hidden\$="[[!_isEqual(mode, 'view')]]">
        <div slot="btn-group--left">
          <dnd-button id="editMode" icon="pencil" default="" text="Edit"></dnd-button>
        </div>
        <div slot="right">
          <dnd-confirm-button click-callback="[[deleteCallback()]]" id="delete" text="Delete" icon="cancel"></dnd-confirm-button>
        </div>
      </dnd-toolbar>
    </div>
    <dnd-toolbar hidden\$="[[!_isEqual(mode, 'edit')]]">
      <div class="btn-group">
        <dnd-button id="save" default="" icon="floppy" text="Save"></dnd-button>
        <dnd-button id="close" default="" icon="cancel" text="Cancel"></dnd-button>
      </div>
    </dnd-toolbar>
`;
  }

  static get is() {
    return 'dnd-form-toolbar';
  }

  static get properties() {
    return {
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      creature: {
        type: Object,
      },
      model: {
        type: String,
      },
    };
  }

  ready() {
    super.ready();

    Polymer.Gestures.addListener(this.$.editMode, 'tap', (e) => {
      this.dispatch({ type: 'SET_SELECTION_MODE', mode: 'edit' });
    });

    Polymer.Gestures.addListener(this.$.save, 'tap', (e) => {
      if (this.validate()) {
        this.dispatch('save', this.model, this.creature);
        this.dispatch('loadCursor');
        this.dispatch('refreshCombatants');
        this.dispatch({ type: 'SET_SELECTION_MODE', mode: 'view' });
      }
    });

    Polymer.Gestures.addListener(this.$.close, 'tap', (e) => {
      if (this.creature._id) {
        this.dispatch('load', this.model, this.creature._id, (doc) => {
          this.dispatch({
            type: 'SET_SELECTION',
            selection: { model: this.model, creature: doc },
          });
        });
      } else {
        this.dispatch({
          type: 'SET_SELECTION',
          selection: { model: undefined, creature: undefined },
        });
      }
      this.dispatch({ type: 'SET_SELECTION_MODE', mode: 'view' });
    });
  }

  validate() {
    // TODO
    return true;
  }

  deleteCallback() {
    return function () {
      this.dispatch('remove', this.model, this.creature._id);
      this.dispatch('loadCursor');
      this.dispatch({ type: 'SET_SELECTION_MODE', mode: 'view' });
      this.dispatch({
        type: 'SET_SELECTION',
        selection: { model: undefined, creature: undefined },
      });
    }.bind(this);
  }

  _isEqual(a, b) {
    return a === b;
  }

  _hasSelection() {
    return !!this.creature;
  }
}
window.customElements.define(FormToolbar.is, FormToolbar);
