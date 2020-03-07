import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-layout';
import '../dnd-selection-list';

class DndCultsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout header="Cults">
        <dnd-selection-list
          enable-hash-routing
          model-id="cults"
          columns='[
				{"id":"name","label":"Name"}
			]'
        >
        </dnd-selection-list>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-cults-view', DndCultsView);