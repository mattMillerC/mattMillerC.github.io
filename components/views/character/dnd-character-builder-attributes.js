import {PolymerElement, html} from "@polymer/polymer";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "../../dnd-select-add";
import { 
  getCharacterChannel,
  getSelectedCharacter,
  updateAttr,
  getClassSaves,
  getClassSkillProfOptions,
  setClassSkillProficiencies,
  getBackgroundSkillProfOptions,
  setBackgroundSkillProficiencies,
  getBackgroundSkillProfDefaults,
  getSkillProfs,
  getRaceAttributeOptions,
  getRaceAttributeDefaults,
  setRaceAttributes
} from "../../../util/charBuilder";
import { util_capitalizeAll } from "../../../js/utils";

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

      // Skills from Class
      this.classSkillProfOptions = await getClassSkillProfOptions();
      this.classSkillProfSelections = character.classSkillProficiencies;

      // Skills from Background
      let backgroundSkills = await getBackgroundSkillProfOptions();
      if (backgroundSkills && backgroundSkills.choose) {
        this.backgroundSkillProfOptions = backgroundSkills.choose.from;
        this.backgroundSkillProfChoices = backgroundSkills.choose.count || 1;
        this.backgroundSkillProfSelections = character.backgroundSkillProficiencies;
      } else {
        this.backgroundSkillProfOptions = undefined;
        this.backgroundSkillProfChoices = undefined;
        this.backgroundSkillProfSelections = undefined;
      }
      let defaultBackgroundSkillProf = await getBackgroundSkillProfDefaults(backgroundSkills);
      this.defaultBackgroundSkillProf = defaultBackgroundSkillProf.map(e => { return util_capitalizeAll(e) }).join(', ');

      // Attributes from Race
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
      this.defaultRaceAttribute = defaultRaceAttribute.map(e => { return e[0].toUpperCase() + ' ' + this._absInt(e[1]) }).join(', ');

      // todo = Attributes from Feats

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
      return this._absInt(adj);
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
    return this._absInt(Math.floor((this._total(base, adj) - 10) / 2));
  }

  _absInt(int) {
    return int > 0 ? "+" + int : int;
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

  _classSkillAddCallback(skills) {
    setClassSkillProficiencies(skills);
  }

  _backgroundSkillAddCallback(skills) {
    setBackgroundSkillProficiencies(skills);
  }

  _raceAttributeAddCallback(attr) {
    setRaceAttributes(attr);
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          background: var(--mdc-theme-surface);
          display: block;
          padding: 24px;
          border: 1px solid var(--lumo-contrast-20pct);
        }
        .attr-choice-wrap,
        .prof-choice-wrap {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
        }

        .table-wrap {
          display: flex;
          flex-wrap: wrap;
        }
        .stats {
          width: 100%;
          margin-top: 32px;
        }

        .row {
          height: 92px;
        }

        .data {
          margin-top: 32px;
          font-size: 18px;
          padding: 8px;
          display: flex;
          justify-content: center;
        }

        .mod {
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          width: 32px;
          margin: 32px auto 0;
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
        }
      </style>
  
      <div class="prof-choice-wrap">
        <div>
          <div hidden$="[[_exists(classSkillProfOptions)]]">Select 1st Level to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(classSkillProfOptions)]]">Skill Proficiencies from Class</div>
          <dnd-select-add hidden$="[[!_exists(classSkillProfOptions)]]" choices="[[classSkillProfOptions.count]]" placeholder="<Choose Skills>"
            options="[[classSkillProfOptions.from]]" value="[[classSkillProfSelections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
        </div>

        <div>
          <div hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]">Default: [[defaultBackgroundSkillProf]]</div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>
      </div>

      <div class="attr-choice-wrap">
        <div>
          <div hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]">Default: [[defaultRaceAttribute]]</div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>
      </div>

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