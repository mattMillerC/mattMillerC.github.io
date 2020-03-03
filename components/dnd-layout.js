import {PolymerElement, html} from '@polymer/polymer';
import "./styles/material-styles.js";
import "./styles/my-styles.js";
import * as Material from "material-components-web";
import registerSwipe from '../util/swipe.js';
import setDarkmode from "../util/darkmode.js";

class DndLayout extends PolymerElement {
  static get properties() {
    return {
      title: {
        type: String
      },
      selectedTitle: {
        type: String,
        value: ""
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._initDarkmode();
    this._initSwipe();
    this._initNavDrawer();
    this._initSelectionEvents();
    this._initActiveLink();
  }

  __computeTitle(title, selectedTitle) {
    return selectedTitle ? selectedTitle : title;
  }

  _initDarkmode() {
    // Darkmode Switch
    let storedDarkMode = window.localStorage.getItem("darkMode");

    if (storedDarkMode === "true") {
      this.darkModeSwitchChecked = true;
    } else {
      this.darkModeSwitchChecked = false;
    }
    setDarkmode(this.darkModeSwitchChecked);
    const darkModeSwitch = Material.switchControl.MDCSwitch.attachTo(this.shadowRoot.querySelector(".mdc-switch"));
    darkModeSwitch.checked = this.darkModeSwitchChecked;

    if (this.darkModeSwitchChecked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    this.shadowRoot.querySelector(".darkmode-label").addEventListener("click", () => {
      darkModeSwitch.checked = !darkModeSwitch.checked;
    });

    this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change", () => {
      window.localStorage.setItem("darkMode", darkModeSwitch.checked);
      if (darkModeSwitch.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      setDarkmode(darkModeSwitch.checked);
    });
  }

  _initSwipe() {
    registerSwipe(document.body, "left", () => {
      if (drawer.open) {
        drawer.open = false;
      }
    });
    registerSwipe(document.body, "right", () => {
      if (!drawer.open) {
        drawer.open = true;
      }
    });
  }

  _initNavDrawer() {
    // Nav Button
    const button = Material.ripple.MDCRipple.attachTo(
      this.shadowRoot.querySelector(".mdc-top-app-bar__navigation-icon")
    );
    const drawer = Material.drawer.MDCDrawer.attachTo(this.shadowRoot.querySelector(".mdc-drawer"));
    window.drawer = drawer;
    this.shadowRoot.querySelector(".mdc-top-app-bar__navigation-icon").addEventListener("click", e => {
      drawer.open = !drawer.open;
    });
    const navListItems = this.shadowRoot.querySelectorAll(".rules .mdc-list-item, .classes .mdc-list-item");
    for (let navListItem of navListItems) {
      navListItem.addEventListener("click", () => {
        drawer.open = false;
      });
    }

    // List Items
    const listItems = this.shadowRoot.querySelectorAll(".mdc-drawer .mdc-list-item");
    for (let listItem of listItems) {
      Material.ripple.MDCRipple.attachTo(listItem);
    }

    const collapseToggles = this.shadowRoot.querySelectorAll(".collapse .collapse-toggle");
    for (let collapseToggle of collapseToggles) {
      collapseToggle.addEventListener("click", e => {
        let collapse = $(e.target).closest(".collapse"),
          list = collapse.find(".collapse-list");

        if (collapse.hasClass("open")) {
          list.css("margin-top", "-" + list.height() + "px");
        } else {
          list.css("margin-top", "0px");
        }
        collapse.toggleClass("open");
      });
    }
  }

  _initSelectionEvents() {
    this.addEventListener("selection-change", e => {
      this.selectedTitle = e.detail.title;
    });

    this.addEventListener("selection-deselected", () => {
      this.selectedTitle = "";
    });
  }

  _initActiveLink() {
    const links = this.shadowRoot.querySelectorAll("a.mdc-list-item");
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf("/") + 1);

    for (let link of links) {
      if (link.getAttribute("href") === fileName) {
        link.classList.add("list-item--activated");
      }
    }
  }

  _exists(a) {
    return !!a;
  }

  _centerBreadcrumbCssClass(selectedTitle) {
    return selectedTitle ? "breadcrumbs__crumb" : "breadcrumbs__crumb breadcrumbs__no_caret";
  }

  _resetHash() {
    window.location.hash = '';
    this.selectedTitle = '';
    const selectionListChild = this.querySelector("dnd-selection-list");
    if (selectionListChild) {
      selectionListChild.dispatchEvent(new CustomEvent("selection-deselected", { bubble: true, composed: true }));
    }
  }

  static get template() {
    return html`
      <style include="material-styles my-styles"></style>

      <header class="mdc-top-app-bar mdc-top-app-bar--fixed mdc-theme--primary-bg mdc-theme--on-primary">
        <div class="mdc-top-app-bar__row">
          <div class="breadcrumbs mdc-theme--on-primary">
            <div class="container breadcrumbs__list">
              <div class="breadcrumbs__crumb"><a href="./index.html">Player Options</a></div>
              <div class$="[[_centerBreadcrumbCssClass(selectedTitle)]]"><a on-click="_resetHash">[[title]]</a></div>
              <div class="breadcrumbs__crumb breadcrumbs__last" hidden$="[[!_exists(selectedTitle)]]">
                [[selectedTitle]]
              </div>
            </div>
          </div>
          <div class="nav-button">
            <button
              class="material-icons mdc-top-app-bar__navigation-icon mdc-theme--on-primary hidden-desktop-up margin-left_small"
            >
              menu
            </button>
            <a href="index.html"><div class="logo logo-white light-only"></div></a>
            <a href="index.html"><div class="logo dark-only"></div></a>
            <a href="index.html"
              ><span class="mdc-top-app-bar__title mdc-theme--on-primary typography_mono hidden-tablet-down"
                >5e Tools</span
              ></a
            >
          </div>
        </div>
      </header>

      <aside class="mdc-drawer mdc-drawer--modal mdc-theme--surface">
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            <div class="mdc-drawer__header hidden-desktop-up">
              <a href="index.html"
                ><h3 class="mdc-drawer__title mdc-theme--on-surface typography_mono">
                  <div class="logo margin-right_small"></div>
                  5e Tools
                </h3>
                <h6
                  class="mdc-drawer__subtitle mdc-theme--text-secondary-on-background margin-top_small typography_mono"
                >
                  A D&amp;D Players Companion
                </h6></a
              >
            </div>

            <a class="mdc-list-item mdc-theme--on-surface" href="#">
              <label class="darkmode-label" for="dark-mode-switch">Dark Mode</label>
              <div class="mdc-switch mdc-list-item__meta">
                <div class="mdc-switch__track"></div>
                <div class="mdc-switch__thumb-underlay">
                  <div class="mdc-switch__thumb">
                    <input type="checkbox" id="dark-mode-switch" class="mdc-switch__native-control" role="switch" />
                  </div>
                </div>
              </div>
            </a>

            <hr class="mdc-list-divider" />
            <a class="mdc-list-item mdc-theme--on-surface" href="rules.html" tabindex="0">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"
                >library_books</i
              >
              <span class="mdc-list-item__text">Rules</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="variantrules.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">description</i>

              <span class="mdc-list-item__text">Variant Rules</span>
            </a>

            <hr class="mdc-list-divider" />
            <h6 class="mdc-list-group__subheader mdc-theme--on-surface">Player Options</h6>
            <a class="mdc-list-item mdc-theme--on-surface" href="classes.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">class</i>
              <span class="mdc-list-item__text">Classes</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="backgrounds.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">public</i>
              <span class="mdc-list-item__text">Backgrounds</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="feats.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"
                >fitness_center</i
              >
              <span class="mdc-list-item__text">Feats</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="races.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">face</i>
              <span class="mdc-list-item__text">Races</span>
            </a>

            <hr class="mdc-list-divider" />
            <h6 class="mdc-list-group__subheader mdc-theme--on-surface">References</h6>
            <a class="mdc-list-item mdc-theme--on-surface" href="spells.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">flash_on</i>
              <span class="mdc-list-item__text">Spells</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="conditions.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"
                >sentiment_very_dissatisfied</i
              >
              <span class="mdc-list-item__text">Conditions</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="items.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">restaurant</i>
              <span class="mdc-list-item__text">Items</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="rewards.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">toll</i>
              <span class="mdc-list-item__text">Other Rewards</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="bestiary.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">warning</i>
              <span class="mdc-list-item__text">Bestiary</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="psionics.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true"
                >record_voice_over</i
              >
              <span class="mdc-list-item__text">Psionics</span>
            </a>
            <a class="mdc-list-item mdc-theme--on-surface" href="cults.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">group</i>
              <span class="mdc-list-item__text">Cults</span>
            </a>

            <hr class="mdc-list-divider" />
            <h6 class="mdc-list-group__subheader mdc-theme--on-surface">Tools</h6>
            <a class="mdc-list-item mdc-theme--on-surface" href="dice.html">
              <i class="material-icons mdc-list-item__graphic mdc-theme--on-surface" aria-hidden="true">casino</i>
              <span class="mdc-list-item__text">Dice Roller</span>
            </a>
            <span class="version mdc-typography--caption">v1.2.1</span>
          </nav>
        </div>
      </aside>

      <div class="mdc-drawer-scrim"></div>

      <div
        class="main mdc-top-app-bar--fixed-adjust mdc-typography--body1 mdc-theme--background mdc-theme--text-primary-on-background"
      >
        <div class="container">
          <h1 class="page-title mdc-typography--headline2">[[__computeTitle(title, selectedTitle)]]</h1>

          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("dnd-layout", DndLayout);