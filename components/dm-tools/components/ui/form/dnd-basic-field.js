class BasicField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      strong {
        font-weight: 18px;
      }
      vaadin-text-field {
        width: 100%;
      }
    </style>

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <div hidden\$="[[!_isPresent(value)]]">
        <strong>[[labelOrPlaceholder]]: </strong>
        <span>[[value]]</span>
      </div>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-text-field class="form" value="{{value}}" label="[[label]]" placeholder\$="[[placeholder]]" required\$="[[required]]" error-message\$="[[_errorMessage(required, validateNumber)]]" pattern\$="[[_validationPattern(validateNumber)]]" prevent-invalid-input\$="[[validateNumber]]"></vaadin-text-field>
    </div>
`;
  }

  static get is() {
    return 'dnd-basic-field';
  }

  static get properties() {
    return {
      value: {
        type: String,
        notify: true,
      },
      label: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      labelOrPlaceholder: {
        type: String,
        computed: '_labelOrPlaceholder(label, placeholder)',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      required: {
        type: Boolean,
        reflectToAttribute: true,
      },
      validateNumber: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  static get observers() {
    return ['changeValue(value)'];
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value === undefined) {
      this.value = '';
    }
  }

  changeValue() {
    if (this.validateNumber && this.value !== '-') {
      let parsed = parseInt(this.value);

      if (!isNaN(parsed)) {
        this.value = parsed;
      }
    }
  }

  _errorMessage() {
    let msg = '';

    if (this.required) {
      msg += 'Required. ';
    }
    if (this.validateNumber) {
      msg += ' Value must be a number.';
    }

    return this.required || this.validateNumber ? msg : false;
  }

  _validationPattern() {
    return this.validateNumber ? '-?[0-9]*' : false;
  }

  _labelOrPlaceholder() {
    return this.label ? this.label : this.placeholder;
  }

  _isEqual(a, b) {
    return a === b;
  }

  _isPresent(a) {
    return !!a;
  }
}
window.customElements.define(BasicField.is, BasicField);
