class DndError extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      h1 {
        color: red;
        font-weight: bold;
        text-align: center;
        width: 100%;
      }
    </style>

    <template is="dom-if" if="[[error]]">
      <h1>Error: [[error]]</h1>
    </template>
`;
  }

  static get is() {
    return 'dnd-error';
  }
  static get properties() {
    return {
      error: {
        type: String,
        statePath: 'error',
      },
    };
  }
}
window.customElements.define(DndError.is, DndError);
