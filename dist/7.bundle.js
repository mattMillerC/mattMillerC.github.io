(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{113:function(e,t,a){"use strict";a.r(t);var s=a(7),l=a(18),n=(a(128),a(2)),i=(a(77),a(60));class r extends s.a{static get properties(){return{classOptions:{type:Array}}}connectedCallback(){super.connectedCallback()}ready(){super.ready(),setTimeout(async()=>{this.classOptions=await Object(i.a)("classes"),this.$.select.value="",this.$.select.addEventListener("change",()=>{const e=this.$.select.value;if(""!==e){const t=this.classOptions[e];Object(l.b)(t),this.$.select.value=""}}),this.$.select.renderer=e=>{if(e.firstChild)return;const t=document.createElement("vaadin-list-box");for(let e=0;e<this.classOptions.length;e++){let a=this.classOptions[e];const s=document.createElement("vaadin-item");s.textContent=a.name,s.setAttribute("value",e),t.appendChild(s)}Object(n.jqEmpty)(e),e.appendChild(t)}},0)}static get template(){return s.b`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <vaadin-select mini add id="select"></vaadin-select>
    `}}customElements.define("dnd-class-add",r);class c extends s.a{static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.i)()),Object(l.d)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(l.d)().removeEventListener("character-selected",this.characterChangeHandler)}ready(){super.ready(),setTimeout(()=>{const e=this.$.classGrid;let t;e.rowDetailsRenderer=function(e,t,a){e.firstElementChild||(e.innerHTML='<div class="details"><img><p><span></span><br><small></small></p></div>'),e.firstElementChild.querySelector("img").src=a.item.picture.large,e.firstElementChild.querySelector("span").textContent="Hi! My name is "+a.item.name.first+"!",e.firstElementChild.querySelector("small").textContent=a.item.email},e.addEventListener("grid-dragstart",(function(a){t=a.detail.draggedItems[0],e.dropMode="between"})),e.addEventListener("grid-dragend",(function(a){t=e.dropMode=null})),e.addEventListener("grid-drop",(function(a){const s=a.detail.dropTargetItem;if(t&&t!==s){const n=e.items.filter((function(e){return e!==t})),i=n.indexOf(s)+("below"===a.detail.dropLocation?1:0);n.splice(i,0,t),Object(l.m)(n)}}))},0)}async updateFromCharacter(e){this.levels=e.levels,this.classes=await Object(l.e)(e),this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,a,s){if(s){const l=s[t];if(l){const s=l.classFeatures;let n=0;if(e.length>=a+1){for(let s=0;s<a;s++)e[s].name===t&&n++;if(s[n])return s[n]}}}}_getClassLevelFeatureString(e,t,a,s){const l=this._getClassLevelFeatures(e,t,a,s);if(l)return l.map(e=>e.name).join(", ")}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index;this.levels.splice(t,1),Object(l.m)(this.levels)}static get template(){return s.b`
      <style include="material-styles">
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>

      <vaadin-grid id="classGrid" rows-draggable items=[[levels]]>
        <vaadin-grid-column width="60px" flex-grow="0">
          <template class="header">#</template>
          <template>[[_level(index)]]</template>
        </vaadin-grid-column>

        <vaadin-grid-column flex-grow="0" header="Class" path="name"></vaadin-grid-column>

        <vaadin-grid-column flex-grow="1">
          <template class="header">Features</template>
          <template>[[_getClassLevelFeatureString(levels, item.name, index, classes)]]</template>
        </vaadin-grid-column>

        <vaadin-grid-column flex-grow="0">
          <template>
            <button class="mdc-icon-button material-icons" on-click="_deleteLevel">close</button>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>

      <dnd-class-add></dnd-class-add>
    `}}customElements.define("dnd-character-builder-class",c)}}]);
//# sourceMappingURL=7.bundle.js.map