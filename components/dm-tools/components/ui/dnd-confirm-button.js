class ConfirmButton extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: block;
      }
      [hidden] {
        display: none !important;
      }
      #confirmWrap {
        display: flex;
        width: 100%;
      }

      #confirm,
      #deny {
        display: block;
        width: 50%;
      }

      #confirm {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 1px solid #aaa;
      }
      #deny {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .wrap {
        display: inline-block;
      }
    </style>

    <div class="wrap">
      <dnd-button id="button" hidden\$="[[confirmCheck]]" default="" text="[[text]]" icon="[[icon]]"></dnd-button>
      <div id="confirmWrap" hidden\$="[[!confirmCheck]]">
        <dnd-button positive="" center="" id="confirm" icon="check"></dnd-button>
        <dnd-button negative="" center="" id="deny" icon="cancel"></dnd-button>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-confirm-button';
  }

  static get properties() {
    return {
      text: {
        type: String,
      },
      icon: {
        type: String,
      },
      confirmCheck: {
        type: Boolean,
        value: false,
      },
      clickCallback: {
        type: Function,
      },
    };
  }

  ready() {
    super.ready();
  }

  connectedCallback() {
    super.connectedCallback();
    this.confirmCheck = false;

    if (this.clickCallback && typeof this.clickCallback === 'function') {
      Polymer.Gestures.addListener(this.$.button, 'tap', (e) => {
        this._openConfirm();
      });
      Polymer.Gestures.addListener(this.$.confirm, 'tap', (e) => {
        e.preventDefault();
        this.clickCallback(e);
        this._closeConfirm();
      });
      Polymer.Gestures.addListener(this.$.deny, 'tap', (e) => {
        e.preventDefault();
        this._closeConfirm();
      });
    }
  }

  _openConfirm() {
    let openWidth =
      this.$.button.offsetWidth >= 64 ? this.$.button.offsetWidth : 64;
    this.$.confirmWrap.style.width = openWidth + 'px';
    this.confirmCheck = true;
  }

  _closeConfirm() {
    this.confirmCheck = false;
  }

  _onOutsideClickHandler() {
    this.__onOutsideClick = (() => {}).bind(this);
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(ConfirmButton.is, ConfirmButton);
