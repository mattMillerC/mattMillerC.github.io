class ButtonInput extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon.css">
    <style>
      :host {
        display: inline-flex;
        align-items: center;
      }
      #button.open {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      #fieldWrap {
        transition: width 0.2s ease-in;
        width: 0;
        overflow: hidden;
        display: inline-block;
      }
      #fieldWrap.open {
        transition: width 0.2s ease-out;
        width: 155px;
      }
      #textField [part='input-field'] {
        padding: 1px 5px !important;
      }
    </style>

    <dnd-button id="button" class\$="[[_isOpenClass(isOpen)]]" default="" icon\$="[[icon]]" text\$="[[text]]"></dnd-button>
    <div id="fieldWrap" class\$="[[_isOpenClass(isOpen)]]">
      <vaadin-text-field id="textField" pattern\$="[[_validationPattern(validateNumber)]]" prevent-invalid-input\$="[[validateNumber]]" class="button-input" placeholder\$="[[placeholder]]" required\$="[[requiredToggle]]" value="{{value}}"></vaadin-text-field>
    </div>
`;
  }

  static get is() {
    return 'dnd-button-input';
  }

  static get properties() {
    return {
      icon: {
        type: String,
      },
      text: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      value: {
        type: String,
        value: '',
      },
      validateNumber: {
        type: Boolean,
        reflectToAttribute: true,
      },
      maintainValue: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      isOpen: {
        type: Boolean,
        value: false,
      },
      requiredToggle: {
        type: Boolean,
        value: true,
      },
    };
  }

  static get observers() {
    return ['changeValue(value)'];
  }

  changeValue() {
    if (this.validateNumber && this.value !== '-') {
      let parsed = parseInt(this.value);

      if (!isNaN(parsed)) {
        this.value = parsed;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    const TAP_TIMEOUT = 300;
    let isTapped = false;

    Polymer.Gestures.addListener(this.$.button, 'tap', (e) => {
      isTapped = true;
      setTimeout(() => {
        isTapped = false;
      }, TAP_TIMEOUT);

      if (this.isOpen && this.$.textField.validate()) {
        this.submitChange();
      } else {
        this.isOpen = true;

        this.$.textField.focus();

        this.$.textField.addEventListener('blur', (e) => {
          if (this.isOpen) {
            setTimeout(() => {
              if (!isTapped) {
                this.isOpen = false;
                if (!this.maintainValue) {
                  this.$.textField.value = '';
                }
                this.$.textField.removeAttribute('invalid');
              }
            }, TAP_TIMEOUT);
          }
        });
      }
    });

    this.$.textField.addEventListener('keyup', (e) => {
      if (e.which === 13) {
        if (this.$.textField.validate()) {
          this.submitChange();
          this.$.textField.blur();
        }
      }
    });
  }

  submitChange() {
    this.requiredToggle = false;
    setTimeout(() => {
      this.requiredToggle = true;
    }, 350);
    this.isOpen = false;
    let newValue = this.value;
    this.value = '';
    this.dispatchEvent(new CustomEvent('change', { detail: newValue }));
  }

  _validationPattern() {
    return this.validateNumber ? '-?[0-9]*' : false;
  }

  _isOpenClass() {
    return this.isOpen ? 'open' : '';
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(ButtonInput.is, ButtonInput);
