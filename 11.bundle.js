(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{130:function(e,t,a){var r={"./dnd-character-builder-attributes":[113,4],"./dnd-character-builder-attributes.js":[113,4],"./dnd-character-builder-background-race":[111,6],"./dnd-character-builder-background-race.js":[111,6],"./dnd-character-builder-class":[114,8,3],"./dnd-character-builder-class.js":[114,8,3],"./dnd-character-builder-equipment":[112,7],"./dnd-character-builder-equipment.js":[112,7]};function c(e){if(!a.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],c=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(c)}))}c.keys=function(){return Object.keys(r)},c.id=130,e.exports=c},97:function(e,t,a){"use strict";a.r(t);var r=a(7),c=(a(62),a(68),a(134));a(72),a(73);class s extends r.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0}}}tabsChanged(){this.tabs.length&&setTimeout(()=>{this.tabBar=new c.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",e=>{this.handleTabChange(e.detail.index)}),this.tabBar.activateTab(this.initialSelectedIndex)},0)}handleTabChange(e){this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:e}}))}static get template(){return r.b`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
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
    `}}customElements.define("dnd-tabs",s);a(77);var i=a(2),n=a(18);class d extends r.a{static get properties(){return{characterName:{type:String,value:""}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(n.D)(e)}constructor(){super(),this.tabs=[{label:"Class Levels",icon:"class",viewId:"class"},{label:"Attributes & Proficiencies",icon:"favorite",viewId:"attributes"},{label:"Background & Race",icon:"face",viewId:"background-race"},{label:"Equipment",icon:"local_grocery_store",viewId:"equipment"}]}connectedCallback(){super.connectedCallback(),this.views={},this.tabChangeHandler=e=>{let t=e.detail.index,r=this.tabs[t].viewId;void 0!==r&&(this.views[r]?this.updateView(this.views[r]):a(130)("./dnd-character-builder-"+r).then(()=>{this.views[r]=document.createElement("dnd-character-builder-"+r),this.updateView(this.views[r])}))},this.addEventListener("tabChange",this.tabChangeHandler),this.setStateFromCharacter(Object(n.o)()),this.characterChangeHandler=e=>{this.setStateFromCharacter(e.detail.character)},Object(n.g)().addEventListener("character-selected",this.characterChangeHandler),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),Object(n.g)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler)}updateView(e){Object(i.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e)}setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(n.j)(e),this.background=Object(n.l)("backgrounds",e,!0),this.race=Object(n.l)("races",e,!0)}newCharacter(){Object(n.a)()}removeCharacter(){Object(n.u)()}static get template(){return r.b`
      <style include="material-styles"></style>
      <style>
        .head-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
        }

        .char-change {
          display: flex;
        }
        .char-change vaadin-text-field {
          font-size: 24px;
          margin: 0 8px 12px 0;
          max-width: calc(100% - 140px);
        }
        .char-change .mdc-icon-button {
          margin-left: 8px;
        }
        .char-detail {
          font-size: 20px;
          line-height: 1.5;
          margin-left: 8px;
        }
        #tabTarget {
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
        }
      </style>

      <div class="head-wrap">
        <div class="char-change">
          <vaadin-text-field id="name" class="name" value="{{characterName}}"></vaadin-text-field>
          <dnd-character-select mini></dnd-character-select>
          <button class="mdc-icon-button material-icons" on-click="newCharacter">person_add</button>
          <button class="mdc-icon-button material-icons" on-click="removeCharacter">delete</button>
        </div>

        <div class="char-detail">
          <div class="class">[[classLevel]]</div>
          <div class="race-background">[[race]] - [[background]]</div>
        </div>
      </div>

      <dnd-tabs tabs="[[tabs]]" initial-selected-index="0"></dnd-tabs>

      <div id="tabTarget"></div>
    `}}customElements.define("dnd-character-builder-view",d)}}]);
//# sourceMappingURL=11.bundle.js.map