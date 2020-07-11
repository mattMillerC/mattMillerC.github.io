import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import { getCharacterChannel, initSelectedCharacter, getClassString, getFeatureString, addFeatureById } from '../util/charBuilder';
import { routeEventChannel, readRouteView, readRouteSelection } from '../util/routing';
import "./dnd-character-select";
import { util_capitalize } from '../js/utils.js';

class DndCharacterPopup extends PolymerElement {
  static get properties() {
    return {
      view: {
        type: String,
        value: ''
      },
      selection: {
        type: String,
        value: ''
      },
      selectedCharacter: {
        type: Object,
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      this.selectedCharacter = JSON.parse(JSON.stringify(e.detail.character));
    };

    getCharacterChannel().addEventListener("character-selected", this.characterChangeHandler);
    initSelectedCharacter();

    this.viewChangeHandler = (e) => {
      if (e && e.detail) {
        this.view = e.detail.view;
      }
    };
    routeEventChannel().addEventListener("view-change", this.viewChangeHandler);
    this.view = readRouteView();

    this.selectionChangeHandler = (e) => {
      if (e && e.detail) {
        this.selection = e.detail.selection;
      }
    };
    routeEventChannel().addEventListener("selection-change", this.selectionChangeHandler);
    this.selection = readRouteSelection();

    this.deselectionHandler = () => {
      this.selection = '';
    }
    routeEventChannel().addEventListener("selection-deselected", this.deselectionHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected", this.characterChangeHandler);
    routeEventChannel().removeEventListener("view-change", this.viewChangeHandler);
    routeEventChannel().removeEventListener("selection-change", this.selectionChangeHandler);
    routeEventChannel().removeEventListener("selection-deselected", this.deselectionHandler);
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

  _viewString(view) {
    switch (view) {
      case "classes":
        return "Class";
      default:
        return util_capitalize(view.substring(0, view.length - 1));
    }
  }

  _exists(a) {
    return !!a;
  }

  _equal(a, b) {
    return a === b;
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
          justify-content: space-between;
          align-items: center;
          height: 100%;
          margin: 0 32px;
        }
        .name {
          display: flex;
          align-items: center;
        }
        .name .mdc-icon-button {
          margin-right: 16px;
        }
        .feature-button {
          display: flex;
          align-items: center;
        }
        .add-character-option {
          margin-left: 24px;
        }
        [hidden] {
          display: none !important;
        }
      </style>
      <div class="wrapper">
        <div class="name">
          <a class="mdc-icon-button material-icons" href="#/character-builder">launch</a>
          <dnd-character-select></dnd-character-select>
        </div>
        <div class="feature-button">
          <div class="class" hidden$="[[!_equal(view, 'classes')]]">[[classString(selectedCharacter)]]</div>
          <div class="feature" hidden$="[[_equal(view, 'classes')]]">[[featureString(view, selectedCharacter)]]</div>
          <button class="mdc-button add-character-option" on-click="addFeatureToCharacter" hidden$="[[!_exists(selection)]]">
            <div class="mdc-button__ripple"></div>
            <i class="material-icons mdc-button__icon" aria-hidden="true">person_add</i>
            <span class="mdc-button__label">Add [[_viewString(view)]]</span>
          </button>
        </div>
      </div>
    `;
  }
  
}
customElements.define('dnd-character-popup', DndCharacterPopup);