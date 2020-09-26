import {PolymerElement, html} from '@polymer/polymer';
import "../styles/material-styles.js";
import "../styles/my-styles.js";
import "../dnd-tabs.js";
import "../dnd-character-select";
import "../dnd-spinner";
import "../dnd-switch";
import { jqEmpty } from "../../js/utils.js";
import { getCharacterChannel, getSelectedCharacter, updateName, getClassString, getFeatureString, addCharacter, removeSelectedCharacter } from '../../util/charBuilder.js';
import registerSwipe from '../../util/swipe.js';
import { dispatchEditModeChange } from '../../util/editMode.js';

class DndCharacterBuilderView extends PolymerElement {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      characterName: {
        type: String,
        value: ''
      },
      initialSelectedTab: {
        type: Number,
        value: 0
      },
      indexForTabs: {
        type: Number,
        value: 0
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
      { label: "Class Levels", icon: "class", viewId: "class" },
      { label: "Race & Background", icon: "face", viewId: "background-race" },
      { label: "Attributes & Proficiencies", icon: "favorite", viewId: "attributes" },
      { label: "Spells", icon: "flash_on", viewId: "spells" },
      { label: "Equipment", icon: "local_grocery_store", viewId: "equipment" },
    ]
  }

  connectedCallback() {
    super.connectedCallback();

    this.tabChangeHandler = (e) => {
      let newTabIndex = e.detail.index,
        newViewId = this.tabs[newTabIndex].viewId;

      this.indexForTabs = newTabIndex;
      if (newViewId !== undefined) {
        this.loading = true;
        import(`./character/dnd-character-builder-${newViewId}`)
          .then(() => {
            this.updateView(document.createElement(`dnd-character-builder-${newViewId}`));
          });
      }
    };
    this.addEventListener("tabChange", this.tabChangeHandler);

    this.loadingHandler = () => {
      setTimeout(() => {
        this.loading = false;
      }, 0);
    };
    this.addEventListener("loadingChange", this.loadingHandler);

    this.setStateFromCharacter(getSelectedCharacter());
    this.characterChangeHandler = (e) => {
      this.setStateFromCharacter(e.detail.character);
    };
    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);

    this.fixedTabsScrollHandler = () => {
      const heightDiff = this.$.tabWrap.getBoundingClientRect().top;

      if (heightDiff <= 104) {
        this.$.tabs.classList.add('fixed');
      } else {
        this.$.tabs.classList.remove('fixed');
      }
    };
    window.addEventListener('scroll', this.fixedTabsScrollHandler);
    this.$.tabs.classList.remove('fixed');

    this.nameFieldFocusHandler = (e) => {
      if (this.$.name.value === "New Character") {
        this.$.name.inputElement.select();
      }
    }
    this.$.name.addEventListener("focus", this.nameFieldFocusHandler)

    if (!this.isLoaded) {
      this.isLoaded = true;
      registerSwipe(this.$.tabTarget, "right", () => {
        if (this.indexForTabs > 0) {
          const newIndex = this.indexForTabs - 1;
          this.$.tabs.tabBar.activateTab(newIndex);
        }
      });
      registerSwipe(this.$.tabTarget, "left", () => {
        if (this.indexForTabs < this.tabs.length - 1) {
          const newIndex = this.indexForTabs + 1;
          this.$.tabs.tabBar.activateTab(newIndex);
        }
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("tabChange", this.tabChangeHandler);
    this.removeEventListener("loadingChange", this.loadingHandler);
    window.removeEventListener('scroll', this.fixedTabsScrollHandler);
    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    this.$.name.removeEventListener("focus", this.nameFieldFocusHandler)
  }

  updateView(el) {
    window.requestAnimationFrame(() => {
      const scrollHeight = window.scrollY;
      jqEmpty(this.$.tabTarget);
      this.$.tabTarget.appendChild(el);
      this.$.tabs.classList.remove('fixed');
      window.scrollTo(0, scrollHeight);
    });
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

  toggleEditMode() {
    this.$.editBtn.classList.toggle('edit-mode');
    const isEditMode = this.$.editBtn.classList.contains('edit-mode');
    dispatchEditModeChange(isEditMode);
    this.$.editBtn.innerHTML = isEditMode ? 'check' : 'edit';
  }
  
  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
        }
        .head-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
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
        .char-detail-edit {
          display: flex;
          justify-content: space-between;
        }
        .char-detail {
          font-size: 20px;
          line-height: 1.5;
        }
        #editBtn {
          background: var(--mdc-theme-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 8px;
          border: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .tab-wrap {
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        @media(max-width: 420px) {
          #tabs.fixed {
            position: fixed;
            top: 56px;
            z-index: 2;
            border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          }
          #tabs.fixed + .tab-wrap {
            margin-top: 64px;
          }
          .character-builder--tabs-wrapper {
            margin: 0 -16px -90px;
          }
          .tab-wrap {
            min-height: calc(100vh - 270px);
          }
        }
      </style>

      <div class="head-wrap">
        <div class="char-change">
          <vaadin-text-field id="name" class="name" value="{{characterName}}"></vaadin-text-field>
          <dnd-character-select mini></dnd-character-select>
          <button class="mdc-icon-button material-icons" on-click="newCharacter">person_add</button>
          <button class="mdc-icon-button material-icons" on-click="removeCharacter">delete</button>
        </div>

        <div class="char-detail-edit">
          <div class="char-detail">
            <div class="class">[[classLevel]]</div>
            <div class="race-background">[[race]] - [[background]]</div>
          </div>
          <button class="mdc-icon-button material-icons" id="editBtn" on-click="toggleEditMode">edit</button>
        </div>
      </div>

      <div class="character-builder--tabs-wrapper">
        <dnd-tabs id="tabs" tabs="[[tabs]]" initial-selected-index="[[initialSelectedTab]]"></dnd-tabs>

        <div class="tab-wrap" id="tabWrap">
          <div id="tabTarget" hidden$="[[loading]]"></div>
          <dnd-spinner loading$="[[loading]]"></dnd-spinner>
        </div>
      </div>
    `;
  }
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);
