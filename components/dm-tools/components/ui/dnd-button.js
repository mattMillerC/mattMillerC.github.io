class Button extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: inline-flex;
        padding: 3px 8px;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 1.4;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: default;
        background-image: none;
        border: 1px solid transparent;
        /*border-radius: 4px;*/
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
        -webkit-app-region: no-drag;
        cursor: pointer;
      }
      :host(:focus) {
        outline: none;
        box-shadow: none;
      }
      :host([borderless]) {
        border: none;
        box-shadow: none;
      }
      :host([mini]) {
        padding: 2px 6px;
      }
      :host([large]) {
        padding: 6px 12px;
      }
      :host([form]) {
        padding-right: 20px;
        padding-left: 20px;
      }
      :host([default]) {
        color: #333;
        border-top-color: #c2c0c2;
        border-right-color: #c2c0c2;
        border-bottom-color: #a19fa1;
        border-left-color: #c2c0c2;
        background-color: #fcfcfc;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0%, #fcfcfc),
          color-stop(100%, #f1f1f1)
        );
        background-image: -webkit-linear-gradient(
          top,
          #fcfcfc 0%,
          #f1f1f1 100%
        );
        background-image: linear-gradient(to bottom, #fcfcfc 0%, #f1f1f1 100%);
      }
      :host([default]:active) {
        background-color: #ddd;
        background-image: none;
      }
      :host([primary]),
      :host([positive]),
      :host([negative]),
      :host([warning]) {
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      }
      :host([smallicon]) {
        background-color: transparent;
        padding: 0px 10px;
        font-size: 10px;
        box-shadow: none;
        text-shadow: 2px 2px 4px rgba(150, 150, 150, 0.4);
      }
      :host([bigicon]) {
        background-color: transparent;
        padding: 6px 10px;
        font-size: 20px;
        box-shadow: none;
        text-shadow: 2px 2px 4px rgba(150, 150, 150, 0.4);
      }
      :host([primary]) {
        border-color: #388df8;
        border-bottom-color: #0866dc;
        background-color: #6eb4f7;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0%, #6eb4f7),
          color-stop(100%, #1a82fb)
        );
        background-image: -webkit-linear-gradient(
          top,
          #6eb4f7 0%,
          #1a82fb 100%
        );
        background-image: linear-gradient(to bottom, #6eb4f7 0%, #1a82fb 100%);
      }
      :host([primary]:active) {
        background-color: #3e9bf4;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0%, #3e9bf4),
          color-stop(100%, #0469de)
        );
        background-image: -webkit-linear-gradient(
          top,
          #3e9bf4 0%,
          #0469de 100%
        );
        background-image: linear-gradient(to bottom, #3e9bf4 0%, #0469de 100%);
      }
      :host([positive]) {
        background-color: #19c333;
        /*background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #5bd46d), color-stop(100%, #29a03b));
                  background-image: -webkit-linear-gradient(top, #5bd46d 0%, #29a03b 100%);
                  background-image: linear-gradient(to bottom, #5bd46d 0%, #29a03b 100%);*/
      }
      :host([positive]:active) {
        background-color: #248b34;
        /*background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #34c84a), color-stop(100%, #248b34));
                  background-image: -webkit-linear-gradient(top, #34c84a 0%, #248b34 100%);
                  background-image: linear-gradient(to bottom, #34c84a 0%, #248b34 100%);*/
      }
      :host([negative]) {
        background-color: #ff4136;
        /*background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fd918d), color-stop(100%, #fb2f29));
                  background-image: -webkit-linear-gradient(top, #fd918d 0%, #fb2f29 100%);
                  background-image: linear-gradient(to bottom, #fd918d 0%, #fb2f29 100%);*/
      }
      :host([negative]:active) {
        background-color: #fb1710;
        /*background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fc605b), color-stop(100%, #fb1710));
                  background-image: -webkit-linear-gradient(top, #fc605b 0%, #fb1710 100%);
                  background-image: linear-gradient(to bottom, #fc605b 0%, #fb1710 100%);*/
      }
      :host([warning]) {
        border-color: #fcaa0e;
        border-bottom-color: #ee9d02;
        background-color: #fece72;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0%, #fece72),
          color-stop(100%, #fcaa0e)
        );
        background-image: -webkit-linear-gradient(
          top,
          #fece72 0%,
          #fcaa0e 100%
        );
        background-image: linear-gradient(to bottom, #fece72 0%, #fcaa0e 100%);
      }
      :host([warning]:active) {
        background-color: #fdbc40;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          color-stop(0%, #fdbc40),
          color-stop(100%, #ee9d02)
        );
        background-image: -webkit-linear-gradient(
          top,
          #fdbc40 0%,
          #ee9d02 100%
        );
        background-image: linear-gradient(to bottom, #fdbc40 0%, #ee9d02 100%);
      }
      :host([disabled]) {
        background-color: #cccccc !important;
        color: white !important;
        background-image: none !important;
        border: none !important;
        cursor: initial;
      }
      :host(.icon) {
        float: left;
        width: 14px;
        height: 14px;
        margin-top: 1px;
        margin-bottom: 1px;
        color: #737475;
        font-size: 14px;
        line-height: 1;
      }
      :host(.icon-text) {
        margin-right: 5px;
      }
      [hidden] {
        display: none !important;
      }
      [shrunk] {
        visibility: hidden;
        height: 0;
      }
    </style>

    <div id="button" class="btn-wrap">
      <dnd-icon big\$="[[bigicon]]" small\$="[[smallicon]]" right\$="[[right]]" center\$="[[center]]" icon="[[icon]]" text="[[text]]"></dnd-icon>
    </div>
`;
  }

  static get is() {
    return 'dnd-button';
  }

  static get properties() {
    return {
      icon: {
        type: String,
      },
      text: {
        type: String,
        value: '',
      },
      borderless: {
        type: Boolean,
        reflectToAttribute: true,
      },
      bigicon: {
        type: Boolean,
        reflectToAttribute: true,
      },
      smallicon: {
        type: Boolean,
        reflectToAttribute: true,
      },
      right: {
        type: Boolean,
        reflectToAttribute: true,
      },
      center: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }
}
window.customElements.define(Button.is, Button);
