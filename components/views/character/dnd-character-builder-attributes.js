import {PolymerElement, html} from "@polymer/polymer";
import "@vaadin/vaadin-text-field/vaadin-integer-field";
import "../../dnd-select-add";
import "../../dnd-button";
import "../../dnd-svg";
import { 
  getCharacterChannel,
  getSelectedCharacter,
  updateAttr,
  getClassSaves,
  getSkillProfs,
  getRaceAttributeOptions,
  getRaceAttributeDefaults,
  getAttributeScoreModifiers,
  getMaxHP,
  getCurrentHP, getTempHp, setCurrentHp,
  getHitDice,
  resetHitDice,
  addTempHp,
  useHitDice
} from "../../../util/charBuilder";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
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
      attributeProfs: {
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
      },
      maxHP: {
        type: Number
      },
      tempHP: {
        type: Number,
        value: 0
      },
      currentHP: {
        type: Number,
        observer: 'currentHPChange'
      },
      isEditMode: {
        type: Boolean,
        value: false
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

  currentHPChange(currentHP) {
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateAttributesFromCharacter(character);
    };
    
    this.updateAttributesFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
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

      this.attributeProfs = (await getSkillProfs()).join(',');

      this.maxHP = await getMaxHP();
      this.currentHP = await getCurrentHP();
      this.tempHP = await getTempHp();

      this.hitDice = await getHitDice();

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

  _editModeClass(isEditMode) {
    return isEditMode ? 'edit-mode' : 'not-edit-mode';
  }

  _tempHpStr(tempHP) {
    return tempHP && typeof tempHP === 'number' && tempHP > 0 ? ` + ${tempHP}` : '';
  }

  _toggleButtonField(e) {
    const element = e.target.closest('.btn-field');
    const isOpen = element.classList.contains('btn-field--open');
    const isTemp = element.classList.contains('btn-field--temp');
    const intField = element.querySelector('vaadin-integer-field');
    element.classList.toggle('btn-field--open');

    if (isTemp) {
      if (isOpen) {
        const changeVal = parseInt(intField.value);
        if (changeVal) {
          addTempHp(parseInt(this.tempHP) + changeVal);
          intField.value = '';
        }
      } else {
        intField.focus();
      }

    } else {
      if (isOpen) {
        const changeVal = parseInt(intField.value);
        if (changeVal) {
          const modifier = element.classList.contains('btn-field--heal') ? 1 : -1;
          setCurrentHp(parseInt(this.currentHP) + (modifier * changeVal));
          intField.value = '';
        }
      } else {
        intField.focus();
      }
    }
  }

  _submitButtonField(e) {
    if (e.key === 'Enter') {
      const element = e.target.closest('.btn-field');
      const isTemp = element.classList.contains('btn-field--temp');
      const intField = element.querySelector('vaadin-integer-field');
      const changeVal = parseInt(intField.value);
  
      if (changeVal) {
        element.classList.toggle('btn-field--open');
        if (isTemp) {
          addTempHp(parseInt(this.tempHP) + changeVal);
          intField.value = '';
    
        } else {
          const modifier = element.classList.contains('btn-field--heal') ? 1 : -1;
          setCurrentHp(parseInt(this.currentHP) + (modifier * changeVal));
          intField.value = '';
        }
      }
    }
  }

  _useHitDice(e) {
    const element = e.target.closest('.hit-dice__item');
    if (this.currentHP < this.maxHP) {
      const className = element.dataset.className;
      console.error(className);
      useHitDice(className);
    } else {
      // flash error
      element.classList.add('hit-dice__item--error');
      setTimeout(() => {
        element.classList.remove('hit-dice__item--error');
      }, 500);
    }
  }

  _strContains(str, search) {
    return str.indexOf(search) > -1;
  }

  _resetHitDice(e) {
    resetHitDice();
  }

  _triggerShortRest(e) {

  }

  _triggerLongRest(e) {

  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }

        [hidden] {
          visibility: hidden;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .stats {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .attribute-wrap {
          display: flex;
          flex-direction: row;
          min-width: 0;
        }
        .health-wrap {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          min-width: 0;
          flex-shrink: 0;
          justify-content: space-between;
        }
        .health-wrap > div {
          width: calc(33% - 8px);
          max-width: 120px;
        }
        .health-wrap > div:not(:last-child) {
          margin-bottom: 9px;
        }


        /* Proficiencies */
        .proficiencies {
          margin-left: 8px;
          line-height: 1.7;
          min-width: 0;
        }
        .proficiency-item {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          position: relative;
        }

        .proficiency-item::before,
        .proficiency-item[expertise]::after {
          content: '';
          display: inline-block;
          height: 10px;
          width: 10px;
          border: 1px solid var(--mdc-theme-primary);
          border-radius: 50%;
          background-color: transparent;
          margin-right: 8px;
          position: relative;
          top: 1px;
          box-shadow: 0px 0px 10px -4px rgba(0,0,0,0.75);
        }
        .proficiency-item[expertise]::after {
          position: absolute;
          left: 10px;
          top: 5px;
          margin-right: 0;
          background-color: var(--mdc-theme-primary);
        }
        .proficiency-item[expertise]::before {
          margin-right: 14px;
        }
        .proficiency-item[enabled]::before {
          background-color: var(--mdc-theme-primary);
        }


        /* Stat Box */
        .stat-box {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: var(--lumo-contrast-10pct);
          border: 2px solid var(--mdc-theme-text-divider-on-background);
          border-radius: 4px;
        }
        .stat-box:not(:last-child) {
          margin-bottom:16px;
        }
        .stat-box__save {
          position: absolute;
          height: 12px;
          width: 12px;
          border: 2px solid var(--mdc-theme-primary);
          border-radius: 50%;
          top: -8px;
          background-color: #33383C;
          display: none;
        }
        .stat-box__save[enabled] {
          background-color: var(--mdc-theme-primary);
          display: block;
        }
        .stat-box__mod {
          font-size: 40px;
          font-weight: normal;
          margin: 4px 8px 0px;
          line-height: 1;
          position: relative;
          left: 1px;
        }
        .stat-box__footer {
          display: inline-block;
        }
        .not-edit-mode .stat-box__adj {
          position: relative;
          right: 18px;
          color: var(--lumo-body-text-color);
          -webkit-text-fill-color: var(--lumo-body-text-color);
        }


        /* Stat Box HP  */
        .stat-box--hp {
          width: calc(100% - 4px);
        }
        .stat-box__total {
          font-size: 14px;
        }
        .stat-box--hp .stat-box__adj--hp {
          position: absolute;
          bottom: -10px;
          right: 5px;
          font-size: 16px;
        }
        .stat-box--hp .stat-box__footer {
          width: 100%;
        }


        /* Button Field */
        .btn-field {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: calc(100% - 4px);
          height: 36px;
          background: var(--lumo-contrast-10pct);
          border: 2px solid var(--mdc-theme-text-divider-on-background);
          border-radius: 4px;
        }
        .btn-field:not(:last-child){
          margin-bottom: 8px;
        }
        .btn-field__btn {
          display: block;
          width: 100%;
        }
        .btn-field__input {
          display: none;
        }
        .btn-field--open .btn-field__btn {
          width: calc(100% - 60px);
        }
        .btn-field--open .btn-field__btn-label {
          width: 0;
          overflow: hidden;
        }
        .btn-field--open .btn-field__input {
          display: block;
          width: 60px;
          margin-top: -40px;
        }
        .btn-field--heal.btn-field--open .btn-field__btn-label {
          margin-left: -8px;
        }
        .btn-field vaadin-integer-field {
          --lumo-contrast-10pct: transparent;
        }


        /* Hit Dice */
        .hit-dice {
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          padding: 6px 0 0;
          background: var(--lumo-contrast-10pct);
          border: 2px solid var(--mdc-theme-text-divider-on-background);
          margin-bottom: 16px;
        }
        .hit-dice__heading {
          display: inline-block;
          text-align: center;
          margin-bottom: 8px;
          color: var(--mdc-theme-primary);
          text-transform: uppercase;
          font-size: 14px;
        }
        .hit-dice__item {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
        }
        .hit-dice__item dnd-button {
          width: 100%;
        }
        .hit-dice__item--error dnd-button {
          --mdc-theme-primary: var(--lumo-error-color-50pct);
        }
        .hit-dice__item-label {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 4px 0 0;
        }
        .hit-dice__item-label dnd-svg {
          stroke: var(--mdc-theme-on-primary);
          fill: var(--mdc-theme-primary);
          width: 30px;
        }

        /* Rest Buttons */
        .rest-btn {
          margin-bottom: 16px;
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="wrap">
          <div class="health-wrap">
            <!-- Hit Points -->
            <div>
              <div class="stat-box stat-box--hp">
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="hp" value={{currentHP}} min="0" max="[[maxHP]]" has-controls label="Hit Points">
                    <span class="stat-box__adj--hp" slot="suffix">/ [[maxHP]] [[_tempHpStr(tempHP)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
            </div>

            <!--  Healing / Damage -->
            <div class="health-wrap__buttons">
              <div class="btn-field btn-field--heal">
                  <dnd-button icon="favorite" background="none" class="btn-field__btn" on-click="_toggleButtonField">
                    <span class="btn-field__btn-label" slot="label">Heal</span>
                  </dnd-button>
                  <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField">
                    <span slot="prefix">+</span>
                  </vaadin-integer-field>
              </div>
              <div class="btn-field">
                  <dnd-button svg="swords" background="none" class="btn-field__btn" on-click="_toggleButtonField">
                    <span class="btn-field__btn-label" slot="label">Damage</span>
                  </dnd-button>
                  <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField">
                    <span slot="prefix">-</span>
                  </vaadin-integer-field>
              </div>
              <div class="btn-field btn-field--temp">
                  <dnd-button svg="paladin" background="none" class="btn-field__btn" on-click="_toggleButtonField">
                    <span class="btn-field__btn-label" slot="label">Temp HP</span>
                  </dnd-button>
                  <vaadin-integer-field class="btn-field__input" min="0" on-keydown="_submitButtonField">
                    <span slot="prefix">+</span>
                  </vaadin-integer-field>
              </div>
            </div>

            <!--  Hit Dice -->
            <div class="hit-dice">
              <div class="hit-dice__heading">Hit Dice</div>
              <template is="dom-repeat" items="[[hitDice]]">
                <div class="hit-dice__item" data-class-name$="[[item.className]]">
                  <dnd-button on-click="_useHitDice">
                    <div class="hit-dice__item-label" slot="label">
                      <dnd-svg id="[[item.die]]"></dnd-svg>
                      <div class="hit-dice__count">[[item.current]] / [[item.total]]</div>
                    </div>
                  </dnd-button>
                </div>
              </template>
              <dnd-button class="hit-dice__reset" label="Reset" on-click="_resetHitDice"></dnd-button>
            </div>

            <!-- Reset Hit Dice -->

            <!--  Short Rest -->
            <!-- <dnd-button icon="watch" class="rest-btn rest-btn--short" background="var(--lumo-contrast-10pct)" label="Short" on-click="_triggerShortRest"></dnd-button> -->

            <!--  Long Rest -->
            <!-- <dnd-button icon="watch_later" class="rest-btn rest-btn--long" background="var(--lumo-contrast-10pct)" label="Long" on-click="_triggerLongRest"></dnd-button> -->

            
          </div>

          <div class="stats">
            <!--  Attributes -->
            <div class="attribute-wrap">
              <div class="stat-box">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'str')]]"></div>
                <div class="stat-box__mod">[[_mod(strAdj, str)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{str}} min="1" max="20" has-controls label="Strength" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(strAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'athletics')]]">Athletics</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'dex')]]"></div>
                <div class="stat-box__mod">[[_mod(dexAdj, dex)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{dex}} min="1" max="20" has-controls label="Dexterity" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(dexAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'acrobatics')]]">Acrobatics</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'slight of hand')]]">Slight of Hand</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'stealth')]]">Stealth</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'con')]]"></div>
                <div class="stat-box__mod">[[_mod(conAdj, con)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{con}} min="1" max="20" has-controls label="Constitution" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(conAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
              
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'int')]]"></div>
                <div class="stat-box__mod">[[_mod(intAdj, int)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{int}} min="1" max="20" has-controls label="Intellegence" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(intAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'arcana')]]">Arcana</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'history')]]">History</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'investigation')]]">Investigation</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'nature')]]">Nature</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'religion')]]">Religion</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'wis')]]"></div>
                <div class="stat-box__mod">[[_mod(wisAdj, wis)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{wis}} min="1" max="20" has-controls label="Wisdom" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(wisAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'animal handling')]]">Animal Handling</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'insight')]]">Insight</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'medicine')]]">Medicine</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'perception')]]">Perception</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'survival')]]">Survival</div>
              </div>
            </div>
            <div class="attribute-wrap">
              <div class="stat-box">
                <div class="stat-box__save" enabled$="[[_contains(saves, 'cha')]]"></div>
                <div class="stat-box__mod">[[_mod(chaAdj, cha)]]</div>
                <div class="stat-box__footer">
                  <vaadin-integer-field theme="mini" value={{cha}} min="1" max="20" has-controls label="Charisma" disabled$="[[!isEditMode]]">
                    <span class="stat-box__adj" slot="suffix">[[_adjustString(chaAdj)]]</span>
                  </vaadin-integer-field>
                </div>
              </div>
              <div class="proficiencies">
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'deception')]]">Deception</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'intimidation')]]">Intimidation</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'performance')]]">Performance</div>
                <div class="proficiency-item" enabled$="[[_strContains(attributeProfs, 'persuasion')]]">Persuasion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-attributes", DndCharacterBuilderAttributes);