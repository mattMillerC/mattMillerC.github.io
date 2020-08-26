import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter } from "../../../util/charBuilder";

class DndCharacterBuilderSpells extends PolymerElement {
  
  static get properties() {
    return {
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
  }

  updateFromCharacter(character) {

  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
      </style>

      <h2>Spells</h2>
      <div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-spells", DndCharacterBuilderSpells);