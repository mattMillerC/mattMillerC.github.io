class ExtendedTextField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      vaadin-text-area {
        width: 100%;
      }
    </style>

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <div hidden\$="[[!_isPresent(value)]]">
        <div inner-h-t-m-l="[[value]]"></div>
      </div>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-text-area value="{{value}}" label="[[label]]" required\$="[[required]]" error-message="Required."></vaadin-text-area>
    </div>
`;
  }

  static get is() {
    return 'dnd-extended-text-field';
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
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      required: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  _isPresent(a) {
    return !!a;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(ExtendedTextField.is, ExtendedTextField);
