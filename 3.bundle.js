(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{104:function(e,t,s){"use strict";var a=s(2),i=s(0),l=s(5);function c(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,n,r,o){if(s=null==s?"section"===e.type?-1:0:s,n=null==n?null:n,r=null==r?null:r,(o=null!=o&&o)&&d(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":u(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(a.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),u(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let l=0;l<e.items.length;l++)this.recursiveEntryRender(e.items[l],t,s+1,`<li ${Object(a.isNonstandardSource)(e.items[l].source)?`class="${i.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(a){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${i(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let i=0;i<e.rows.length;++i){t.push("<tr class='table-row'>");for(let c=0;c<e.rows[i].length;++c)t.push(`<td ${l(c)}>`),a.recursiveEntryRender(e.rows[i][c],t,s+1),t.push("</td>");t.push("</tr>")}function i(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function l(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:i(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){u(e,!0)}(this);break;case"patron":!function(e){u(e,!1)}(this);break;case"abilityDc":d(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),h();break;case"abilityAttackMod":null!==n&&t.push(n),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),null!==r&&t.push(r);break;case"inline":if(e.entries)for(let a=0;a<e.entries.length;a++)this.recursiveEntryRender(e.entries[a],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(c.getEntryDice(e));break;case"link":!function(e,s){let i;if("internal"===s.href.type){if(i=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(i+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];i+=`,${Object(a.encodeForHash)(t.key)}:${Object(a.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(i=s.href.url);t.push(`<a href='${i}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(p(e.entry))}}else"string"==typeof e?(d(),p(this),h()):(d(),t.push(e),h());function d(){null!==n&&t.push(n)}function h(){null!==r&&t.push(r)}function u(n,r){const o=s>=2,d=r?s+1:s,h=function(){const t=[];Object(a.isNonstandardSource)(e.source)&&t.push(i.i);o&&void 0!==e.name?t.push(c.HEAD_2):t.push(-1===s?c.HEAD_NEG_1:0===s?c.HEAD_0:c.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(i.j);return t.length>0?`class="${t.join(" ")}"`:""}(),u=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${l.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${i.f}="${e.subclass.name}" ${i.g}="${e.subclass.source}" ${s}`:`${i.f}="${c.DATA_NONE}" ${i.g}="${c.DATA_NONE}" ${s}`}return t}(),p=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",b=void 0!==e.name?`<span class="stat-name">${e.name}${Object(a.isNonstandardSource)(e.source)?" (UA)":""}${o?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${n.wrapperTag} ${u} ${h}>${b}${p}`),e.entries)for(let s=0;s<e.entries.length;s++)n.recursiveEntryRender(e.entries[s],t,d,"<p>","</p>");t.push(`</${n.wrapperTag}>`)}}function p(n){const r=function(){let t,s,a=0,i=!1;const l=[];let c="";for(let n=0;n<e.length;++n)switch(t=e.charAt(n),s=n<e.length-1?e.charAt(n+1):null,t){case"{":"@"===s?a++>0?c+=t:(l.push(c),i=!1,c=""):c+=t;break;case"}":0==--a?(l.push(c),c=""):c+=t;break;default:c+=t}c.length>0&&l.push(c);return l}();for(let e=0;e<r.length;e++){const d=r[e];if(null!=d&&""!==d)if("@"===d.charAt(0)){const[e,r]=[(o=d).substr(0,o.indexOf(" ")),o.substr(o.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),n.recursiveEntryRender(r,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),n.recursiveEntryRender(r,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${l.a.actionToExplanation(r)}" class="explanation">${r}</span>`);break;case"@skill":t.push(`<span title="${l.a.skillToExplanation(r)}" class="explanation">${r}</span>`)}else{const[l,o,d,...h]=r.split("|"),u=`${l}${o?`${i.n}${o}`:""}`,p={type:"link",href:{type:"internal",path:"",hash:Object(a.encodeForHash)(u)},text:d||l};switch(e){case"@spell":o||(p.href.hash+=i.n+i.hb),p.href.hash="/spells/"+p.href.hash,n.recursiveEntryRender(p,t,s);break;case"@item":o||(p.href.hash+=i.n+i.T),p.href.hash="/items/"+p.href.hash,n.recursiveEntryRender(p,t,s);break;case"@condition":o||(p.href.hash+=i.n+i.hb),p.href.hash="/conditions/"+p.href.hash,n.recursiveEntryRender(p,t,s);break;case"@class":const e=c.RE_INLINE_CLASS.exec(r);e&&(p.href.hash=e[1].trim(),p.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),o||(p.href.hash+=i.n+i.hb),p.href.hash="/classes/"+p.href.hash,n.recursiveEntryRender(p,t,s);break;case"@creature":o||(p.href.hash+=i.n+i.cb),p.href.hash="/bestiary/"+p.href.hash,n.recursiveEntryRender(p,t,s);break;case"@filter":t.push(l);break;case"@damage":case"@dice":case"@book":t.push(l);break;case"@5etools":o.indexOf(".")>-1?p.href.hash="/"+o.substring(0,o.indexOf(".")):p.href.hash="/"+o,n.recursiveEntryRender(p,t,s)}}}else t.push(d)}var o}o&&h()}}c.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},c.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,c.HEAD_NEG_1="statsBlockSectionHead",c.HEAD_0="statsBlockHead",c.HEAD_1="statsBlockSubHead",c.HEAD_2="statsInlineHead",c.DATA_NONE="data-none",t.a=c},108:function(e,t,s){"use strict";var a=s(7),i=s(18),l=s(2),c=(s(77),s(39));class n extends a.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(this.value&&this.options){const e=this.value.map(e=>this.options.indexOf(e)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>Object(l.util_capitalizeAll)(this.options[e])).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(c.a)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item");t.name?(s.textContent=t.name,s.setAttribute("value",e)):(s.textContent=Object(l.util_capitalizeAll)(t),s.setAttribute("value",e)),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(i.t)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t){if(e)return t?`${e} (${t})`:e}static get template(){return a.b`
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
        .prefix {
          white-space: normal;
          color: var(--lumo-body-text-color);
        }
      </style>
      <vaadin-select test$="[[test]]" theme="dark" add id="select" label="[[_label(label, choices)]]" placeholder="[[placeholder]]">
        <div hidden$="[[!_exists(multiValue)]]" slot="prefix">
          <span class="prefix">[[multiValue]]</span>
        </div>
      </vaadin-select>
    `}}customElements.define("dnd-select-add",n)},116:function(e,t,s){"use strict";s.r(t);var a=s(7),i=s(27),l=s(18),c=(s(133),s(108),s(103));class n extends a.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),this.switchEl=new c.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}static get template(){return a.b`
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
      <div class="mdc-switch mdc-list-item__meta">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          <div class="mdc-switch__thumb">
            <input type="checkbox" id="swich" class="mdc-switch__native-control" role="switch" />
          </div>
        </div>
      </div>
      <label class="secondary">[[secondaryLabel]]</label>
    `}}customElements.define("dnd-switch",n);var r=s(67);s(74);class o extends a.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""}}}connectedCallback(){this.button=new r.a(this.$.button)}_exists(e){return!!e}static get template(){return a.b`
      <style include="material-styles">
        .mdc-tab-scroller__scroll-area--scroll {
          overflow-x: auto;
          background-color: var(--mdc-theme-surface);
          border: 1px solid var(--mdc-theme-text-divider-on-background);
          border-bottom: none;
        }
      </style>
      <button id="button" class="mdc-button">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">[[label]]</span>
        <template is="dom-if" if="[[_exists(icon)]]">
          <i class="material-icons mdc-button__icon" aria-hidden="true">[[icon]]</i>
        </template>
      </button>
    `}}customElements.define("dnd-button",o);class d extends a.a{static get properties(){return{levelIndex:{type:Number},checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbility1:{type:String,value:""},selectedAbility2:{type:String,value:""},featHasAttributeChoice:{type:Boolean,value:!1},featAttributeSelection:{type:String,value:""},featAttributeOptions:{type:Array,value:[]}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._genASICallback()()},this.addEventListener("switch-change",this.switchChangeHandler),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.p)()),Object(l.h)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(l.h)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){const{asi:t,index:s}=await Object(l.d)(this.levelIndex,e);if(this.featHasAttributeChoice=!1,t){if(this.selectedFeat=t.feat,this.selectedAbility1=t.ability1,this.selectedAbility2=t.ability2,this.checked=t.isFeat,t.isFeat&&t.feat&&t.feat.name&&t.feat.source){const s=`${t.feat.name}_${t.feat.source}`,a=await Object(l.l)(s);a.ability&&a.ability.length&&a.ability[0].choose&&(this.featHasAttributeChoice=!0,this.featAttributeOptions=a.ability[0].choose.from.map(e=>e.toUpperCase()),this.featAttributeSelection=e.featAttributeSelections&&e.featAttributeSelections[s]?e.featAttributeSelections[s]:"")}}else this.selectedFeat={name:"",source:""},this.selectedAbility1="",this.selectedAbility2="",this.checked=!1;this.asiIndex=s}_genASICallback(e){return t=>{Object(l.x)({feat:"feat"===e?{name:t.name,source:t.source}:this.selectedFeat,ability1:"ability1"===e?t:this.selectedAbility1,ability2:"ability2"===e?t:this.selectedAbility2,isFeat:this.checked},this.asiIndex)}}_genFeatAbilityCallback(){return e=>{if(this.selectedFeat&&this.selectedFeat.name&&this.selectedFeat.source){const t=`${this.selectedFeat.name}_${this.selectedFeat.source}`;Object(l.B)(t,e)}}}static get template(){return a.b`
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

      <dnd-switch initial-value=[[checked]] label="ASI" secondary-label="Feat"></dnd-switch>
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
    `}}customElements.define("dnd-asi-select",d);var h=s(2),u=s(104);s(73);class p extends(Object(i.a)(a.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.p)()),Object(l.h)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(l.h)().removeEventListener("character-selected",this.characterChangeHandler)}ready(){super.ready();const e=new u.a;setTimeout(()=>{const t=this.$.classGrid;let s;t.rowDetailsRenderer=((t,s,a)=>{t.firstElementChild||(t.innerHTML='<div class="details" id="stats"></div>');let i=[],l=this._getClassLevelFeatures(this.levels,a.index,this.classes,this.subclasses);for(let t of l)e.recursiveEntryRender(t,i,0,void 0,!0);const c=t.querySelector(".details");Object(h.jqEmpty)(c),c.innerHTML=i.join("")}).bind(this),t.addEventListener("grid-dragstart",(function(e){s=e.detail.draggedItems[0],t.dropMode="between"})),t.addEventListener("grid-dragend",(function(e){s=t.dropMode=null})),t.addEventListener("grid-drop",(function(e){const a=e.detail.dropTargetItem;if(s&&s!==a){const i=t.items.filter((function(e){return e!==s})),c=i.indexOf(a)+("below"===e.detail.dropLocation?1:0);i.splice(c,0,s),Object(l.z)(i)}}))},0)}async updateFromCharacter(e){this.character=e,this.levels=e.levels,this.classes=await Object(l.i)(e),this.subclasses=JSON.parse(JSON.stringify(e.subclasses)),this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,s,a){if(s&&e[t]){const i=e[t].name,l=s[i];if(l){const s=l.classFeatures;let c=0,n=-1;if(e.length>=t+1){for(let a=0;a<t;a++)if(e[a].name===i){c++;const e=s[c];if(e){e.find(e=>e.gainSubclassFeature)&&n++}}const r=s[c];if(r){if(r.find(e=>e.gainSubclassFeature)&&a&&a[i]&&l.subclasses&&l.subclasses.length){const e=l.subclasses.find(e=>a[i]===e.name);if(e.subclassFeatures[n])return e.subclassFeatures[n].map(e=>(e.isSubclass=!0,e)),[...r].concat(e.subclassFeatures[n])}return r}}}}}_getClassLevelFeatureStringArray(e,t,s,a){if(e&&void 0!==t&&s&&a){const i=this._getClassLevelFeatures(e,t,s,a);if(i)return i.map(e=>({name:Object(h.getEntryName)(e),isSubclass:e.isSubclass}))}}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index;this.levels.splice(t,1),Object(l.z)(this.levels)}_expandDetails(e){let t=e.model.__data.item,s=this.$.classGrid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.classGrid.detailsOpenedItems)this.$.classGrid.closeItemDetails(e);s?this.$.classGrid.closeItemDetails(t):this.$.classGrid.openItemDetails(t)}_findChoices(e,t,s,a){if(a&&t&&e&&e.length&&s<e.length){let i=a[t];if(i){let c=[],n=Object(l.r)(i);if(void 0!==n){let a=0;for(let i=0;i<=s;i++){e[i].name===t&&a++}a===n&&c.push({id:"subclass"})}let r=this._getClassLevelFeatures(e,s,a);if(r&&r.length&&r.find(e=>"Ability Score Improvement"===e.name)&&c.push({id:"asi"}),0===s){const e=i.startingProficiencies.skills[0].choose;c.push({id:"profs",count:e.count,from:e.from,selections:this.character.classSkillProficiencies})}return c}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e){return t=>{Object(l.u)(void 0,e.name,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_addClassLevel(e){Object(l.t)(void 0,e.model.item,"classes")}_classSkillAddCallback(e){Object(l.A)(e)}static get template(){return a.b`
      <style include="material-styles my-styles">
        vaadin-grid {
          border-top: 1px solid var(--mdc-theme-text-divider-on-background);
        }
        #stats {
          margin-top: 0px;
        }
        .details {
          padding: 0 24px;
        }

        .button-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px;
        }
        .button-wrap > * {
          margin: 4px;
        }


        .row {
          margin: 10px;
          position: relative;
        }
        .row:after {
          content: "";
          display: table;
          clear: both;
        }

        .open-details {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .open-details:hover {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .level-col__level {
          margin-right: 10px;
          position: relative;
          top: -2px;
        }
        .level-col__class {
          font-size: 20px;
        }

        .features-col {
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0 30px 0 12px;
        }
        .class-feature:not(:last-of-type)::after {
          content: ', ';
        }
        .class-feature[subclass] {
          color: var(--mdc-theme-secondary);
        }

        .choices-col {
          display: flex;
          float: left;
          flex-wrap: wrap;
        }
        .choices-col__choice {
          margin-top: 10px;
          margin-right: 16px;
        }
        .choices-col__subclass-choice {
          display: block;
        }

        .delete-col {
          position: absolute;
          right: 0;
          top: 0;
        }
        .delete-btn {
          height: 24px;
          width: 24px;
          font-size: 18px;
          padding: 0;
        }
        .delete-btn:hover {
          color: var(--mdc-theme-secondary);
        }
      </style>

      <div class="button-wrap">
        <dnd-select-add model="classes" placeholder="Add a Level"></dnd-select-add>
        <template is="dom-repeat" items="[[_objArray(classes)]]">
          <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
        </template>
      </div>

      <vaadin-grid id="classGrid" rows-draggable height-by-rows items=[[levels]] theme="no-border">
        <vaadin-grid-column flex-grow="1">
          <template>
            <div class="row">
              <div class="open-details" on-click="_expandDetails">
                <div class="level-col">
                  <span class="level-col__level">[[_level(index)]]</span>
                  <span class="level-col__class">[[item.name]]</span>
                </div>

                <div class="features-col hidden-mobile-down">
                  <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses)]]">
                    <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                  </template>
                </div>
              </div>

              <div class="choices-col">
                <template is="dom-repeat" items="[[_findChoices(levels, item.name, index, classes)]]" as="choice">
                  <div class="choices-col__choice">
                    <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                      <dnd-select-add class="choices-col__subclass-choice" label="Subclass" add-callback="[[_genSubclassCallback(item)]]" options="[[_genSubclassOptions(item)]]" value="[[_getSubclassSelection(item, subclasses, character)]]" placeholder="<Choose Subclass>"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                      <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]"></dnd-asi-select>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'profs')]]">
                      <dnd-select-add choices="[[choice.count]]" label="Skill Proficiency" placeholder="<Choose Skills>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
                    </template>
                  </div>
                </template>
              </div>

              <div class="delete-col">
                <button class="mdc-icon-button material-icons delete-btn" on-click="_deleteLevel">close</button>
              </div>
            </div>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    `}}customElements.define("dnd-character-builder-class",p)}}]);
//# sourceMappingURL=3.bundle.js.map