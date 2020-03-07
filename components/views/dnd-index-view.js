import {PolymerElement, html} from '@polymer/polymer';
import '../styles/material-styles.js';
import '../styles/my-styles.js';
import '../dnd-layout';

class DndIndexView extends PolymerElement {
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <dnd-layout>
        <h1 class="mdc-typography--headline2 margin-bottom_large margin-top_large typography_mono">5e Tools</h1>

        <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">Rules</h2>
        <div class="class-list-container">
          <a class="class-grid-item" href="rules.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">library_books</i>
            <span class="class-grid-item--text">Rules</span>
          </a>
          <a class="class-grid-item" href="variantrules.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">description</i>
            <span class="class-grid-item--text">Variant Rules</span>
          </a>
        </div>

        <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">Player Options</h2>
        <div class="class-list-container">
          <a class="class-grid-item" href="classes.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">class</i>
            <span class="class-grid-item--text">Classes</span>
          </a>
          <a class="class-grid-item" href="backgrounds.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">public</i>
            <span class="class-grid-item--text">Backgrounds</span>
          </a>
          <a class="class-grid-item" href="feats.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">fitness_center</i>
            <span class="class-grid-item--text">Feats</span>
          </a>
          <a class="class-grid-item" href="races.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">face</i>
            <span class="class-grid-item--text">Races</span>
          </a>
        </div>

        <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">References</h2>
        <div class="class-list-container">
          <a class="class-grid-item" href="spells.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">flash_on</i>
            <span class="class-grid-item--text">Spells</span>
          </a>
          <a class="class-grid-item" href="conditions.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true"
              >sentiment_very_dissatisfied</i
            >
            <span class="class-grid-item--text">Conditions</span>
          </a>
          <a class="class-grid-item" href="items.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">restaurant</i>
            <span class="class-grid-item--text">Items</span>
          </a>
          <a class="class-grid-item" href="rewards.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">toll</i>
            <span class="class-grid-item--text">Other Rewards</span>
          </a>
          <a class="class-grid-item" href="bestiary.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">warning</i>
            <span class="class-grid-item--text">Bestiary</span>
          </a>
          <a class="class-grid-item" href="psionics.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true"
              >record_voice_over</i
            >
            <span class="class-grid-item--text">Psionics</span>
          </a>
          <a class="class-grid-item" href="cults.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">group</i>
            <span class="class-grid-item--text">Cults</span>
          </a>
        </div>

        <h2 class="mdc-typography--headline5 margin-bottom_small margin-top_med">Tools</h2>
        <div class="class-list-container">
          <a class="class-grid-item" href="dice.html">
            <i class="material-icons mdc-theme--on-surface link-grid-item--image" aria-hidden="true">casino</i>
            <span class="class-grid-item--text">Dice Roller</span>
          </a>
        </div>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-index-view', DndIndexView);