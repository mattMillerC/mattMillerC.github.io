import {PolymerElement, html} from '@polymer/polymer';
import {MDCTabBar} from '@material/tab-bar';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-tabs.js";


class DndCharacterBuilderView extends PolymerElement {
  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();

    this.tabs = [
      { label: "Attributes & Proficiencies", icon: "favorite" },
      { label: "Class Levels", icon: "class" },
      { label: "Background & Race", icon: "face" },
      { label: "Equipment", icon: "local_grocery_store" },
    ]
  }

  connectedCallback() {
    super.connectedCallback();
  }
  
  static get template() {
    return html`
      <style include="my-styles"></style>

      <dnd-tabs tabs="[[tabs]]" initial-selected-index="1"></dnd-tabs>
      `;
  }
  
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);