class CreatureListTab extends AsyncActionsMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-tabs.css">
    <style></style>

    <div class="tab-group">
      <div class\$="[[_isActiveClasses('monsters', type)]]" on-click="_setType" data-type="monsters">
        Monsters
      </div>
      <div class\$="[[_isActiveClasses('players', type)]]" on-click="_setType" data-type="players">
        Players
      </div>
      <div class\$="[[_isActiveClasses('npcs', type)]]" on-click="_setType" data-type="npcs">
        NPCs
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-creature-list-tab';
  }

  static get properties() {
    return {
      type: {
        type: Array,
        statePath: 'cursor.model',
      },
    };
  }

  _setType(e) {
    this.dispatch({
      type: 'SET_CURSOR_MODEL',
      model: e.target.dataset.type,
    });
    this.dispatch('loadCursor');
  }

  _isEqual(a, b) {
    return a === b;
  }

  _isActiveClasses(testType) {
    return this.type === testType ? 'tab-item active' : 'tab-item';
  }
}
window.customElements.define(CreatureListTab.is, CreatureListTab);
