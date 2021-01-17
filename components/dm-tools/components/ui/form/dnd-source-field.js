class SourceField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon.css">

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <div class\$="[[source]]">
        <span hidden\$="[[_isPresent(link)]]">[[sourceFull]]</span>
        <a id="link" hidden\$="[[!_isPresent(link)]]" href\$="[[link]]">[[sourceFull]]</a>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-source-field';
  }

  static get properties() {
    return {
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      source: {
        type: String,
        notify: true,
      },
      sourceFull: {
        type: String,
        notify: true,
      },
      link: {
        type: String,
        notify: true,
      },
    };
  }

  static get observers() {
    return ['_changeSource(source)', '_changeSourceFull(sourceFull)'];
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.source === undefined) {
      this.source = '';
    }
    if (this.sourceFull === undefined) {
      this.sourceFull = '';
    }
    if (this.link === undefined) {
      this.link = '';
    }

    let shell = await import('electron').shell;

    Polymer.Gestures.addListener(this.$.link, 'tap', (e) => {
      e.preventDefault();
      shell.openExternal(e.target.href);
    });
  }

  _changeSource(source) {
    if (!this.source) {
      this.source = 'MA';
      this.notifyPath('source');
    }
  }

  _changeSourceFull(sourceFull) {
    if (!this.sourceFull) {
      this.sourceFull = 'Manually Added';
      this.notifyPath('sourceFull');
    }
  }

  _isEqual(a, b) {
    return a === b;
  }

  _isPresent(a) {
    return !!a;
  }
}
window.customElements.define(SourceField.is, SourceField);
