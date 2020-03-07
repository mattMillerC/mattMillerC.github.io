import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-layout";
import "../dnd-classes";

class DndClassesView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      <dnd-layout header="Classes">
        <dnd-classes></dnd-classes>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-classes-view', DndClassesView);