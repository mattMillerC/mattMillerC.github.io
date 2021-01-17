class ClassLevel extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <span hidden\$="[[_isEqual(level, '')]]">Level [[level]]</span><span hidden\$="[[!_useComma(level, race, clazz)]]">, </span><span hidden\$="[[_isEqual(race, '')]]">[[capRace]]</span><span> </span><span hidden\$="[[_isEqual(clazz, '')]]">[[capClazz]]</span>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-combo-box label="Race" items="[[raceOptions]]" value="{{race}}"></vaadin-combo-box>
      <vaadin-combo-box label="Class" items="[[classOptions]]" value="{{clazz}}"></vaadin-combo-box>
      <vaadin-combo-box label="Level" items="[[levelOptions]]" value="{{level}}"></vaadin-combo-box>
    </div>
`;
  }

  static get is() {
    return 'dnd-class-level-field';
  }

  static get properties() {
    return {
      race: {
        type: String,
        notify: true,
      },
      capRace: {
        type: String,
        computed: '_capitalize(race)',
      },
      clazz: {
        type: String,
        notify: true,
      },
      capClazz: {
        type: String,
        computed: '_capitalize(clazz)',
      },
      level: {
        type: String,
        notify: true,
      },
      raceOptions: {
        type: Array,
        statePath: 'selectData.race',
      },
      classOptions: {
        type: Array,
        statePath: 'selectData.clazz',
      },
      levelOptions: {
        type: Array,
        statePath: 'selectData.level',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.race === undefined) {
      this.race = '';
    }
    if (this.clazz === undefined) {
      this.clazz = '';
    }
    if (this.level === undefined) {
      this.level = '';
    }
  }

  _capitalize(str) {
    return str ? str.replace(/\b\w/g, (l) => l.toUpperCase()) : '';
  }

  _useComma() {
    return (this.level && this.race) || (this.level && this.clazz);
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(ClassLevel.is, ClassLevel);
