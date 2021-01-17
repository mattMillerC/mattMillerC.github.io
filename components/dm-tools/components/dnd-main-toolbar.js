class MainToolbar extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-toolbar.css">
    <link rel="stylesheet" href="./css/photon-fields.css">
    <style>
      header {
        height: 100%;
        width: calc(100vw - 10px);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      h1 {
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        margin-top: 0;
        margin-bottom: 0;
        flex: 3 100%;
      }
      .flex-wrap {
        display: inline-flex;
      }
      header > div {
        justify-content: center;
      }
      header > div:first-of-type {
        justify-content: flex-start;
      }
      header > div:first-of-type > * {
        margin-right: 5px;
      }
      header > div:last-of-type {
        justify-content: flex-end;
      }
      header > div:last-of-type > * {
        margin-left: 5px;
      }
    </style>

    <header style="-webkit-app-region: drag">
      <dnd-toolbar header="">
        <header>
          <h1>Combat Tracker</h1>
        </header>
      </dnd-toolbar>
    </header>
`;
  }

  static get is() {
    return 'dnd-main-toolbar';
  }
}
window.customElements.define(MainToolbar.is, MainToolbar);
