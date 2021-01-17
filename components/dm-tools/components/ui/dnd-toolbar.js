class Toolbar extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: flex;
        align-items: flex-start;
        min-height: 22px;
        background-color: #424b4f;
        border-bottom: 1px solid #aaa;
        color: #fff;
      }

      :host([header]) {
        background-color: #e8e6e8;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0%, #e8e6e8),
          color-stop(100%, #d1cfd1)
        );
        background-image: -webkit-linear-gradient(
          top,
          #e8e6e8 0%,
          #d1cfd1 100%
        );
        background-image: linear-gradient(to bottom, #e8e6e8 0%, #d1cfd1 100%);
        border-bottom: 1px solid #aaa;
        color: #333;
      }

      :host([light]) {
      }

      :host([dark]) {
        background-color: #2b4f68;
        background: linear-gradient(
          to bottom,
          rgba(102, 102, 102, 1) 0%,
          rgba(72, 72, 72, 1) 100%
        );
      }

      .flex-wrap {
        width: calc(100% - 10px);
        display: flex;
        padding: 5px;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }
    </style>

    <div class="flex-wrap">
      <slot name="btn-group--left"></slot>
      <slot name="left"></slot>
      <slot></slot>
      <slot name="btn-group--middle"></slot>
      <slot name="middle"></slot>
      <slot name="btn-group--right"></slot>
      <slot name="right"></slot>
    </div>
`;
  }

  static get is() {
    return 'dnd-toolbar';
  }

  static get properties() {
    return {};
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(Toolbar.is, Toolbar);
