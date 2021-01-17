class NameField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        width: 100%;
      }
      h2 {
        margin: 0;
      }
      vaadin-text-field {
        width: 100%;
      }
    </style>

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <h2>[[name]]</h2>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-text-field value="{{name}}" label\$="[[label]]" required="" error-message="Required."></vaadin-text-field>
    </div>
`;
  }

  static get is() {
    return 'dnd-name-field';
  }

  static get properties() {
    return {
      name: {
        type: String,
        notify: true,
      },
      label: {
        type: String,
        value: 'Name',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.name === undefined) {
      this.name = '';
    }
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(NameField.is, NameField);
