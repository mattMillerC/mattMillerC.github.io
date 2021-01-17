class TermDialogLink extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon.css">
    <link rel="stylesheet" href="./css/photon-toolbar.css">
    <style>
      :host {
        display: inline-block;
        margin-right: 7px;
      }
      .link:hover {
        cursor: pointer;
        color: #0046c9;
      }
      .link {
        color: #467de4;
      }
      .no-results {
        color: red;
      }
    </style>

    <span class="no-results" hidden\$="[[_isTruthy(linkText)]]">[[noResultText]]</span>

    <template is="dom-if" if="[[_isTruthy(linkText)]]">
      <span class="link" on-click="_openDialog">[[linkText]]</span>
      <vaadin-dialog>
        <template>
          <div class="window">
            <header class="toolbar toolbar-header">
              <h2 class="title" inner-h-t-m-l="[[heading]]"></h2>
            </header>

            <div class="window-content" inner-h-t-m-l="[[body]]"></div>

            <footer class="toolbar toolbar-footer">
              <h2 class="title" inner-h-t-m-l="[[footer]]"></h2>
            </footer>
          </div>
        </template>
      </vaadin-dialog>
    </template>
`;
  }

  static get is() {
    return 'dnd-term-dialog-link';
  }

  static get properties() {
    return {
      linkText: {
        type: String,
      },
      heading: {
        type: String,
      },
      body: {
        type: String,
      },
      footer: {
        type: String,
      },
      noResultText: {
        type: String,
      },
      dialogOpened: {
        type: Boolean,
        value: false,
      },
    };
  }

  _openDialog(e) {
    if (this.linkText) {
      this.shadowRoot.querySelector('vaadin-dialog').opened = true;
    }
  }

  _isTruthy(a) {
    return !!a;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(TermDialogLink.is, TermDialogLink);
