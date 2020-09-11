import {PolymerElement, html} from "@polymer/polymer";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "../../dnd-select-add";
import { 
  getCharacterChannel,
  getSelectedCharacter,
  updateAttr,
  getClassSaves,
  getSkillProfs,
  getRaceAttributeOptions,
  getRaceAttributeDefaults,
  getAttributeScoreModifiers
} from "../../../util/charBuilder";
import { util_capitalizeAll, absInt } from "../../../js/utils";

class DndCharacterBuilderAttributes extends PolymerElement {
  
  static get properties() {
    return {
      str: {
        type: Number
      },
      dex: {
        type: Number
      },
      con: {
        type: Number
      },
      int: {
        type: Number
      },
      wis: {
        type: Number
      },
      cha: {
        type: Number
      },
      strAdj: {
        type: Number,
        value: 0
      },
      dexAdj: {
        type: Number,
        value: 0
      },
      conAdj: {
        type: Number,
        value: 0
      },
      intAdj: {
        type: Number,
        value: 0
      },
      wisAdj: {
        type: Number,
        value: 0
      },
      chaAdj: {
        type: Number,
        value: 0
      },
      strProfs: {
        type: String,
        value: ""
      },
      dexProfs: {
        type: String,
        value: ""
      },
      intProfs: {
        type: String,
        value: ""
      },
      wisProfs: {
        type: String,
        value: ""
      },
      chaProfs: {
        type: String,
        value: ""
      },

      saves: {
        type: Array,
        value: []
      },
      classSkillProfOptions: {
        type: Object,
        value: {}
      },
      backgroundSkillProfOptions: {
        type: Object,
        value: []
      },
      defaultBackgroundSkillProf: {
        type: String,
        value: ""
      },
      raceAttributeOptions: {
        type: Object,
        value: []
      },
      defaultRaceAttribute: {
        type: String,
        value: ""
      }
    };
  }

  static get observers() {
    return ["updateCharAttr(str, dex, con, int, wis, cha)"]
  }

  updateCharAttr(str, dex, con, int, wis, cha) {
    if (str && dex && con && int && wis && cha) {
      updateAttr({str, dex, con, int, wis, cha});
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateAttributesFromCharacter(character);
    };
    
    this.updateAttributesFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
  }

  async updateAttributesFromCharacter(character) {
    if (character && character.attr) {
      const attr = character.attr;
      if (attr.str !== this.str || attr.dex !== this.dex || attr.con !== this.con 
          || attr.int !== this.int || attr.wis !== this.wis || attr.cha !== this.cha) {
        this.setProperties({
          str: character.attr.str,
          dex: character.attr.dex,
          con: character.attr.con,
          int: character.attr.int,
          wis: character.attr.wis,
          cha: character.attr.cha
        });
      }

      this.saves = await getClassSaves();

      // Attributes from Race
      let attributeAdj = await getAttributeScoreModifiers();
      let raceAttributes = await getRaceAttributeOptions();
      if (raceAttributes && raceAttributes.choose) {
        this.raceAttributeOptions = raceAttributes.choose.from.map(i => { return i.toUpperCase() });
        this.raceAttributeChoices = raceAttributes.choose.count || 1;
        this.raceAttributeSelections = character.raceAttributes;
      } else {
        this.raceAttributeOptions = undefined;
        this.raceAttributeChoices = undefined;
        this.raceAttributeSelections = undefined;
      }
      let defaultRaceAttribute = await getRaceAttributeDefaults(raceAttributes);
      this.defaultRaceAttribute = defaultRaceAttribute
        .map(e => {
          let attribute = e[0].toLowerCase(),
            mod = e[1];
          return attribute.toUpperCase() + ' ' + absInt(mod);
        }).join(', ');

      this.strAdj = attributeAdj.str;
      this.dexAdj = attributeAdj.dex;
      this.conAdj = attributeAdj.con;
      this.intAdj = attributeAdj.int;
      this.wisAdj = attributeAdj.wis;
      this.chaAdj = attributeAdj.cha;

      let strProfs = await getSkillProfs('str')
      this.strProfs = strProfs.map(s => {return util_capitalizeAll(s)}).join(', ');
      let dexProfs = await getSkillProfs('dex')
      this.dexProfs = dexProfs.map(s => {return util_capitalizeAll(s)}).join(', ');
      let intProfs = await getSkillProfs('int')
      this.intProfs = intProfs.map(s => {return util_capitalizeAll(s)}).join(', ');
      let wisProfs = await getSkillProfs('wis')
      this.wisProfs = wisProfs.map(s => {return util_capitalizeAll(s)}).join(', ');
      let chaProfs = await getSkillProfs('cha')
      this.chaProfs = chaProfs.map(s => {return util_capitalizeAll(s)}).join(', ');

      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
    }
  }

  _adjustString(adj) {
    if (adj !== 0 && adj !== undefined) {
      return absInt(adj);
    }
    return "";
  }

  _total(a, b) {
    let intA = parseInt(a),
      intB = parseInt(b);

    intA = isNaN(intA) ? 0 : intA;
    intB = isNaN(intB) ? 0 : intB;

    return intA + intB;
  }

  _mod(base, adj) {
    return absInt(Math.floor((this._total(base, adj) - 10) / 2));
  }

  _contains(saves, str) {
    return saves.indexOf(str) > -1;
  }

  _exists() {
    for (let arg of arguments) {
      if (!!arg && (arg.constructor !== Object || Object.entries(arg).length > 0) && (!Array.isArray(arg) || arg.length > 0)) {
        return true;
      }
    }
    return false;
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }

        .default-selection {
          font-style: italic;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          margin-bottom: 12px;
        }

        .row.heading {
          margin-bottom: 0;
        }

        .data {
          font-size: 18px;
          padding: 10px 8px 8px;
          display: flex;
          justify-content: center;
          margin-bottom: 4px;
          min-width: 24px;
        }

        .data:last-child {
          flex-basis: 100%;
        }
        
        .heading .data {
          font-weight: bold;
          margin-bottom: 0;
          padding-bottom: 0;
          font-size: 14px;
        }

        .mod {
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          width: 24px;
          margin-left: auto;
          margin-right: auto;
          border: 2px solid var(--mdc-theme-primary);
        }
        .mod.no-bg {
          background: none;
          border: none;
        }

        .prof {
          justify-content: flex-start;
          margin: 0 12px;
        }

        .heading .prof {
          display: none;
        }

        .mobile-label .data {
          justify-content: flex-start;
        }

        vaadin-integer-field {
          width: 100px;
        }

        .input {
          width: 84px;
          flex-shrink: 0;
        }
        
        .save {
          width: 24px;
        }

        .save-icon {
          width: 24px;
        }

        [hidden] {
          visibility: hidden;
        }
        @media(min-width: 420px) {
          .mod {
            width: 32px;
          }
          .data {
            min-width: 44px;
          }
          .heading .data {
            font-size: 18px;
          }
        }
        @media(min-width: 921px) {
          .mobile-label {
            display: none;
          }
          .attr-choice-wrap,
          .prof-choice-wrap {
            flex-direction: row;
          }
          .row {
            flex-wrap: nowrap;
          }
          .heading .prof {
            display: block;
          }
        }
      </style>

      <h2>Attributes</h2>
      <div class="stats">
        <div class="row heading">
          <div class="input data"></div>
          <div class="save data">Save</div>
          <div class="adj data">Adj.</div>
          <div class="total data">Total</div>
          <div class="mod data no-bg">Mod</div>
          <div class="prof data"></div>
        </div>
        <div class="row">
          <vaadin-integer-field value={{str}} min="1" max="20" has-controls label="Strength"></vaadin-integer-field>
          <div class="save data">
            <span hidden$="[[!_contains(saves, 'str')]]" class="save-icon material-icons">done</span>
          </div>
          <div class="adj data">[[_adjustString(strAdj)]]</div>
          <div class="total data">[[_total(strAdj, str)]]</div>
          <div class="mod data">[[_mod(strAdj, str)]]</div>
          <div class="prof data">[[strProfs]]</div>
        </div>

        <div class="row">
          <vaadin-integer-field value={{dex}} min="1" max="20" has-controls label="Dexterity"></vaadin-integer-field>
          <div class="save data">
            <span hidden$="[[!_contains(saves, 'dex')]]" class="save-icon material-icons">done</span>
          </div>
          <div class="adj data">[[_adjustString(dexAdj)]]</div>
          <div class="total data">[[_total(dexAdj, dex)]]</div>
          <div class="mod data">[[_mod(dexAdj, dex)]]</div>
          <div class="prof data">[[dexProfs]]</div>
        </div>

        <div class="row">
          <vaadin-integer-field value={{con}} min="1" max="20" has-controls label="Constitution"></vaadin-integer-field>
          <div class="save data">
            <span hidden$="[[!_contains(saves, 'con')]]" class="save-icon material-icons">done</span>
          </div>
          <div class="adj data">[[_adjustString(conAdj)]]</div>
          <div class="total data">[[_total(conAdj, con)]]</div>
          <div class="mod data">[[_mod(conAdj, con)]]</div>
          <div class="prof data">[[conProfs]]</div>
        </div>

        <div class="row">
          <vaadin-integer-field value={{int}} min="1" max="20" has-controls label="Intellegence"></vaadin-integer-field>
          <div class="save data">
            <span hidden$="[[!_contains(saves, 'int')]]" class="save-icon material-icons">done</span>
          </div>
          <div class="adj data">[[_adjustString(intAdj)]]</div>
          <div class="total data">[[_total(intAdj, int)]]</div>
          <div class="mod data">[[_mod(intAdj, int)]]</div>
          <div class="prof data">[[intProfs]]</div>
        </div>

        <div class="row">
          <vaadin-integer-field value={{wis}} min="1" max="20" has-controls label="Wisdom"></vaadin-integer-field>
          <div class="save data">
            <span hidden$="[[!_contains(saves, 'wis')]]" class="save-icon material-icons">done</span>
          </div>
          <div class="adj data">[[_adjustString(wisAdj)]]</div>
          <div class="total data">[[_total(wisAdj, wis)]]</div>
          <div class="mod data">[[_mod(wisAdj, wis)]]</div>
          <div class="prof data">[[wisProfs]]</div>
        </div>

        <div class="row">
          <vaadin-integer-field value={{cha}} min="1" max="20" has-controls label="Charisma"></vaadin-integer-field>
          <div class="save data">
            <span hidden$="[[!_contains(saves, 'cha')]]" class="save-icon material-icons">done</span>
          </div>
          <div class="adj data">[[_adjustString(chaAdj)]]</div>
          <div class="total data">[[_total(chaAdj, cha)]]</div>
          <div class="mod data">[[_mod(chaAdj, cha)]]</div>
          <div class="prof data">[[chaProfs]]</div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-attributes", DndCharacterBuilderAttributes);