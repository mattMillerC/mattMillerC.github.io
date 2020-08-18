import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter, getClassReferences, getBackgroundReference } from "../../../util/charBuilder";
import EntryRenderer from '../../../util/entryrender.js'
import { entrySearch } from '../../../js/utils.js'

class DndCharacterBuilderEquipment extends PolymerElement {
  
  static get properties() {
    return {
      classEquipment: {
        type: String,
      }
    };
  }

  constructor() {
    super();
    
    this.renderer = new EntryRenderer();
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

  async updateFromCharacter(character) {
    if (character) {
      let firstClass;
      if (character.levels && character.levels.length > 0) {
        const classRefs = await getClassReferences();
        firstClass = classRefs[character.levels[0].name];
        this.$.classEquipment.innerHTML = this.parseClassEquipment(firstClass.startingEquipment);
      } else {
        this.$.classEquipment.innerHTML = "";
      }

      if (!firstClass || firstClass.startingEquipment.additionalFromBackground) {
        const background = await getBackgroundReference();
        if (background) {
          this.$.backgroundEquipment.innerHTML = this.parseBackgroundEquipment(background.entries)
        } else {
          this.$.backgroundEquipment.innerHTML = "";
        }
      } else {
        this.$.backgroundEquipment.innerHTML = "";
      }

    } else {
      this.$.backgroundEquipment.innerHTML = "";
      this.$.classEquipment.innerHTML = "";
    }
  }

  parseClassEquipment(classEquip) {
    if (classEquip) {
      const fromBackground = classEquip.additionalFromBackground
        ? "<p>You start with the following items, plus anything provided by your background.</p>"
        : "";
      const defList = classEquip.default.length === 0 ? "" : `<ul><li>${classEquip.default.map(i => this.renderStr(i)).join("</li><li>")}</ul>`;
      const goldAlt =
        classEquip.goldAlternative === undefined
          ? ""
          : `<p>Alternatively, you may start with ${this.renderStr(classEquip.goldAlternative)} gp to buy your own equipment.</p>`;
      return `${fromBackground}${defList}${goldAlt}`;
    }
  }

  parseBackgroundEquipment(backgroundEntries) {
    if (backgroundEntries) {
      const equipmentEntry = entrySearch("Equipment", backgroundEntries);
      const renderedEquipment = this.renderStr(equipmentEntry.entry);
      return `<p>${renderedEquipment}</p>`;
    }
  }

  renderStr(string) {
    let renderStack = []
    this.renderer.recursiveEntryRender(string, renderStack, 0);
    return renderStack.join(" ");
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
        a {
          color: var(--mdc-theme-secondary);
        }
      </style>

      <div>
        <h2>Class</h2>
        <div id="classEquipment"></div>
        <h2>Background</h2>
        <div id="backgroundEquipment"></div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment", DndCharacterBuilderEquipment);