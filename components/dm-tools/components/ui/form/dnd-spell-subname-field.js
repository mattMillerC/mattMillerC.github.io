class SpellSubnameField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      .view-mode {
        margin-bottom: 5px;
      }
    </style>

    <div class="view-mode" hidden\$="[[!_isEqual(mode, 'view')]]">
      <i hidden\$="[[_isEqual(level, '')]]">[[level]] </i><i hidden\$="[[_isEqual(school, '')]]">[[school]]</i>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-combo-box label="Level" items="[[spellLevelOptions]]" value="{{level}}"></vaadin-combo-box>
      <vaadin-combo-box label="Type" items="[[spellSchoolOptions]]" value="{{school}}"></vaadin-combo-box>
    </div>
`;
  }

  static get is() {
    return 'dnd-spell-subname-field';
  }

  static get properties() {
    return {
      school: {
        type: String,
        notify: true,
      },
      level: {
        type: String,
        notify: true,
      },
      spellLevelOptions: {
        type: Array,
        statePath: 'selectData.spellLevel',
      },
      spellSchoolOptions: {
        type: Array,
        statePath: 'selectData.spellSchool',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
    };
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(SpellSubnameField.is, SpellSubnameField);
