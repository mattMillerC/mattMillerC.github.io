import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-rules';
import '../dnd-layout';

class DndRulesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout header="Rules">
        <dnd-rules></dnd-rules>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-rules-view', DndRulesView);