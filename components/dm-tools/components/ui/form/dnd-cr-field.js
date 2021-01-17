class CrField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <strong>Challenge Rating: </strong>
      <span>[[crstr]]</span>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-combo-box id="input" label="Challenge Rating" items="[[crOptions]]" value="{{crnum}}"></vaadin-combo-box>
    </div>
`;
  }

  static get is() {
    return 'dnd-cr-field';
  }

  static get properties() {
    return {
      crnum: {
        type: Number,
        notify: true,
      },
      crstr: {
        type: String,
        notify: true,
      },
      crOptions: {
        type: Array,
        statePath: 'selectData.cr',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.input.addEventListener('change', (e) => {
      for (let option of this.crOptions) {
        if (option.value === this.crnum) {
          this.set('crstr', option.label);
          break;
        }
      }
    });
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(CrField.is, CrField);
