(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{104:function(e,t,s){"use strict";var a=s(2),i=s(0),l=s(5);function n(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,c,r,d){if(s=null==s?"section"===e.type?-1:0:s,c=null==c?null:c,r=null==r?null:r,(d=null!=d&&d)&&o(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":u(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(a.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),u(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let l=0;l<e.items.length;l++)this.recursiveEntryRender(e.items[l],t,s+1,`<li ${Object(a.isNonstandardSource)(e.items[l].source)?`class="${i.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(a){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${i(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let i=0;i<e.rows.length;++i){t.push("<tr class='table-row'>");for(let n=0;n<e.rows[i].length;++n)t.push(`<td ${l(n)}>`),a.recursiveEntryRender(e.rows[i][n],t,s+1),t.push("</td>");t.push("</tr>")}function i(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function l(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:i(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){u(e,!0)}(this);break;case"patron":!function(e){u(e,!1)}(this);break;case"abilityDc":o(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),h();break;case"abilityAttackMod":null!==c&&t.push(c),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),null!==r&&t.push(r);break;case"inline":if(e.entries)for(let a=0;a<e.entries.length;a++)this.recursiveEntryRender(e.entries[a],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(n.getEntryDice(e));break;case"link":!function(e,s){let i;if("internal"===s.href.type){if(i=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(i+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];i+=`,${Object(a.encodeForHash)(t.key)}:${Object(a.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(i=s.href.url);t.push(`<a href='${i}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>")}}else"string"==typeof e?(o(),function(c){const r=function(){let t,s,a=0,i=!1;const l=[];let n="";for(let c=0;c<e.length;++c)switch(t=e.charAt(c),s=c<e.length-1?e.charAt(c+1):null,t){case"{":"@"===s?a++>0?n+=t:(l.push(n),i=!1,n=""):n+=t;break;case"}":0==--a?(l.push(n),n=""):n+=t;break;default:n+=t}n.length>0&&l.push(n);return l}();for(let e=0;e<r.length;e++){const o=r[e];if(null!=o&&""!==o)if("@"===o.charAt(0)){const[e,r]=[(d=o).substr(0,d.indexOf(" ")),d.substr(d.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),c.recursiveEntryRender(r,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),c.recursiveEntryRender(r,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${l.a.actionToExplanation(r)}" class="explanation">${r}</span>`);break;case"@skill":t.push(`<span title="${l.a.skillToExplanation(r)}" class="explanation">${r}</span>`)}else{const[l,d,o,...h]=r.split("|"),u=`${l}${d?`${i.n}${d}`:""}`,p={type:"link",href:{type:"internal",path:"",hash:Object(a.encodeForHash)(u)},text:o||l};switch(e){case"@spell":d||(p.href.hash+=i.n+i.hb),p.href.hash="/spells/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@item":d||(p.href.hash+=i.n+i.T),p.href.hash="/items/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@condition":d||(p.href.hash+=i.n+i.hb),p.href.hash="/conditions/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@class":const e=n.RE_INLINE_CLASS.exec(r);e&&(p.href.hash=e[1].trim(),p.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),d||(p.href.hash+=i.n+i.hb),p.href.hash="/classes/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@creature":d||(p.href.hash+=i.n+i.cb),p.href.hash="/bestiary/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@filter":t.push(l);break;case"@damage":case"@dice":case"@book":t.push(l);break;case"@5etools":d.indexOf(".")>-1?p.href.hash="/"+d.substring(0,d.indexOf(".")):p.href.hash="/"+d,c.recursiveEntryRender(p,t,s)}}}else t.push(o)}var d}(this),h()):(o(),t.push(e),h());function o(){null!==c&&t.push(c)}function h(){null!==r&&t.push(r)}function u(c,r){const d=s>=2,o=r?s+1:s,h=function(){const t=[];Object(a.isNonstandardSource)(e.source)&&t.push(i.i);d&&void 0!==e.name?t.push(n.HEAD_2):t.push(-1===s?n.HEAD_NEG_1:0===s?n.HEAD_0:n.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(i.j);return t.length>0?`class="${t.join(" ")}"`:""}(),u=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${l.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${i.f}="${e.subclass.name}" ${i.g}="${e.subclass.source}" ${s}`:`${i.f}="${n.DATA_NONE}" ${i.g}="${n.DATA_NONE}" ${s}`}return t}(),p=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",b=void 0!==e.name?`<span class="stat-name">${e.name}${Object(a.isNonstandardSource)(e.source)?" (UA)":""}${d?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${c.wrapperTag} ${u} ${h}>${b}${p}`),e.entries)for(let s=0;s<e.entries.length;s++)c.recursiveEntryRender(e.entries[s],t,o,"<p>","</p>");t.push(`</${c.wrapperTag}>`)}}d&&h()}}n.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},n.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,n.HEAD_NEG_1="statsBlockSectionHead",n.HEAD_0="statsBlockHead",n.HEAD_1="statsBlockSubHead",n.HEAD_2="statsInlineHead",n.DATA_NONE="data-none",t.a=n},107:function(e,t,s){"use strict";var a=s(7),i=s(18),l=s(2),n=(s(75),s(39));class c extends a.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(this.value&&this.options){const e=this.value.map(e=>this.options.indexOf(e)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>Object(l.util_capitalizeAll)(this.options[e])).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(n.a)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item");t.name?(s.textContent=t.name,s.setAttribute("value",e)):(s.textContent=Object(l.util_capitalizeAll)(t),s.setAttribute("value",e)),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(i.t)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}static get template(){return a.b`
      <style>
        :host {
          display: inline-block;
        }
        [slot="prefix"] {
          width: calc(100% - 46px);
          padding: 12px;
          line-height: 1.4;
        }
        vaadin-select {
          width: 100%;
        }
      </style>
      <vaadin-select test$="[[test]]" theme="dark" add id="select" label="[[label]]" placeholder="[[placeholder]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          [[multiValue]]
        </div>
      </vaadin-select>
    `}}customElements.define("dnd-select-add",c)},115:function(e,t,s){"use strict";s.r(t);var a=s(7),i=s(27),l=s(18),n=(s(131),s(107),s(102));class c extends a.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},label:{type:String,value:""}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue)}ready(){super.ready(),this.switchEl=new n.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}static get template(){return a.b`
      <style include="material-styles">
        :host {
          display: inline-block;
        }
        :host(:hover) label {
          color: var(--lumo-body-text-color);
        }
        label {
          color: var(--lumo-secondary-text-color);
          font-weight: 500;
          font-size: var(--lumo-font-size-s);
          margin-right: 16px;
          transition: color 0.2s;
        }
      </style>
      
      <label for="swich">[[label]]</label>
      <div class="mdc-switch mdc-list-item__meta">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="swich" class="mdc-switch__native-control" role="switch" />
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-switch",c);class r extends a.a{static get properties(){return{levelIndex:{type:Number},checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbility1:{type:String,value:""},selectedAbility2:{type:String,value:""},featHasAttributeChoice:{type:Boolean,value:!1},featAttributeSelection:{type:String,value:""},featAttributeOptions:{type:Array,value:[]}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._genASICallback()()},this.addEventListener("switch-change",this.switchChangeHandler),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.p)()),Object(l.g)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(l.g)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){const{asi:t,index:s}=await Object(l.d)(this.levelIndex,e);if(this.featHasAttributeChoice=!1,t){if(this.selectedFeat=t.feat,this.selectedAbility1=t.ability1,this.selectedAbility2=t.ability2,this.checked=t.isFeat,t.isFeat&&t.feat&&t.feat.name&&t.feat.source){const s=`${t.feat.name}_${t.feat.source}`,a=await Object(l.l)(s);a.ability&&a.ability.length&&a.ability[0].choose&&(this.featHasAttributeChoice=!0,this.featAttributeOptions=a.ability[0].choose.from.map(e=>e.toUpperCase()),this.featAttributeSelection=e.featAttributeSelections&&e.featAttributeSelections[s]?e.featAttributeSelections[s]:"")}}else this.selectedFeat={name:"",source:""},this.selectedAbility1="",this.selectedAbility2="",this.checked=!1;this.asiIndex=s}_genASICallback(e){return t=>{Object(l.x)({feat:"feat"===e?{name:t.name,source:t.source}:this.selectedFeat,ability1:"ability1"===e?t:this.selectedAbility1,ability2:"ability2"===e?t:this.selectedAbility2,isFeat:this.checked},this.asiIndex)}}_genFeatAbilityCallback(){return e=>{if(this.selectedFeat&&this.selectedFeat.name&&this.selectedFeat.source){const t=`${this.selectedFeat.name}_${this.selectedFeat.source}`;Object(l.B)(t,e)}}}static get template(){return a.b`
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }
        [hidden] {
          display: none !important;
        }
        .abilities {
          display: flex;
          flex-wrap: wrap;
        }
        .abilities dnd-select-add {
          width: calc(50% - 8px);
        }
        dnd-select-add + dnd-select-add {
          margin-left: 16px;
        }
        dnd-select-add {
          display: block;
        }
      </style>

      <dnd-switch initial-value=[[checked]] label="Use Feat"></dnd-switch>
      <div class="abilities" hidden$=[[checked]]>
        <dnd-select-add add-callback="[[_genASICallback('ability1')]]" value="[[selectedAbility1]]" options="[[attributeOptions]]" placeholder="<ASI>"></dnd-select-add>
        <dnd-select-add add-callback="[[_genASICallback('ability2')]]" value="[[selectedAbility2]]" options="[[attributeOptions]]" placeholder="<ASI>"></dnd-select-add>
      </div>
      <div hidden$=[[!checked]]>
        <dnd-select-add add-callback="[[_genASICallback('feat')]]" model="feats" value="[[selectedFeat.name]]" placeholder="<Choose Feat>"></dnd-select-add>
      </div>
      <div hidden$=[[!featHasAttributeChoice]]>
        <dnd-select-add test add-callback="[[_genFeatAbilityCallback()]]" value="[[featAttributeSelection]]" options="[[featAttributeOptions]]" placeholder="<Choose Attribute>"></dnd-select-add>
      </div>
    `}}customElements.define("dnd-asi-select",r);var d=s(2),o=s(104);class h extends(Object(i.a)(a.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.p)()),Object(l.g)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(l.g)().removeEventListener("character-selected",this.characterChangeHandler)}ready(){super.ready();const e=new o.a;setTimeout(()=>{const t=this.$.classGrid;let s;t.rowDetailsRenderer=((t,s,a)=>{t.firstElementChild||(t.innerHTML='<div class="details" id="stats"></div>');let i=[],l=this._getClassLevelFeatures(this.levels,a.index,this.classes);for(let t of l)e.recursiveEntryRender(t,i,0,void 0,!0);const n=t.querySelector(".details");Object(d.jqEmpty)(n),n.innerHTML=i.join("")}).bind(this),t.addEventListener("grid-dragstart",(function(e){s=e.detail.draggedItems[0],t.dropMode="between"})),t.addEventListener("grid-dragend",(function(e){s=t.dropMode=null})),t.addEventListener("grid-drop",(function(e){const a=e.detail.dropTargetItem;if(s&&s!==a){const i=t.items.filter((function(e){return e!==s})),n=i.indexOf(a)+("below"===e.detail.dropLocation?1:0);i.splice(n,0,s),Object(l.z)(i)}}))},0)}async updateFromCharacter(e){this.character=e,this.levels=e.levels,this.classes=await Object(l.h)(e),this.subclasses=JSON.parse(JSON.stringify(e.subclasses)),this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,s){if(s&&e[t]){const a=e[t].name,i=s[a];if(i){const s=i.classFeatures;let l=0;if(e.length>=t+1){for(let s=0;s<t;s++)e[s].name===a&&l++;if(s[l])return s[l]}}}}_getClassLevelFeatureString(e,t,s){const a=this._getClassLevelFeatures(e,t,s);if(a)return a.map(e=>e.name).join(", ")}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index;this.levels.splice(t,1),Object(l.z)(this.levels)}_expandDetails(e){let t=e.model.__data.item,s=this.$.classGrid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.classGrid.detailsOpenedItems)this.$.classGrid.closeItemDetails(e);s?this.$.classGrid.closeItemDetails(t):this.$.classGrid.openItemDetails(t)}_findChoices(e,t,s,a){if(a&&t&&e&&e.length&&s<e.length){let i=a[t];if(i){let n=[],c=Object(l.r)(i);if(void 0!==c){let a=0;for(let i=0;i<=s;i++){e[i].name===t&&a++}a===c&&n.push("subclass")}let r=this._getClassLevelFeatures(e,s,a);return r&&r.length&&r.find(e=>"Ability Score Improvement"===e.name)&&n.push("asi"),n}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e){return t=>{Object(l.u)(void 0,e.name,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}static get template(){return a.b`
      <style include="material-styles my-styles">
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #stats {
          margin-top: 0px;
        }
        .details {
          padding: 0 24px;
        }
        .remove-btn {
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
        }
        .subclass-add {
          display: block;
        }
        .features-col {
          width: 100%;
          height: 48px;
          white-space: break-spaces;
          display: flex;
          align-items: center;
        }
      </style>

      <vaadin-grid id="classGrid" rows-draggable items=[[levels]]>
        <vaadin-grid-column width="42px" flex-grow="0">
          <template class="header">#</template>
          <template><div on-click="_expandDetails">[[_level(index)]]</div></template>
        </vaadin-grid-column>

        <vaadin-grid-column flex-grow="0" header="Class" path="name"></vaadin-grid-column>

        <template is="dom-if" if="[[!_isMobile()]]">
          <vaadin-grid-column flex-grow="4">
            <template class="header">Features</template>
            <template><div class="features-col"><span>[[_getClassLevelFeatureString(levels, index, classes)]]</span></div></template>
          </vaadin-grid-column>
        </template>

        <vaadin-grid-column width="140px">
          <template>
            <template is="dom-repeat" items="[[_findChoices(levels, item.name, index, classes)]]" as="choice">
              <template is="dom-if" if="[[_equal(choice, 'subclass')]]">
                <dnd-select-add class="subclass-add" label="Subclass" add-callback="[[_genSubclassCallback(item)]]" options="[[_genSubclassOptions(item)]]" value="[[_getSubclassSelection(item, subclasses, character)]]" placeholder="<Choose Subclass>"></dnd-select-add>
              </template>
              <template is="dom-if" if="[[_equal(choice, 'asi')]]">
                <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]"></dnd-asi-select>
              </template>
            </template>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column width="56px" flex-grow="0">
          <template>
            <button class="mdc-icon-button material-icons remove-btn" on-click="_deleteLevel">close</button>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>

      <dnd-select-add model="classes" placeholder="Add a Level"></dnd-select-add>
    `}}customElements.define("dnd-character-builder-class",h)}}]);
//# sourceMappingURL=3.bundle.js.map