import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter } from "../../../util/charBuilder";

class DndCharacterBuilderClassLevel extends PolymerElement {
  
  static get properties() {
    return {
    };
  }

  connectedCallback() {
    super.connectedCallback();

  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static get template() {
    return html`
      <style>
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>

      <div class="row">
        Class
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-class-level", DndCharacterBuilderClassLevel);