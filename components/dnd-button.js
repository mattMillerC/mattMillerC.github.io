import { PolymerElement, html } from '@polymer/polymer';
import { MDCRipple } from '@material/ripple';
import { } from '@polymer/polymer/lib/elements/dom-if.js';

class DndButton extends PolymerElement {
  static get properties() {
    return {
      label: {
        type: String,
        value: ''
      },
      icon: {
        type: String,
        value: ''
      }
    }
  }

  connectedCallback() {
    this.button = new MDCRipple(this.$.button);
  }

  _exists(i) {
    return !!i;
  }

  static get template() {
    return html`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
        }
      </style>
      <button id="button" class="mdc-button">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">[[label]]</span>
        <template is="dom-if" if="[[_exists(icon)]]">
          <i class="material-icons mdc-button__icon" aria-hidden="true">[[icon]]</i>
        </template>
      </button>
    `;
  }

}
customElements.define('dnd-button', DndButton);