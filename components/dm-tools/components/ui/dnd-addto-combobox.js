class AddToCombobox extends AsyncActionsMixin(ReduxMixin(Polymer.Element)) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        border-radius: 4px;
        display: inline-flex;
      }
      [hidden] {
        display: none !important;
      }
      #addButton {
        padding: 3px 5px 4px 0;
        height: 15px;
      }

      .clear-button,
      .toggle-button {
        cursor: pointer;
      }

      .clear-button::before {
        content: '\\e813';
        padding-right: 4px;
        font-family: 'vaadin-combo-box-icons';
      }

      .toggle-button::before {
        content: '';
        font-family: 'photon-entypo';
      }

      vaadin-text-field[disabled] .clear-button,
      vaadin-text-field[readonly] .clear-button,
      vaadin-text-field:not([has-value]) .clear-button {
        display: none;
      }
    </style>

    <vaadin-combo-box-light id="combobox" allow-custom-value="" items="[[options]]" value="{{value}}">
      <vaadin-text-field id="input" label\$="[[label]]" placeholder\$="[[placeholder]]">
        <dnd-button slot="prefix" id="addButton" hidden\$="[[!customValueSet]]" borderless="" icon="plus-circled"></dnd-button>
        <div slot="suffix" class="clear-button" role="button" aria-label="Clear"></div>
        <div slot="suffix" class="toggle-button" role="button" aria-label="Toggle"></div>
      </vaadin-text-field>
      <template>
        <dnd-addto-combobox-item item="[[item]]" index="[[index]]" selected\$="[[selected]]" model\$="[[model]]"></dnd-addto-combobox-item>
      </template>
    </vaadin-combo-box-light>
`;
  }

  static get is() {
    return 'dnd-addto-combobox';
  }

  static get properties() {
    return {
      label: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      model: {
        type: String,
      },
      customValueSet: {
        type: Boolean,
        value: false,
      },
      options: {
        type: Array,
        statePath(state) {
          return state.selectData[this.model];
        },
      },
      value: {
        type: String,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.dispatch('loadSelectSource', this.model);

    this.$.addButton.addEventListener('click', (e) => {
      let currentTime = Date.now(),
        currentValue = this.$.combobox.value.trim();

      e.preventDefault();
      this.dispatch(
        'save',
        this.model,
        {
          sort: currentTime,
          label: currentValue,
          value: currentValue.toLowerCase(),
        },
        () => {
          this.dispatch('loadSelectSource', this.model);
        }
      );

      this.customValueSet = false;
    });

    this.$.input.addEventListener('keyup', (e) => {
      this.$.input.value = this.$.input.value.replace(/\b\w/g, (l) =>
        l.toUpperCase()
      );

      if (this.$.input.value.trim().length) {
        this.customValueSet =
          this.$.combobox.$.overlay._visibleItemsCount() <= 1;
      } else {
        this.customValueSet = false;
      }
    });
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(AddToCombobox.is, AddToCombobox);
class AddToComboboxItem extends AsyncActionsMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: flex;
        justify-content: space-between;
      }
      #deleteItem {
        padding-right: 0;
      }
      #deleteItem:hover {
        color: red;
      }
    </style>

    <span>[[item.label]]</span>
    <dnd-button id="deleteItem" borderless="" icon="cancel"></dnd-button>
`;
  }

  static get is() {
    return 'dnd-addto-combobox-item';
  }

  static get properties() {
    return {
      item: {
        type: Object,
      },
      selected: {
        type: Boolean,
      },
      index: {
        type: Number,
      },
      model: {
        type: String,
      },
    };
  }

  ready() {
    super.ready();

    this.$.deleteItem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.dispatch('remove', this.model, this.item._id, () => {
        this.dispatch('loadSelectSource', this.model);
      });
    });
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(AddToComboboxItem.is, AddToComboboxItem);
