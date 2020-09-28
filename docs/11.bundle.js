(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{106:function(e,t,a){"use strict";a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return c})),a.d(t,"c",(function(){return n}));const i=document.createElement("div");let s=!1;function d(){return i}function c(e){i.dispatchEvent(new CustomEvent("editModeChange",{bubbles:!0,composed:!0,detail:{isEditMode:e}}))}function n(){return s}i.addEventListener("editModeChange",e=>{e.detail&&(s=!!e.detail.isEditMode)})},116:function(e,t,a){"use strict";var i=a(7),s=a(103);class d extends i.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""},disabled:{type:Boolean,value:!1,reflectToAttribute:!0}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),setTimeout(()=>{this.switchEl=new s.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue},10)}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}_switchClasses(e){return e?"mdc-switch mdc-list-item__meta mdc-switch--disabled":"mdc-switch mdc-list-item__meta"}static get template(){return i.b`
      <style include="material-styles">
        :host {
          display: inline-block;
        }
        :host([checked]) label.secondary {
          color: var(--mdc-theme-primary);
        }
        :host([checked]) label:not(.secondary) {
          color: var(--lumo-secondary-text-color);
        }
        label {
          color: var(--mdc-theme-primary);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
        label.secondary {
          color: var(--lumo-secondary-text-color);
          margin-right: 0;
          margin-left: 16px;
        }
      </style>
      
      <label for="swich">[[label]]</label>
      <div class$="[[_switchClasses(disabled)]]">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="swich" class="mdc-switch__native-control" role="switch" disabled$="[[disabled]]" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]</label>
    `}}customElements.define("dnd-switch",d)},137:function(e,t,a){var i={"./dnd-character-builder-attributes":[120,7],"./dnd-character-builder-attributes.js":[120,7],"./dnd-character-builder-background-race":[117,9],"./dnd-character-builder-background-race.js":[117,9],"./dnd-character-builder-class":[122,3,4,5],"./dnd-character-builder-class.js":[122,3,4,5],"./dnd-character-builder-equipment":[118,8],"./dnd-character-builder-equipment.js":[118,8],"./dnd-character-builder-spells":[121,3,6],"./dnd-character-builder-spells.js":[121,3,6]};function s(e){if(!a.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],s=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(s)}))}s.keys=function(){return Object.keys(i)},s.id=137,e.exports=s},98:function(e,t,a){"use strict";a.r(t);var i=a(7),s=(a(62),a(69),a(140));a(73),a(74);class d extends i.a{static get properties(){return{tabs:{type:Array,observer:"tabsChanged"},initialSelectedIndex:{type:Number,value:0}}}tabsChanged(){this.tabs.length&&setTimeout(()=>{this.tabBar=new s.a(this.$.tabs),this.$.tabs.addEventListener("MDCTabBar:activated",e=>{this.handleTabChange(e.detail.index)}),this.tabBar.activateTab(this.initialSelectedIndex)},0)}handleTabChange(e){this.dispatchEvent(new CustomEvent("tabChange",{bubbles:!0,composed:!0,detail:{index:e}}))}static get template(){return i.b`
      <style include="material-styles">
        .mdc-tab-bar {
          max-width: 100vw;
        }
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
    `}}customElements.define("dnd-tabs",d);a(78),a(75),a(116);var c=a(1),n=a(18),r=a(66),l=a(106);class o extends i.a{static get properties(){return{loading:{type:Boolean,value:!0},characterName:{type:String,value:""},initialSelectedTab:{type:Number,value:0},indexForTabs:{type:Number,value:0},isEditMode:{type:Boolean,value:!1}}}static get observers(){return["_setName(characterName)"]}_setName(e){e&&Object(n.Q)(e)}constructor(){super(),this.tabs=[{label:"Class Levels",icon:"class",viewId:"class"},{label:"Race & Background",icon:"face",viewId:"background-race"},{label:"Attributes & Proficiencies",icon:"favorite",viewId:"attributes"},{label:"Spells",icon:"flash_on",viewId:"spells"},{label:"Equipment",icon:"local_grocery_store",viewId:"equipment"}]}connectedCallback(){super.connectedCallback(),this.tabChangeHandler=e=>{let t=e.detail.index,i=this.tabs[t].viewId;this.indexForTabs=t,void 0!==i&&(this.loading=!0,a(137)("./dnd-character-builder-"+i).then(()=>{this.updateView(document.createElement("dnd-character-builder-"+i))}))},this.addEventListener("tabChange",this.tabChangeHandler),this.loadingHandler=()=>{setTimeout(()=>{this.loading=!1},0)},this.addEventListener("loadingChange",this.loadingHandler),this.setStateFromCharacter(Object(n.s)()),this.characterChangeHandler=e=>{this.setStateFromCharacter(e.detail.character)},Object(n.i)().addEventListener("character-selected",this.characterChangeHandler),this.fixedTabsScrollHandler=()=>{this.$.tabWrap.getBoundingClientRect().top<=104?this.$.tabs.classList.add("fixed"):this.$.tabs.classList.remove("fixed")},window.addEventListener("scroll",this.fixedTabsScrollHandler),this.$.tabs.classList.remove("fixed"),this.nameFieldFocusHandler=e=>{"New Character"===this.$.name.value&&this.$.name.inputElement.select()},this.$.name.addEventListener("focus",this.nameFieldFocusHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(l.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(l.c)(),this.isLoaded||(this.isLoaded=!0,Object(r.a)(this.$.tabTarget,"right",()=>{if(this.indexForTabs>0){const e=this.indexForTabs-1;this.$.tabs.tabBar.activateTab(e)}}),Object(r.a)(this.$.tabTarget,"left",()=>{if(this.indexForTabs<this.tabs.length-1){const e=this.indexForTabs+1;this.$.tabs.tabBar.activateTab(e)}}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("tabChange",this.tabChangeHandler),this.removeEventListener("loadingChange",this.loadingHandler),window.removeEventListener("scroll",this.fixedTabsScrollHandler),Object(n.i)().removeEventListener("character-selected",this.characterChangeHandler),this.$.name.removeEventListener("focus",this.nameFieldFocusHandler),Object(l.b)().removeEventListener("editModeChange",this.editModeHandler)}updateView(e){window.requestAnimationFrame(()=>{const t=window.scrollY;Object(c.jqEmpty)(this.$.tabTarget),this.$.tabTarget.appendChild(e),this.$.tabs.classList.remove("fixed"),window.scrollTo(0,t)})}setStateFromCharacter(e){this.characterName=e.name,this.classLevel=Object(n.n)(e),this.background=Object(n.p)("backgrounds",e,!0),this.race=Object(n.p)("races",e,!0)}newCharacter(){Object(n.a)()}removeCharacter(){Object(n.B)()}toggleEditMode(){this.$.editBtn.classList.toggle("edit-mode");const e=this.$.editBtn.classList.contains("edit-mode");Object(l.a)(e),this.$.editBtn.innerHTML=e?"check":"edit"}_editModeClass(e){return e?"edit-mode":"not-edit-mode"}static get template(){return i.b`
      <style include="material-styles"></style>
      <style>
        :host {
          display: block;
        }
        .head-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
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
        .char-detail-edit {
          display: flex;
          justify-content: space-between;
        }
        .char-detail {
          font-size: 16px;
          line-height: 1.5;
        }
        #editBtn {
          background: var(--mdc-theme-surface);
          color: var(--mdc-theme-on-surface);
          border-radius: 50%;
          border: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .tab-wrap {
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        .not-edit-mode .delete-char,
        .not-edit-mode .add-char {
          display: none;
        }
        @media(max-width: 420px) {
          #tabs.fixed {
            position: fixed;
            top: 56px;
            z-index: 2;
            border-bottom: 1px solid var(--mdc-theme-text-divider-on-background);
          }
          #tabs.fixed + .tab-wrap {
            margin-top: 64px;
          }
          .character-builder--tabs-wrapper {
            margin: 0 -16px -90px;
          }
          .tab-wrap {
            min-height: calc(100vh - 270px);
          }
        }
      </style>

      <div class$="[[_editModeClass(isEditMode)]]">
        <div class="head-wrap">
          <div class="char-change">
            <vaadin-text-field id="name" class="name" value="{{characterName}}" disabled$="[[!isEditMode]]"></vaadin-text-field>
            <dnd-character-select mini></dnd-character-select>
            <button class="mdc-icon-button material-icons add-char" on-click="newCharacter">person_add</button>
            <button class="mdc-icon-button material-icons delete-char" on-click="removeCharacter">delete</button>
          </div>

          <div class="char-detail-edit">
            <div class="char-detail">
              <div class="class">[[classLevel]]</div>
              <div class="race-background">[[race]] - [[background]]</div>
            </div>
            <button class="mdc-icon-button material-icons" id="editBtn" on-click="toggleEditMode">edit</button>
          </div>
        </div>

        <div class="character-builder--tabs-wrapper">
          <dnd-tabs id="tabs" tabs="[[tabs]]" initial-selected-index="[[initialSelectedTab]]"></dnd-tabs>

          <div class="tab-wrap" id="tabWrap">
            <div id="tabTarget" hidden$="[[loading]]"></div>
            <dnd-spinner loading$="[[loading]]"></dnd-spinner>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-view",o)}}]);
//# sourceMappingURL=11.bundle.js.map