import {PolymerElement, html} from '@polymer/polymer';
import "./dnd-list.js";
import "./dnd-selected-item.js";
import loadUrl from "../util/loadUrl.js";
import { resolveHash } from "../util/renderTable.js";

class DndSelectionList extends PolymerElement {
  static get properties() {
    return {
      modelId: {
        type: String,
        observer: "_modelChange"
      },
      columns: {
        type: Array
      },
      enableHashRouting: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      _data: {
        type: Array
      },
      _selectedItem: {
        type: Object
      },
      _selectedIndex: {
        type: Number
      },
      _selectedHash: {
        type: String
      }
    };
  }

  static get observers() {
    return ["_updateSelectionFromIndex(_data, _selectedIndex)"];
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("selection-change", e => {
      if (e.detail) {
        if (e.detail.index) {
          this._selectedIndex = e.detail.index;
        }
        if (e.detail.link) {
          window.location.hash = e.detail.link;
        }
      }
    });

    this.addEventListener("selection-deselected", () => {
      this._selectedItem = undefined;
    });

    window.addEventListener("hashchange", (e) => {
      this._checkHashForSelection();
    }, false);
  }

  _updateSelectionFromIndex() {
    if (Array.isArray(this._data) && this._selectedIndex && this._data[this._selectedIndex] !== undefined) {
      const _selectedIndex = this._selectedIndex;
      this._selectedIndex = undefined;
      this.set("_selectedItem", this._data[_selectedIndex]);
    }
  }

  _checkHashForSelection() {
    if (this.enableHashRouting && Array.isArray(this._data)) {
      if (window.location.hash && window.location.hash.length > 1) {
        const itemFromHash = resolveHash(this._data, window.location.hash);
        if (itemFromHash) {
          this.set("_selectedItem", itemFromHash);
          this.dispatchEvent(
            new CustomEvent("selection-change", {
              bubbles: true,
              composed: true,
              detail: { title: itemFromHash.name }
            })
          );
        }
      } else {
        this.dispatchEvent(
          new CustomEvent("selection-deselected", {
            bubbles: true,
            composed: true
          })
        );
      }
    }
  }

  _modelChange() {
    if (this.modelId) {
      this.set("_data", undefined);
      loadUrl(`/data/${this.modelId}.json`)
        .then(result => {
          while (!Array.isArray(result) && typeof result === "object") {
            result = result[Object.keys(result)[0]];
          }
          this.set("_data", result);
          this._checkHashForSelection();
        })
        .catch(e => {
          console.error("Model requested for list did not return.", e);
        });
    }
  }

  static get template() {
    return html`
      <dnd-selected-item model-id="[[modelId]]" selected-item="[[_selectedItem]]"></dnd-selected-item>
      <dnd-list data="[[_data]]" columns="[[columns]]"></dnd-list>
    `;
  }
}

customElements.define('dnd-selection-list', DndSelectionList);