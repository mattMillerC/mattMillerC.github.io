import {PolymerElement, html} from '@polymer/polymer';
import './dnd-layout.js';

class DndBaseRoutingView extends PolymerElement {
  static get properties() {
    return {
      viewId: {
        type: String,
        value: 'index',
        observer: 'viewIdChange'
      },
      viewHeader: {
        type: String,
        computed: '_lookupViewHeader(viewId)'
      }
    }
  }

  constructor() {
    super();

    // Grab existing viewId on load
    if (window.location.search) {
      this.viewId = window.location.search.substring(1);
    }

    // Overrides Anchor click for links, Uses viewId to change the loaded route
    document.body.addEventListener('click', (event) => {
      let anchor = event.originalTarget.closest('a');

      if (anchor) {
      let href = anchor.getAttribute('href');

        if (href.indexOf(".html") > -1) {
          event.preventDefault();
          this.viewId = href.substring(0, href.indexOf(".html"));
          window.history.pushState({}, '', `?${this.viewId}`);
        }
      }
    });
  }

  // Triggers a dynamic import of sub-component and replaces the rendered route component
  async viewIdChange() {

    await import(`./views/dnd-${this.viewId}-view.js`);

    this.$.routeTarget.innerHTML = `<dnd-${this.viewId}-view></dnd-${this.viewId}-view>`;
  }

  _lookupViewHeader(viewId) {
    switch (viewId) {
      case 'variantrules':
        return 'Variant Rules';
      case 'index':
        return undefined;
      case 'dice':
        return 'Dice Roller';
      default:
        return viewId.charAt(0).toUpperCase() + viewId.slice(1)
    }
  }
  
  static get template() {
    return html`
      <dnd-layout header="[[viewHeader]]">
        <div id="routeTarget"></div>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-base-routing-view', DndBaseRoutingView);