import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import "./dnd-spinner.js";
import {initCollapseToggles} from '../js/utils.js';
import { clearRouteSelection } from '../util/routing.js';

class DndSelectedItem extends PolymerElement {
  static get properties() {
    return {
      modelId: {
        type: String,
        observer: "_modelChange"
      },
      selectedItem: {
        type: Object
      },
      loading: {
        type: Boolean,
        value: false,
        observer: "_loadingChange"
      },
      _modelsRenderSelection: {
        type: Function
      }
    };
  }

  static get observers() {
    return ["__renderSelection(_modelsRenderSelection, selectedItem)"];
  }
  
  _loadingChange() {
    this.dispatchEvent(new CustomEvent("loading-render", {
      bubbles: true,
      composed: true,
      detail: {
        loading: this.loading
      }
    }));
  }

  __renderSelection() {
    if (this._modelsRenderSelection && this.selectedItem) {
      this._modelsRenderSelection(this.selectedItem, this.shadowRoot);
      initCollapseToggles(this.shadowRoot);
    }
  }

  _modelChange() {
    if (this.modelId) {
      this.loading = true;
      this.set("_modelsRenderSelection", undefined);

      // Dynamically load the model page's renderSelection JS
      import(/* webpackMode: "eager" */ `../js/${this.modelId}.js`)
        .then(module => {
          if (typeof module.renderSelection === "function") {
            this._modelsRenderSelection = module.renderSelection;
            this.loading = false;
          } else {
            console.error("Model module is missing the renderSelection export.");
          }
        })
        .catch(e => {
          console.error("Model module failed to load.", e);
        });
    }
  }

  _exists(thing) {
    return !!thing;
  }

  _mainClass() {
    return this.selectedItem ? "main item-opened" : "main";
  }

  clearSelection() {
    clearRouteSelection(true);
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <div class$="[[_mainClass(selectedItem)]]">
        <button class="mdc-icon-button close-item material-icons" on-click="clearSelection">close</button>
        <div class="selection-wrapper"></div>
      </div>
    `;
  }
}

customElements.define('dnd-selected-item', DndSelectedItem);