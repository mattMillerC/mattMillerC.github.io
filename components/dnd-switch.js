import { PolymerElement, html } from "@polymer/polymer";
import { MDCSwitch } from "@material/switch";

class DndSwitch extends PolymerElement {
  
  static get properties() {
    return {
      initialValue: {
        type: Boolean,
        value: false,
        observer: 'initValueChange'
      },
      label: {
        type: String,
        value: ''
      }
    };
  }

  initValueChange() {
    if (this.switchEl) {
      this.switchEl.checked = this.initialValue;
    }
  }

  ready() {
    super.ready(); 

    this.switchEl = new MDCSwitch(this.shadowRoot.querySelector(".mdc-switch"));

    this.switchEl.checked = this.initialValue;
  }

  connectedCallback() {
    super.connectedCallback();

    this.switchEventHandler = () => {
      this.dispatchEvent(new CustomEvent("switch-change", {
        detail: {
          checked: this.switchEl.checked
        },
        bubbles: true,
        composed: true
      }));
    };
    this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change", this.switchEventHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change", this.switchEventHandler);
  }

  static get template() {
    return html`
      <style include="material-styles">
        :host {
          display: inline-block;
        }
        :host(:hover) label {
          color: var(--lumo-body-text-color);
        }
        label {
          color: var(--lumo-secondary-text-color);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
      </style>
      
      <label for="swich">[[label]]</label>
      <div class="mdc-switch mdc-list-item__meta">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="swich" class="mdc-switch__native-control" role="switch" />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-switch", DndSwitch);