class Icon extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-icon.css">

    <span class\$="{{_iconClasses(icon, text, big, small, right, center)}}"></span>
    {{text}}
`;
  }

  static get is() {
    return 'dnd-icon';
  }

  static get properties() {
    return {
      text: {
        type: String,
      },
      icon: {
        type: String,
      },
      big: {
        type: Boolean,
        reflectToAttribute: true,
      },
      small: {
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

  _iconClasses() {
    let str = 'icon icon-' + this.icon;

    str += this.text ? ' icon-text' : '';
    str += this.big ? ' big' : '';
    str += this.small ? ' small' : '';
    str += this.right ? ' right' : '';
    str += this.center ? ' center' : '';
    str = this.icon ? str : '';

    return str;
  }
}
window.customElements.define(Icon.is, Icon);
