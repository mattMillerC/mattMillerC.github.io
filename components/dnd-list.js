import {PolymerElement, html} from '@polymer/polymer';
import "@polymer/polymer/lib/elements/dom-repeat.js";
import {renderTable} from "../util/renderTable.js";
import './styles/material-styles.js';
import "./styles/my-styles.js";
import * as Material from "material-components-web";

class DndList extends PolymerElement {
  static get properties() {
    return {
      columns: {
        type: Array
      },
      data: {
        type: Array,
        observer: '_dataChange'
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    Material.textField.MDCTextField.attachTo(this.shadowRoot.querySelector(".mdc-text-field"));
    Material.notchedOutline.MDCNotchedOutline.attachTo(this.shadowRoot.querySelector(".mdc-notched-outline"));
  }

  _dataChange() {
    if (this.data) {
      renderTable(this.data, this.shadowRoot, this.columns);
      this._setSelectionListeners();
    }
  }

  _setSelectionListeners() {
    const links = this.shadowRoot.querySelectorAll(".history-link");
    for (let link of links) {
      link.addEventListener("click", e => {
        const linkEl = e.target.closest('.history-link')
        const selectionEvent = new CustomEvent("selection-change", {
          bubbles: true,
          composed: true,
          detail: {
            title: linkEl.getAttribute("data-title"),
            link: linkEl.getAttribute("data-link"),
            index: linkEl.getAttribute("id")
          }
        });
        this.dispatchEvent(selectionEvent);
      });
    }
  }

  _columnHeaderCssClass(id, cssClass) {
    return `sort ${id ? id : ""} ${cssClass ? cssClass : ""}`;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <div id="listcontainer">
        <div id="filter-search-input-group" class="filter-group">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
            <i class="material-icons mdc-text-field__icon mdc-theme--primary">search</i>
            <input type="search" id="search-field" class="mdc-text-field__input search" />
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="search-field" class="mdc-floating-label">Search</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <div class="filter-group--buttons">
            <button class="mdc-button mdc-button--raised" id="reset">
              <span class="mdc-button__label">Reset</span>
            </button>
          </div>
        </div>

        <div class="table-wrap mdc-elevation--z6">
          <div class="table--scroll">
            <table class="table">
              <thead>
                <tr class="table-row table-row--header">
                  <template is="dom-repeat" items="[[columns]]">
                    <th class$="[[_columnHeaderCssClass(item.id, item.cssClass)]]" data-sort$="[[item.id]]">
                      <div class="table-cell">[[item.label]]</div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="list"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-list', DndList);