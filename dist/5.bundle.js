(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{108:function(e,t,a){"use strict";a.r(t);var c=a(7),r=a(18);class n extends c.a{static get properties(){return{}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(r.i)()),Object(r.d)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(r.d)().removeEventListener("character-selected",this.characterChangeHandler)}updateFromCharacter(e){}static get template(){return c.b`
      <style>
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>

      <div class="row">
        Background and Race
      </div>
    `}}customElements.define("dnd-character-builder-background-race",n)}}]);
//# sourceMappingURL=5.bundle.js.map