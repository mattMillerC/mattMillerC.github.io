import { PolymerElement, html } from "@polymer/polymer";
import { getSelectedCharacter, getASIForLevel, getCharacterChannel, setASI, getFeatReference, setFeatAttributeSelection } from "../util/charBuilder";

class DndAsiSelect extends PolymerElement {
  
  static get properties() {
    return {
      levelIndex: {
        type: Number
      },
      checked: {
        type: Boolean,
        value: false
      },
      selectedFeat: {
        type: Object
      },
      selectedAbility1: {
        type: String,
        value: ''
      },
      selectedAbility2: {
        type: String,
        value: ''
      },
      featHasAttributeChoice: {
        type: Boolean,
        value: false
      },
      featAttributeSelection: {
        type: String,
        value: ''
      },
      featAttributeOptions: {
        type: Array,
        value: []
      }
    };
  }

  constructor() {
    super();
    this.attributeOptions = [
      "STR",
      "DEX",
      "CON",
      "INT",
      "WIS",
      "CHA"
    ]
  }

  connectedCallback() {
    super.connectedCallback();

    this.switchChangeHandler = (e) => {
      this.checked = e.detail.checked;
      this._genASICallback()();
    }
    this.addEventListener("switch-change", this.switchChangeHandler);

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("switch-change", this.switchChangeHandler);
    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
  }

  async updateFromCharacter(character) {
    const { asi, index } = await getASIForLevel(this.levelIndex, character);

    this.featHasAttributeChoice = false;
    if (asi) {
      this.selectedFeat = asi.feat;
      this.selectedAbility1 = asi.ability1;
      this.selectedAbility2 = asi.ability2;
      this.checked = asi.isFeat;

      if (asi.isFeat && asi.feat && asi.feat.name && asi.feat.source) {
        const featId = `${asi.feat.name}_${asi.feat.source}`;
        const featRef = await getFeatReference(featId);

        if (featRef.ability && featRef.ability.length && featRef.ability[0].choose) {
          this.featHasAttributeChoice = true;
          this.featAttributeOptions = featRef.ability[0].choose.from.map(i => { return i.toUpperCase() });
          this.featAttributeSelection = character.featAttributeSelections && character.featAttributeSelections[featId] 
            ? character.featAttributeSelections[featId] : '';
        }
      }
    } else {
      this.selectedFeat = { name: '', source: '' };
      this.selectedAbility1 = '';
      this.selectedAbility2 = '';
      this.checked = false;
    }
    this.asiIndex = index;
  }

  _genASICallback(keyForChange) {
    return (newVal) => {
      setASI({
        feat: keyForChange === 'feat' ? { name: newVal.name, source: newVal.source } : this.selectedFeat,
        ability1: keyForChange === 'ability1' ? newVal : this.selectedAbility1,
        ability2: keyForChange === 'ability2' ? newVal : this.selectedAbility2,
        isFeat: this.checked
      }, this.asiIndex);
    }
  }

  _genFeatAbilityCallback() {
    return (newVal) => {
      if (this.selectedFeat && this.selectedFeat.name && this.selectedFeat.source) {
        const featId = `${this.selectedFeat.name}_${this.selectedFeat.source}`;
        setFeatAttributeSelection(featId, newVal);
      }
    }
  }

  static get template() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }
        [hidden] {
          display: none !important;
        }
        .abilities {
          display: flex;
          flex-wrap: wrap;
        }
        .abilities dnd-select-add {
          width: calc(50% - 8px);
        }
        dnd-select-add + dnd-select-add {
          margin-left: 16px;
        }
        dnd-select-add {
          display: block;
        }
      </style>

      <dnd-switch initial-value=[[checked]] label="Use Feat"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_genASICallback('ability1')]]" value="[[selectedAbility1]]" options="[[attributeOptions]]" placeholder="<ASI>"></dnd-select-add>
        <dnd-select-add add-callback="[[_genASICallback('ability2')]]" value="[[selectedAbility2]]" options="[[attributeOptions]]" placeholder="<ASI>"></dnd-select-add>
      </div>
      <div hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_genASICallback('feat')]]" model="feats" value="[[selectedFeat.name]]" placeholder="<Choose Feat>"></dnd-select-add>
      </div>
      <div hidden$=[[!featHasAttributeChoice]]>
        <dnd-select-add test add-callback="[[_genFeatAbilityCallback()]]" value="[[featAttributeSelection]]" options="[[featAttributeOptions]]" placeholder="<Choose Attribute>"></dnd-select-add>
      </div>
    `;
  }
}

customElements.define("dnd-asi-select", DndAsiSelect);