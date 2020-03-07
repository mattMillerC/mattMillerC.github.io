import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-layout';
import '../dnd-selection-list';

class DndPsionicsView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout header="Psionics">
        <dnd-selection-list
          enable-hash-routing
          model-id="psionics"
          columns='[
				{"id":"name","label":"Name"},
				{"id":"source","label":"Source"}, 
				{"id":"psy-type","label":"Type"},
				{"id":"psy-order","label":"Order","cssClass":"hidden-mobile-down"},
				{"id":"psy-mode-list","label":"Mode List","cssClass":"hidden"}
			]'
        >
        </dnd-selection-list>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-psionics-view', DndPsionicsView);