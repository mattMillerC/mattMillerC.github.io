import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-layout';
import '../dnd-selection-list';

class DndVariantrulesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout header="Variant Rules">
        <dnd-selection-list
          enable-hash-routing
          model-id="variantrules"
          columns='[
				{"id":"name","label":"Name"},
				{"id":"source","label":"Source"},
				{"id":"rules-search","label":"Rules","cssClass":"hidden"}
			]'
        >
        </dnd-selection-list>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-variantrules-view', DndVariantrulesView);