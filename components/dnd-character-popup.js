import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import { getCharacterChannel, initCharacter, getClassString, getFeatureString, selectCharacterFromIndex, findCharacterIndex, addFeatureById } from '../util/charBuilder';
import { routeEventChannel, readRouteView } from '../util/routing';
import "@vaadin/vaadin-select";
import { jqEmpty } from "../js/utils.js";

class DndCharacterPopup extends PolymerElement {
  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      view: {
        type: String,
        value: ''
      },
      selectedCharacter: {
        type: Object,
      },
      characterOptions: {
        type: Array
      }
    }
  }

  constructor() {
    super();

    getCharacterChannel().addEventListener("character-selected", (e) => {
      this.selectedCharacter = JSON.parse(JSON.stringify(e.detail.character));
      this.characterOptions = e.detail.characters;
    });
    initCharacter();

    routeEventChannel().addEventListener("view-change", (e) => {
      if (e && e.detail) {
        this.view = e.detail.view;
      }
    });
    this.view = readRouteView();
  }

  ready() {
    super.ready();

    this.$.select.addEventListener("change", () => {
      selectCharacterFromIndex(this.$.select.value);
    });

    this.$.select.renderer = (root, select) => {
      if (root.firstChild) {
        return;
      }
      const listBox = document.createElement('vaadin-list-box');

      for (let i = 0; i < this.characterOptions.length; i ++) {
        let char = this.characterOptions[i];
        const item = document.createElement('vaadin-item');
        item.textContent = char.name;
        item.setAttribute("value", i);
        listBox.appendChild(item);
      }

      // update the content
      jqEmpty(root);
      root.appendChild(listBox);
    };

    this.$.select.value = findCharacterIndex(this.selectedCharacter) + "";
  }

  classString(selectedCharacter) {
    return getClassString(selectedCharacter);
  }

  featureString(featureId, selectedCharacter) {
    return getFeatureString(featureId, selectedCharacter);
  }
  
  addFeatureToCharacter() {
    addFeatureById();
  }
  
  static get template() {
    return html`
      <style include="material-styles"></style>
      <style>
        :host {
          position: fixed;
          width: 100%;
          height: 60px;
          bottom: 0;
          background: white;
          right: 0;
          border-top: 1px solid lightgray;
          z-index: 2;
        }
        
        @media(min-width: 599px) {
          :host {

          }
        }
        @media(min-width: 1321px) {
          :host {
            width: calc(100% - 256px);
          }
        }
        .wrapper {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100%;
        }
      </style>
      <div class="wrapper">
        <div class="name">
          <vaadin-select id="select">
          </vaadin-select>
        </div>
        <div class="class">[[classString(selectedCharacter)]]</div>
        <div class="feature">[[featureString(view, selectedCharacter)]]</div>
        <button class="mdc-icon-button add-character-option material-icons"
          on-click="addFeatureToCharacter">person_add</button>
      </div>
    `;
  }
  
}
customElements.define('dnd-character-popup', DndCharacterPopup);