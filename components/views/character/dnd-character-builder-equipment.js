import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter, getClassReferences, getBackgroundReference } from "../../../util/charBuilder";
import EntryRenderer from '../../../util/entryrender.js'
import { entrySearch } from '../../../js/utils.js'

class DndCharacterBuilderEquipment extends PolymerElement {
  
  static get properties() {
    return {
      classEquipment: {
        type: String,
      },
      hasClass: {
        type: Boolean,
        value: false
      },
      hasBackground: {
        type: Boolean,
        value: false
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
    this.hasClass = false;
    this.hasBackground = false;
    this.$.backgroundEquipment.innerHTML = "";
    this.$.classEquipment.innerHTML = "";
    if (character) {
      let firstClass;
      if (character.levels && character.levels.length > 0) {
        const classRefs = await getClassReferences();
        firstClass = classRefs[character.levels[0].name];
        this.hasClass = true;
        this.$.classEquipment.innerHTML = this.parseClassEquipment(firstClass.startingEquipment);
      }

      if (!firstClass || firstClass.startingEquipment.additionalFromBackground) {
        const background = await getBackgroundReference();
        if (background) {
          this.hasBackground = true;
          this.$.backgroundEquipment.innerHTML = this.parseBackgroundEquipment(background.entries)
        }
      }
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

        .col-wrap {
          display: flex; 
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:first-child {
          margin-bottom: 24px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        span {
          font-size: 14px;
          font-style: italic;
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
        }
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <h2>From Class</h2>
          <span hidden$=[[hasClass]]>Select a class to see equipment</span>
          <div id="classEquipment"></div>
        </div>

        <div class="row-wrap">
          <h2>From Background</h2>
          <span hidden$=[[hasBackground]]>Select a background to see equipment</span>
          <div id="backgroundEquipment"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-equipment", DndCharacterBuilderEquipment);