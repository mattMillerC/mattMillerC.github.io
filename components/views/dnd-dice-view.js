import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-layout';
import '../dnd-dice';

class DndDiceView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout header="Dice Roller">
        <dnd-dice></dnd-dice>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-dice-view', DndDiceView);