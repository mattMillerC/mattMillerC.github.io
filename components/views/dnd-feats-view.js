import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-layout';
import '../dnd-selection-list';

class DndFeatsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout header="Feats">
        <dnd-selection-list
          enable-hash-routing
          model-id="feats"
          columns='[
				{"id":"name","label":"Name"},
				{"id":"source","label":"Source"}, 
				{"id":"ability","label":"Ability"},
				{"id":"prerequisite","label":"Prerequisite","cssClass":"hidden-mobile-down"}
			]'
        >
        </dnd-selection-list>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-feats-view', DndFeatsView);