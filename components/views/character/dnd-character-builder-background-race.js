import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter } from "../../../util/charBuilder";

class DndCharacterBuilderBackgroundRace extends PolymerElement {
  
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
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>

      <div class="row">
        Background and Race
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-background-race", DndCharacterBuilderBackgroundRace);