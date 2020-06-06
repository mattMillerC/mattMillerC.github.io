import {PolymerElement, html} from '@polymer/polymer';
import {MDCTabBar} from '@material/tab-bar';
import "../styles/material-styles.js";
import "../styles/my-styles.js";


class DndCharacterBuilderView extends PolymerElement {
  static get properties() {
    return {
      
    }
  }

  connectedCallback() {
    super.connectedCallback();
    
    const tabBar = new MDCTabBar(this.shadowRoot.querySelector('.mdc-tab-bar'));
  }
  
  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <div class="mdc-tab-bar class-tabs" role="tablist">
        <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
          <span class="mdc-tab__content">
            <span class="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>
            <span class="mdc-tab__text-label">Attributes & Proficiencies</span>
          </span>
          <span class="mdc-tab-indicator mdc-tab-indicator--active">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>

        <button class="mdc-tab" role="tab">
          <span class="mdc-tab__content">
            <span class="mdc-tab__icon material-icons" aria-hidden="true"></span>
            <span class="mdc-tab__text-label">Class Levels</span>
          </span>
          <span class="mdc-tab-indicator">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>

        <button class="mdc-tab" role="tab">
          <span class="mdc-tab__content">
            <span class="mdc-tab__icon material-icons" aria-hidden="true"></span>
            <span class="mdc-tab__text-label">Background & Race</span>
          </span>
          <span class="mdc-tab-indicator">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>

        <button class="mdc-tab" role="tab">
          <span class="mdc-tab__content">
            <span class="mdc-tab__icon material-icons" aria-hidden="true"></span>
            <span class="mdc-tab__text-label">Equipment</span>
          </span>
          <span class="mdc-tab-indicator">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>
      </div>`;
  }
  
}
customElements.define('dnd-character-builder-view', DndCharacterBuilderView);