import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import "./dnd-spinner.js";
import {initCollapseToggles} from '../js/utils.js';

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
        reflectToAttribute: true,
        value: false
      },
      _renderSelection: {
        type: Function
      }
    };
  }

  static get observers() {
    return ["__renderSelection(_renderSelection, selectedItem)"];
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.closeBtn.addEventListener("click", e => {
      this.dispatchEvent(new CustomEvent("selection-deselected", { bubbles: true, composed: true }));
    });
  }

  __renderSelection() {
    if (this._renderSelection && this.selectedItem) {
      this._renderSelection(this.selectedItem, this.shadowRoot);
      initCollapseToggles(this.shadowRoot);
      this.loading = false;
    }
    if (!this._renderSelection && this.selectedItem) {
      this.loading = true;
    }
  }

  _modelChange() {
    if (this.modelId) {
      this.set("_renderSelection", undefined);

      import(/* webpackMode: "eager" */ `../js/${this.modelId}.js`)
        .then(module => {
          if (typeof module.renderSelection === "function") {
            this._renderSelection = module.renderSelection;
          } else {
            console.error("Model module is missing the renderSelection export.");
          }
        })
        .catch(e => {
          console.error("Model module failed to load.", e);
        });
    }
  }

  _exists(a) {
    return !!a;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-spinner loading$="[[loading]]"></dnd-spinner>

      <div hidden$="[[!_exists(selectedItem)]]">
        <button class="mdc-icon-button close-item material-icons" id="closeBtn">close</button>
        <div class="selection-wrapper"></div>
      </div>
    `;
  }
}

customElements.define('dnd-selected-item', DndSelectedItem);