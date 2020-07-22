import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-tabs.js";
import "../dnd-character-select";
import { jqEmpty } from "../../js/utils.js";
import { getCharacterChannel, getSelectedCharacter, updateName, getClassString, getFeatureString, addCharacter, removeSelectedCharacter } from '../../util/charBuilder.js';


class DndCharacterBuilderView extends PolymerElement {
  static get properties() {
    return {
      characterName: {
        type: String,
        value: ''
      }
    }
  }

  static get observers() {
    return ['_setName(characterName)']
  }

  _setName(characterName) {
    if (characterName) {
      updateName(characterName);
    }
  }

  constructor() {
    super();

    this.tabs = [
      { label: "Attributes & Proficiencies", icon: "favorite", viewId: "attributes" },
      { label: "Class Levels", icon: "class", viewId: "class" },
      { label: "Background & Race", icon: "face", viewId: "background-race" },
      { label: "Equipment", icon: "local_grocery_store", viewId: "equipment" },
    ]
  }

  connectedCallback() {
    super.connectedCallback();

    this.views = {};

    this.tabChangeHandler = (e) => {
      let newTabIndex = e.detail.index,
        newViewId = this.tabs[newTabIndex].viewId;

      if (newViewId !== undefined) {
       
        if (this.views[newViewId]) {
          this.updateView(this.views[newViewId]);
        } else {
          import(`./character/dnd-character-builder-${newViewId}`)
            .then(() => {
              this.views[newViewId] = document.createElement(`dnd-character-builder-${newViewId}`);
              this.updateView(this.views[newViewId]);
            });
        } 
      }
    }
    this.addEventListener("tabChange", this.tabChangeHandler);

    this.setStateFromCharacter(getSelectedCharacter());
    this.characterChangeHandler = (e) => {
      this.setStateFromCharacter(e.detail.character);
    };
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.nameFieldFocusHandler = (e) => {
      if (this.$.name.value === "New Character") {
        this.$.name.inputElement.select();
      }
    }
    this.$.name.addEventListener("focus", this.nameFieldFocusHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("tabChange", this.tabChangeHandler);
    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    this.$.name.removeEventListener("focus", this.nameFieldFocusHandler)
  }

  updateView(el) {
    jqEmpty(this.$.tabTarget);
    this.$.tabTarget.appendChild(el);
  }

  setStateFromCharacter(character) {
    this.characterName = character.name;
    this.classLevel = getClassString(character);
    this.background = getFeatureString("backgrounds", character, true);
    this.race = getFeatureString("races", character, true);
  }

  newCharacter() {
    addCharacter();
  }

  removeCharacter() {
    removeSelectedCharacter();
  }
  
  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        .head-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
        }

        .char-change {
          display: flex;
        }
        .char-change vaadin-text-field {
          font-size: 24px;
          margin: 0 8px 12px 0;
          max-width: calc(100% - 140px);
        }
        .char-change .mdc-icon-button {
          margin-left: 8px;
        }
        .char-detail {
          font-size: 20px;
          line-height: 1.5;
          margin-left: 8px;
        }
      </style>

      <div class="head-wrap">
        <div class="char-change">
          <vaadin-text-field id="name" class="name" value="{{characterName}}"></vaadin-text-field>
          <dnd-character-select mini></dnd-character-select>
          <button class="mdc-icon-button material-icons" on-click="newCharacter">person_add</button>
          <button class="mdc-icon-button material-icons" on-click="removeCharacter">delete</button>
        </div>

        <div class="char-detail">
          <div class="class">[[classLevel]]</div>
          <div class="race-background">[[race]] - [[background]]</div>
        </div>
      </div>

      <dnd-tabs tabs="[[tabs]]" initial-selected-index="1"></dnd-tabs>

      <div id="tabTarget"></div>
    `;
  }
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);