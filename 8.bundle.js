(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{114:function(e,t,a){"use strict";a.r(t);var c=a(7),r=a(18);class n extends c.a{static get properties(){return{}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(r.q)()),Object(r.h)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(r.h)().removeEventListener("character-selected",this.characterChangeHandler)}updateFromCharacter(e){}static get template(){return c.b`
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
      </style>

      <h2>Spells</h2>
      <div>
      </div>
    `}}customElements.define("dnd-character-builder-spells",n)}}]);
//# sourceMappingURL=8.bundle.js.map