import { PolymerElement, html } from "@polymer/polymer";
import { getCharacterChannel, getSelectedCharacter, getRaceAttributeOptions, getRaceAttributeDefaults, getBackgroundSkillProfOptions, getBackgroundSkillProfDefaults, mergeFeature } from "../../../util/charBuilder";
import { util_capitalizeAll, absInt } from "../../../js/utils"; 

class DndCharacterBuilderBackgroundRace extends PolymerElement {
  
  static get properties() {
    return {
      selectedBackground: {
        type: String,
        value: ""
      },
      backgroundSkillProfOptions: {
        type: Object,
        value: []
      },
      defaultBackgroundSkillProf: {
        type: String,
        value: ""
      },
      selectedRace: {
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

  async updateFromCharacter(character) {
    this.selectedBackground = character.background.name;
    this.selectedRace = character.race.name;
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
    this.defaultRaceAttribute = defaultRaceAttribute
      .map(e => {
        let attribute = e[0].toLowerCase(),
          mod = e[1];
        return attribute.toUpperCase() + ' ' + absInt(mod);
      }).join(', ');
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
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .col-wrap {
          display: flex;
        }
      </style>

      <div class="col-wrap">

        <div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]"></dnd-select-add>
          <div hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default: [[defaultBackgroundSkillProf]]</div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>


        <div>
          <dnd-select-add model="races" value="[[selectedRace]]"></dnd-select-add>
          <div hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default: [[defaultRaceAttribute]]</div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-background-race", DndCharacterBuilderBackgroundRace);