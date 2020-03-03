import {PolymerElement, html} from '@polymer/polymer';
import '@vaadin/dialog'

class DndOptionPicker extends PolymerElement {
  
  static get properties() {
    return {
      options: {
        type: Array
      }
    };
  }

  static get template() {
    return html`
      <vaadin-dialog aria-label="polymer templates">
        <template>
          
        </template>
      </vaadin-dialog>
    `;
  }
}

customElements.define('dnd-option-picker', DndOptionPicker);