import {PolymerElement, html} from '@polymer/polymer';
import {MDCTabBar} from '@material/tab-bar';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';

class DndTabs extends PolymerElement {
  static get properties() {
    return {
      tabs: {
        type: Array,
        observer: 'tabsChanged'
      },
      initialSelectedIndex: {
        type: Number,
        value: 0
      }
    }
  }

  tabsChanged() {
    if (this.tabs.length) {
      // Allow tabs to be rendered
      setTimeout(() => {
        this.tabBar = new MDCTabBar(this.$.tabs);
        this.$.tabs.addEventListener("MDCTabBar:activated", (e) => {
          this.handleTabChange(e.detail.index);
        });
        this.tabBar.activateTab(this.initialSelectedIndex);
      }, 0);
    }
  }

  handleTabChange(index) {
    this.dispatchEvent(new CustomEvent("tabChange"),  {
      bubbles: true,
      composed: true,
      detail: {
        index
      }
    })
  }
  
  static get template() {
    return html`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
        }
      </style>

      <div class="mdc-tab-bar" role="tablist" id="tabs">
        <div class="mdc-tab-scroller">
          <div class="mdc-tab-scroller__scroll-area">
            <div class="mdc-tab-scroller__scroll-content">
              
              <template is="dom-repeat" items="[[tabs]]">
                
                <button class="mdc-tab" role="tab" aria-selected="false" tabindex="[[index]]">
                  <span class="mdc-tab__content">
                      <span class="mdc-tab__icon material-icons" aria-hidden="true">[[item.icon]]</span>
                    <span class="mdc-tab__text-label">[[item.label]]</span>
                  </span>
                  <span class="mdc-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>

              </template>

            </div>
          </div>
        </div>
      </div>
    `;
  }
  
}
customElements.define('dnd-tabs', DndTabs);