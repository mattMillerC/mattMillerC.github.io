class StatsField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        width: 100%;
      }
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
      }
      .wrapper.view {
        width: 50%;
      }
      .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .row * {
        flex: 1 1 content;
        text-align: center;
        margin-right: 10px;
      }
      .row *:last-child {
        margin-right: 0;
      }
      .view .row.head * {
        font-weight: bolder;
      }
    </style>

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <div hidden\$="[[!_hasStat(stats)]]">
        <div class="wrapper view">
          <div class="row head">
            <div>STR</div>
            <div>DEX</div>
            <div>CON</div>
            <div>INT</div>
            <div>WIS</div>
            <div>CHA</div>
          </div>
          <div class="row">
            <div>[[stats.str]]</div>
            <div>[[stats.dex]]</div>
            <div>[[stats.con]]</div>
            <div>[[stats.int]]</div>
            <div>[[stats.wis]]</div>
            <div>[[stats.cha]]</div>
          </div>
        </div>
      </div>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <div class="wrapper">
        <div class="row">
          <vaadin-text-field value="{{stats.str}}" label="STR"></vaadin-text-field>
          <vaadin-text-field value="{{stats.dex}}" label="DEX"></vaadin-text-field>
          <vaadin-text-field value="{{stats.con}}" label="CON"></vaadin-text-field>
          <vaadin-text-field value="{{stats.int}}" label="INT"></vaadin-text-field>
          <vaadin-text-field value="{{stats.wis}}" label="WIS"></vaadin-text-field>
          <vaadin-text-field value="{{stats.cha}}" label="CHA"></vaadin-text-field>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-stats-field';
  }

  static get properties() {
    return {
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      stats: {
        type: Object,
        notify: true,
      },
    };
  }

  static get observers() {
    return ['_defaultStats(stats)'];
  }

  _defaultStats() {
    if (this.stats === undefined) {
      this.stats = {
        str: '',
        dex: '',
        con: '',
        int: '',
        wis: '',
        con: '',
      };
    } else {
      if (this.stats.str === undefined) {
        this.stats.str = '';
      }
      if (this.stats.dex === undefined) {
        this.stats.dex = '';
      }
      if (this.stats.con === undefined) {
        this.stats.con = '';
      }
      if (this.stats.int === undefined) {
        this.stats.int = '';
      }
      if (this.stats.wis === undefined) {
        this.stats.wis = '';
      }
      if (this.stats.con === undefined) {
        this.stats.con = '';
      }
    }
  }

  _isEqual(a, b) {
    return a === b;
  }

  _hasStat() {
    return (
      this.stats &&
      (this.stats.str ||
        this.stats.dex ||
        this.stats.con ||
        this.stats.int ||
        this.stats.wis ||
        this.stats.cha)
    );
  }
}
window.customElements.define(StatsField.is, StatsField);
