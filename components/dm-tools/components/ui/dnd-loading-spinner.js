class Spinner extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      .spinner-wrapper {
        width: 100%;
        height: 100%;
      }
      .spinner {
        width: 20px;
        height: 20px;

        position: relative;
      }
      .double-bounce1,
      .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: sk-bounce 2s infinite ease-in-out;
        animation: sk-bounce 2s infinite ease-in-out;
      }
      .double-bounce2 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }
      @-webkit-keyframes sk-bounce {
        0%,
        100% {
          -webkit-transform: scale(0);
        }
        50% {
          -webkit-transform: scale(1);
        }
      }
      @keyframes sk-bounce {
        0%,
        100% {
          transform: scale(0);
          -webkit-transform: scale(0);
        }
        50% {
          transform: scale(1);
          -webkit-transform: scale(1);
        }
      }
      :host {
        display: block;
      }
    </style>

    <div hidden\$="[[!_isPresent(on)]]" class="spinner-wrapper">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-loading-spinner';
  }

  static get properties() {
    return {
      on: {
        type: Boolean,
      },
    };
  }

  _isPresent() {
    return !!this.on;
  }
}
window.customElements.define(Spinner.is, Spinner);
