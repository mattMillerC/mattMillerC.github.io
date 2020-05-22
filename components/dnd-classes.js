import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import './dnd-svg.js';
import loadModel from '../util/data.js';
import { onLoad, onDataLoad, onHashChange, onSubChange } from "../js/classes.js";


class DndClasses extends PolymerElement {
  static get properties() {
    return {
      classes: {
        type: Object,
        observer: "_dataLoaded"
      },
      hash: {
        type: String,
        value: ''
      }
    };
  }

  static get observers() {
    return ["_updateClassFromHash(classes, hash)"]
  }

  _updateClassFromHash() {
    if (this.classes && this.hash) {
	    this.shadowRoot.querySelector(".main").classList.add("item-opened");
      if (this.hash.indexOf(',') > -1) {
        let hashParts = this.hash.split(',');
        onHashChange(this.classes, hashParts[0], this.shadowRoot);
        onSubChange(hashParts.slice(1), this.hash, this.shadowRoot);
      } else {
        onHashChange(this.classes, this.hash, this.shadowRoot);
      }
    }
    if (!this.hash) {
	    this.shadowRoot.querySelector(".main").classList.remove("item-opened");
    }
  }

  constructor() {
    super();
    loadModel("classes").then(data => {
      this.set("classes", data);
    });

    window.addEventListener("hashchange", () => {
      this.hash = window.location.hash;
    });
    this.hash = window.location.hash;
  }

  connectedCallback() {
    super.connectedCallback();
    onLoad(this.shadowRoot);
  }

  _dataLoaded() {
    onDataLoad(this.classes, this.shadowRoot)
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      <div class="main">

        <dnd-svg class="class-icon stand-alone-icon"></dnd-svg>

        <button class="mdc-icon-button close-item material-icons">close</button>
        <button class="mdc-icon-button mdc-button--raised back-to-top material-icons hidden">arrow_upward</button>

        <div class="class-list-container"></div>

        <div class="class-page--class-container">
          <div id="classtable">
            <table class="table">
              <tr id="groupHeaders" class="table-row table-row--header">
                <th colspan="3"></th>
                <!-- spacer to match the 3 default cols (level, prof, features) -->
              </tr>
              <tr id="colHeaders" class="table-row table-row--header">
                <th class="level table-cell">Level</th>
                <th class="pb table-cell">Proficiency Bonus</th>
                <th class="features table-cell">Features</th>
              </tr>
              <tr id="level1" class="table-row">
                <td class="level table-cell">1st</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level2" class="table-row">
                <td class="level table-cell">2nd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level3" class="table-row">
                <td class="level table-cell">3rd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level4" class="table-row">
                <td class="level table-cell">4th</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level5" class="table-row">
                <td class="level table-cell">5th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level6" class="table-row">
                <td class="level table-cell">6th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level7" class="table-row">
                <td class="level table-cell">7th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level8" class="table-row">
                <td class="level table-cell">8th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level9" class="table-row">
                <td class="level table-cell">9th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level10" class="table-row">
                <td class="level table-cell">10th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level11" class="table-row">
                <td class="level table-cell">11th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level12" class="table-row">
                <td class="level table-cell">12th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level13" class="table-row">
                <td class="level table-cell">13th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level14" class="table-row">
                <td class="level table-cell">14th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level15" class="table-row">
                <td class="level table-cell">15th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level16" class="table-row">
                <td class="level table-cell">16th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level17" class="table-row">
                <td class="level table-cell">17th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level18" class="table-row">
                <td class="level table-cell">18th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level19" class="table-row">
                <td class="level table-cell">19th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level20" class="table-row">
                <td class="level table-cell">20th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
            </table>
          </div>

          <div id="statsprof" class="stats">
            <div id="hp" colspan="6">
              <h5>Hit Points</h5>
              <div id="hitdice">
                <strong>Hit Dice:</strong>
                <span> </span>
              </div>
              <div id="hp1stlevel">
                <strong>Hit Points at 1st Level:</strong>
                <span> </span>
              </div>
              <div id="hphigherlevels">
                <strong>Hit Points at Higher Levels:</strong>
                <span> </span>
              </div>
            </div>
            <div id="prof" colspan="6">
              <h5>Proficiencies</h5>
              <span
                >You are proficient with the following items, in addition to any proficiencies provided by your race or
                background.</span
              >
              <div id="armor">
                <strong>Armor:</strong>
                <span> </span>
              </div>
              <div id="weapons">
                <strong>Weapons:</strong>
                <span> </span>
              </div>
              <div id="tools">
                <strong>Tools:</strong>
                <span> </span>
              </div>
              <div id="saves">
                <strong>Saving Throws:</strong>
                <span> </span>
              </div>
              <div id="skills">
                <strong>Skills:</strong>
                <span> </span>
              </div>
              <div id="equipment" colspan="6">
                <h5>Starting Equipment</h5>
                <div></div>
              </div>
            </div>
          </div>

          <div id="subclassHeight"></div>
          <div id="subclasses"></div>
          <div id="stats" class="stats">
            <!-- populate with JS -->
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-classes', DndClasses);