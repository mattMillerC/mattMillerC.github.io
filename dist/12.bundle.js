(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{127:function(e,a,t){var c={"./dnd-character-builder-attributes":[111,4],"./dnd-character-builder-attributes.js":[111,4],"./dnd-character-builder-background-race":[108,5],"./dnd-character-builder-background-race.js":[108,5],"./dnd-character-builder-class":[113,9,7],"./dnd-character-builder-class-level":[109,6],"./dnd-character-builder-class-level.js":[109,6],"./dnd-character-builder-class.js":[113,9,7],"./dnd-character-builder-equipment":[110,8],"./dnd-character-builder-equipment.js":[110,8]};function s(e){if(!t.o(c,e))return Promise.resolve().then((function(){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}));var a=c[e],s=a[0];return Promise.all(a.slice(1).map(t.e)).then((function(){return t(s)}))}s.keys=function(){return Object.keys(c)},s.id=127,e.exports=s},94:function(e,a,t){"use strict";t.r(a);var c=t(7),s=(t(59),t(68),t(131));t(72),t(76);class r extends c.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0}}}tabsChanged(){this.tabs.length&&setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",e=>{this.handleTabChange(e.detail.index)}),this.tabBar.activateTab(this.initialSelectedIndex)},0)}handleTabChange(e){this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:e}}))}static get template(){return c.b`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
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
    `}}customElements.define("dnd-tabs",r);t(75);var i=t(2),n=t(18);class d extends c.a{static get properties(){return{characterName:{type:String,value:""}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(n.o)(e)}constructor(){super(),this.tabs=[{label:"Attributes & Proficiencies",icon:"favorite",viewId:"attributes"},{label:"Class Levels",icon:"class",viewId:"class"},{label:"Background & Race",icon:"face",viewId:"background-race"},{label:"Equipment",icon:"local_grocery_store",viewId:"equipment"}]}connectedCallback(){super.connectedCallback(),this.views={},this.tabChangeHandler=e=>{let a=e.detail.index,c=this.tabs[a].viewId;void 0!==c&&(this.views[c]?this.updateView(this.views[c]):t(127)("./dnd-character-builder-"+c).then(()=>{this.views[c]=document.createElement("dnd-character-builder-"+c),this.updateView(this.views[c])}))},this.addEventListener("tabChange",this.tabChangeHandler),this.setStateFromCharacter(Object(n.i)()),this.characterChangeHandler=e=>{this.setStateFromCharacter(e.detail.character)},Object(n.d)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),Object(n.d)().removeEventListener("character-selected",this.characterChangeHandler)}updateView(e){Object(i.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e)}setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(n.g)(e),this.background=Object(n.h)("backgrounds",e,!0),this.race=Object(n.h)("races",e,!0)}newCharacter(){Object(n.a)()}removeCharacter(){Object(n.k)()}static get template(){return c.b`
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
      </style>

      <div class="head-wrap">
        <div class="char-change">
          <vaadin-text-field class="name" value="{{characterName}}"></vaadin-text-field>
          <dnd-character-select mini></dnd-character-select>
          <button class="mdc-icon-button material-icons" on-click="newCharacter">person_add</button>
          <button class="mdc-icon-button material-icons" on-click="removeCharacter">delete</button>
        </div>

        <div class="char-detail">
          <div class="class">[[classLevel]]</div>
          <div class="race-background">[[race]] - [[background]]</div>
        </div>
      </div>

      <dnd-tabs tabs="[[tabs]]" initial-selected-index="1"></dnd-tabs>

      <div id="tabTarget"></div>
    `}}customElements.define("dnd-character-builder-view",d)}}]);
//# sourceMappingURL=12.bundle.js.map