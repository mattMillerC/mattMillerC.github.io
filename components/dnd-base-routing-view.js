import {PolymerElement, html} from '@polymer/polymer';
import './dnd-layout.js';
import './dnd-spinner.js';
import { jqEmpty } from '../js/utils.js';
import { initRouting, routeEventChannel, readRouteView } from '../util/routing.js';

class DndBaseRoutingView extends PolymerElement {
  static get properties() {
    return {
      viewId: {
        type: String,
        value: 'index',
        observer: 'viewIdChange'
      },
      header: {
        type: String,
        computed: '_lookupheader(viewId)'
      },
      loadingRender: {
        type: Boolean,
        value: false
      },
      loadingData: {
        type: Boolean,
        value: false
      },
      loadingView: {
        type: Boolean,
        value: true
      },
      loading: {
        type: Boolean,
        value: true,
        computed: 'anyLoading(loadingRender, loadingData, loadingView)'
      }
    }
  }

  anyLoading(loadingRender, loadingData, loadingView) {
    return loadingRender || loadingData || loadingView;
  }

  ready() {
    super.ready();

    this.routeComps = {};

    initRouting(this.shadowRoot);
    let initialView = readRouteView();
    if (initialView) {
      this.viewId = initialView;
    }
    routeEventChannel().addEventListener("view-change", e => {
      this.viewId = e.detail.view;
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.loadingRenderEventHandler = (e) => {
      if (e.detail && e.detail.loading !== undefined && e.detail.loading !== this.loadingRender) {
        this.loadingRender = e.detail.loading;
      }
    }
    this.loadingDataEventHandler = (e) => {
      if (e.detail && e.detail.loading !== undefined && e.detail.loading !== this.loadingData) {
        this.loadingData = e.detail.loading;
      }
    }

    this.addEventListener("loading-render", this.loadingRenderEventHandler);
    this.addEventListener("loading-data", this.loadingDataEventHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("loading-render", this.loadingRenderEventHandler);
    this.removeEventListener("loading-data", this.loadingDataEventHandler);
  }

  // Triggers a dynamic import of sub-component and replaces the rendered route component
  async viewIdChange() {
    this.loadingView = true;
    jqEmpty(this.$.routeTarget);

    await import(`./views/dnd-${this.viewId}-view.js`);
    this.loadingView = false;
    
    if (!this.routeComps[this.viewId]) {
      this.routeComps[this.viewId] = document.createElement(`dnd-${this.viewId}-view`);
    }
    
    this.$.routeTarget.appendChild(this.routeComps[this.viewId]);
  }

  _lookupheader(viewId) {
    switch (viewId) {
      case 'variantrules':
        return 'Variant Rules';
      case 'index':
        return undefined;
      case 'dice':
        return 'Dice Roller';
      default:
        return viewId ? viewId.charAt(0).toUpperCase() + viewId.slice(1) : '';
    }
  }
  
  static get template() {
    return html`
      <dnd-layout header="[[header]]">
        <dnd-spinner loading$="[[loading]]"></dnd-spinner>
        <div hidden$="[[loading]]" id="routeTarget"></div>
      </dnd-layout>
    `;
  }
}

customElements.define('dnd-base-routing-view', DndBaseRoutingView);