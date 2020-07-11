import {PolymerElement, html} from '@polymer/polymer';
import { addClassLevel } from '../util/charBuilder';
import { jqEmpty } from "../js/utils";
import "@vaadin/vaadin-select";
import loadModel from "../util/data";

class DndClassAdd extends PolymerElement {
  static get properties() {
    return {
      classOptions: {
        type: Array
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

  }

  ready() {
    super.ready();

    // Setting item renderer for vaadin-select
    setTimeout(async () => {
      this.classOptions = await loadModel("classes");

      this.$.select.value = ""
      this.$.select.addEventListener("change", () => {
        const val = this.$.select.value;
        if (val !== "") {
          const selectedClass = this.classOptions[val];
          addClassLevel(selectedClass);
          this.$.select.value = "";
        }
      });

      this.$.select.renderer = (root) => {
        if (root.firstChild) {
          return
        }

        const listBox = document.createElement('vaadin-list-box');

        for (let i = 0; i < this.classOptions.length; i ++) {
          let classOption = this.classOptions[i];

          const item = document.createElement('vaadin-item');
          item.textContent = classOption.name;
          item.setAttribute("value", i);

          listBox.appendChild(item);
        }

        // update the content
        jqEmpty(root);
        root.appendChild(listBox);
      };
    }, 0);
  }
  
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <vaadin-select mini add id="select"></vaadin-select>
    `;
  }
}
customElements.define('dnd-class-add', DndClassAdd);