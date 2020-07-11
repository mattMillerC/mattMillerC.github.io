import {PolymerElement, html} from "@polymer/polymer";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import { getCharacterChannel, getSelectedCharacter, updateAttr, getClassSaves } from "../../../util/charBuilder";

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

  static get template() {
    return html`
      <style include="material-styles">
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
          padding: 16px;
          display: flex;
          justify-content: center;
        }

        .mod {
          border: 1px solid black;
          border-radius: 4px;
          width: 32px;
          margin: 32px auto 0;
        }

        vaadin-integer-field {
          width: 100px;
        }

        th {
          font-weight: normal;
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
              <th>Save</th>
              <th>Proficiencies</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td class="mobile-label"><div class="data">Strength</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'str')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">Athletics</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Dexterity</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'dex')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Constitution</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'con')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Intellegence</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'int')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Wisdom</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'wis')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Charisma</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'cha')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-attributes", DndCharacterBuilderAttributes);