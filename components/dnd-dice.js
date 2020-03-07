import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import "./dnd-svg.js";
import { onLoad } from '../js/dice.js';

class DndDice extends PolymerElement {
  connectedCallback() {
    super.connectedCallback();
    onLoad(this.shadowRoot);
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>
      <dnd-svg></dnd-svg>

      <div class="dice-wrapper">
        <div class="dice-field-container">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
            <i class="material-icons mdc-text-field__icon mdc-theme--primary">casino</i>
            <input inputmode="numeric" type="tel" class="mdc-text-field__input roll-field" />
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="search-field" class="mdc-floating-label">Roll</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <span class="dice-field-label"
            >Use period (.) or comma (,) to insert a "d".<br />Use space to insert a plus (+).</span
          >
          <button class="mdc-button mdc-button--raised roll-submit">
            <span class="mdc-button__label">Roll!</span>
          </button>
          <button class="mdc-button mdc-button--raised roll-clear" style="display: none;">
            <span class="mdc-button__label">Clear</span>
          </button>

          <div class="roll-total-wrap" style="display: none;">Total: <span id="total"></span></div>
          <div id="output"></div>
        </div>

        <div class="dice-list-container">
          <div class="dice-grid-item roll" data-roll="1d4">
            <svg class="dice-grid-item--image"><use href="#d4"></use></svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d6">
            <svg class="dice-grid-item--image"><use href="#d6"></use></svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d8">
            <svg class="dice-grid-item--image"><use href="#d8"></use></svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d10">
            <svg class="dice-grid-item--image"><use href="#d10"></use></svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d12">
            <svg class="dice-grid-item--image"><use href="#d12"></use></svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d20">
            <svg class="dice-grid-item--image"><use href="#d20"></use></svg>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-dice', DndDice);