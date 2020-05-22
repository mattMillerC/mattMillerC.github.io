import {PolymerElement, html} from '@polymer/polymer';
import "@polymer/polymer/lib/elements/dom-repeat.js";
import loadModel from "../util/data.js";
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import { jqWrap, initCollapseToggles, encodeForHash, decodeForHash } from "../js/utils.js";

class DndRules extends PolymerElement {
  
  static get properties() {
    return {
      rules: {
        type: Array
      },
      selectedRule: {
        type: Object,
        value: '',
        observer: '_selectedRuleChange'
      },
      contentsOrder: {
        type: Array,
        value: () => {
          return [
            { id: "charactercreation", title: "Character Creation" },
            { id: "equipment", title: "Equipment" },
            { id: "playingthegame", title: "Playing the Game" },
            { id: "runningthegame", title: "Running the Game" },
            { id: "setting", title: "Setting" },
            { id: "unearthedarcana", title: "Unearthed Arcana" }
          ];
        }
      }
    };
  }

  static get observers() {
    return [
      '_openRuleFromHash(hash, rules)'
    ]
  }

  _selectedRuleChange() {
    if (this.selectedRule && this.selectedRule.htmlcontent) {
      this.dispatchEvent(new CustomEvent("selection-change", {
        bubbles: true,
        composed: true,
        detail: { title: this.selectedRule.name }
      }));
      this.$.rulescontent.innerHTML = this.selectedRule.htmlcontent;
      let tables = this.$.rulescontent.querySelectorAll("table");
      for (let table of tables) {
        jqWrap(table, '<div class="table-scroll-wrap">');
      }
    } else {

      this.dispatchEvent(new CustomEvent("selection-deselected", { bubbles: true, composed: true }));
    }
  }

  _openRuleFromHash() {
    if (this.rules && this.hash && this.hash.length > 1) {
      let hashName = decodeForHash(this.hash)[0];
      let selectedRule;
      for (let category of Object.values(this.rules)) {
        for (let rule of category) {
          if (rule.name === hashName) {
            selectedRule = rule;
            break;
          }
        }
        if (selectedRule) {
          break;
        }
      }
      this.set("selectedRule", selectedRule);
    } else {
      this.set("selectedRule", undefined);
    }
  }

  constructor() {
    super();
    loadModel("rules").then((data) => {
      const rulesObject = {};
      const rules = data.compendium.rules;
      for (let rule of rules) {
        if (rulesObject[rule.parentlist]) {
          rulesObject[rule.parentlist].push(rule);
        } else {
          rulesObject[rule.parentlist] = [rule];
        }
      }
      this.set('rules', rulesObject);
      initCollapseToggles(this.shadowRoot);
    });

    window.addEventListener("hashchange", () => {
      this.hash = window.location.hash;
    });
    this.hash = window.location.hash;
  }

  _getCategoryRules(id, rules) {
    return rules ? rules[id] : '';
  }

  _openRule(e) {
    let el = e.target.closest('.mdc-list-item');
    let category = el.getAttribute("category");
    let rule = el.getAttribute("rule");
    let hash = encodeForHash(this.rules[category][rule].name);
    window.location.hash = hash;
  }

  _exists(a) {
    return !!a;
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <div class="rules-wrapper" hidden$="[[_exists(selectedRule)]]">
        <template is="dom-repeat" items="[[contentsOrder]]" as="category">
          <div class="collapse collapse--left-arrow">
            <div class="collapse-toggle">
              <div class="mdc-list-item rule-title mdc-theme--on-surface">
                [[category.title]]
              </div>
            </div>
            <div class="collapse-wrapper">
              <ul class$="collapse-list rules [[category.id]]">
                <template is="dom-repeat" items="[[_getCategoryRules(category.id, rules)]]" as="rule">
                  <div
                    class="mdc-list-item mdc-theme--on-surface"
                    on-click="_openRule"
                    category$="[[category.id]]"
                    rule$="[[index]]"
                  >
                    <span class="name col-xs-12">[[rule.name]]</span>
                  </div>
                </template>
              </ul>
            </div>
          </div>
        </template>
      </div>

      <div id="rulescontent" hidden$="[[!_exists(selectedRule)]]"></div>
    `;
  }
}

customElements.define('dnd-rules', DndRules);