class Reference extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      iframe {
        width: 100vw;
        height: calc(100vh - 60px);
        border: none;
      }
    </style>

    <iframe src="[[currentFilePath]]"></iframe>
`;
  }

  static get is() {
    return 'dnd-reference';
  }

  static get properties() {
    return {
      currentFilePath: {
        type: String,
        computed: '_resolvePath(path)',
      },
      path: {
        type: String,
      },
    };
  }

  _resolvePath(path) {
    return Polymer.ResolveUrl.resolveUrl(path);
  }
}
window.customElements.define(Reference.is, Reference);
