import {PolymerElement, html} from "@polymer/polymer";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "../../dnd-select-add";
import { 
  getCharacterChannel,
  getSelectedCharacter,
  updateAttr,
  getClassSaves,
  setClassSkillProficiencies,
  getSkillProfs,
  getRaceAttributeOptions,
  getRaceAttributeDefaults,
  getASIAndFeatAttributeData
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
      let attributeAdj = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      };
      let raceAttributes = await getRaceAttributeOptions();
      if (raceAttributes && raceAttributes.choose) {
        this.raceAttributeOptions = raceAttributes.choose.from.map(i => { return i.toUpperCase() });
        this.raceAttributeChoices = raceAttributes.choose.count || 1;
        this.raceAttributeSelections = character.raceAttributes;
        character.raceAttributes.forEach(a => {
          attributeAdj[a.toLowerCase()] ++;
        });
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
          attributeAdj[attribute] += mod;
          return attribute.toUpperCase() + ' ' + absInt(mod);
        }).join(', ');

      let asiData = await getASIAndFeatAttributeData();
      for (let asi of asiData) {
        if (asi.featSelections) {
          attributeAdj[asi.featSelections.toLowerCase()] += 1;
        }
        if (asi.featAttribute) {
          Object.entries(asi.featAttribute).filter(e => { return e[0] !== 'choose'}).forEach(e => {
            let attribute = e[0].toLowerCase(),
            mod = e[1];
            attributeAdj[attribute] += mod;
          });
        }
        if (asi.asiAttributes) {
          Object.entries(asi.asiAttributes).forEach(e => {
            let attribute = e[0].toLowerCase(),
            mod = e[1];
            attributeAdj[attribute] += mod;
          });
        }
      }
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

        .table-wrap {
          display: flex;
          flex-wrap: wrap;
        }
        .stats {
          width: 100%;
        }

        .row {
          height: 92px;
        }

        .data {
          margin-top: 32px;
          font-size: 18px;
          padding: 10px 8px 8px;
          display: flex;
          justify-content: center;
        }

        .mod {
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          width: 32px;
          margin-left: auto;
          margin-right: auto;
        }

        .prof {
          justify-content: flex-start;
        }

        .mobile-label .data {
          justify-content: flex-start;
        }

        vaadin-integer-field {
          width: 100px;
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

        @media(min-width: 921px) {
          .stats {
            width: 50%;
          }
          .mobile-label {
            display: none;
          }
          .attr-choice-wrap,
          .prof-choice-wrap {
            flex-direction: row;
          }
        }
      </style>

      <h2>Attributes</h2>
      <div class="table-wrap">
        <table class="stats">
          <thead>
            <tr>
              <th></th>
              <th>Adjust.</th>
              <th>Total</th>
              <th>Mod.</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td><vaadin-integer-field value={{str}} min="1" max="20" has-controls label="Strength"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(strAdj)]]</div></td>
              <td><div class="total data">[[_total(strAdj, str)]]</div></td>
              <td><div class="mod data">[[_mod(strAdj, str)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{dex}} min="1" max="20" has-controls label="Dexterity"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(dexAdj)]]</div></td>
              <td><div class="total data">[[_total(dexAdj, dex)]]</div></td>
              <td><div class="mod data">[[_mod(dexAdj, dex)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{con}} min="1" max="20" has-controls label="Constitution"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(conAdj)]]</div></td>
              <td><div class="total data">[[_total(conAdj, con)]]</div></td>
              <td><div class="mod data">[[_mod(conAdj, con)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{int}} min="1" max="20" has-controls label="Intellegence"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(intAdj)]]</div></td>
              <td><div class="total data">[[_total(intAdj, int)]]</div></td>
              <td><div class="mod data">[[_mod(intAdj, int)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{wis}} min="1" max="20" has-controls label="Wisdom"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(wisAdj)]]</div></td>
              <td><div class="total data">[[_total(wisAdj, wis)]]</div></td>
              <td><div class="mod data">[[_mod(wisAdj, wis)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{cha}} min="1" max="20" has-controls label="Charisma"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(chaAdj)]]</div></td>
              <td><div class="total data">[[_total(chaAdj, cha)]]</div></td>
              <td><div class="mod data">[[_mod(chaAdj, cha)]]</div></td>
            </tr>
          </tbody>
        </table>

        <table class="stats">
          <thead>
            <tr>
              <th class="mobile-label">Attribute</th>
              <th><div class="save">Save</div></th>
              <th><div class="prof">Proficiencies</div></th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td class="mobile-label"><div class="data">STR</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'str')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[strProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">DEX</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'dex')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[dexProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">CON</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'con')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">INT</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'int')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[intProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">WIS</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'wis')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[wisProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">CHA</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'cha')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[chaProfs]]</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-attributes", DndCharacterBuilderAttributes);