(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{104:function(e,t,s){"use strict";var i=s(1),a=s(0),l=s(5);function n(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,c,o,r){if(s=null==s?"section"===e.type?-1:0:s,c=null==c?null:c,o=null==o?null:o,(r=null!=r&&r)&&d(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":u(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(i.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),u(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let l=0;l<e.items.length;l++)this.recursiveEntryRender(e.items[l],t,s+1,`<li ${Object(i.isNonstandardSource)(e.items[l].source)?`class="${a.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(i){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${a(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let a=0;a<e.rows.length;++a){t.push("<tr class='table-row'>");for(let n=0;n<e.rows[a].length;++n)t.push(`<td ${l(n)}>`),i.recursiveEntryRender(e.rows[a][n],t,s+1),t.push("</td>");t.push("</tr>")}function a(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function l(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:a(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){u(e,!0)}(this);break;case"patron":!function(e){u(e,!1)}(this);break;case"abilityDc":d(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(i.utils_makeAttChoose)(e.attributes)}</span>`),h();break;case"abilityAttackMod":null!==c&&t.push(c),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(i.utils_makeAttChoose)(e.attributes)}</span>`),null!==o&&t.push(o);break;case"inline":if(e.entries)for(let i=0;i<e.entries.length;i++)this.recursiveEntryRender(e.entries[i],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(n.getEntryDice(e));break;case"link":!function(e,s){let a;if("internal"===s.href.type){if(a=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(a+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];a+=`,${Object(i.encodeForHash)(t.key)}:${Object(i.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(a=s.href.url);t.push(`<a href='${a}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(p(e.entry))}}else"string"==typeof e?(d(),p(this),h()):(d(),t.push(e),h());function d(){null!==c&&t.push(c)}function h(){null!==o&&t.push(o)}function u(c,o){const r=s>=2,d=o?s+1:s,h=function(){const t=[];Object(i.isNonstandardSource)(e.source)&&t.push(a.i);r&&void 0!==e.name?t.push(n.HEAD_2):t.push(-1===s?n.HEAD_NEG_1:0===s?n.HEAD_0:n.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(a.j);return t.length>0?`class="${t.join(" ")}"`:""}(),u=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${l.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${a.f}="${e.subclass.name}" ${a.g}="${e.subclass.source}" ${s}`:`${a.f}="${n.DATA_NONE}" ${a.g}="${n.DATA_NONE}" ${s}`}return t}(),p=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",m=void 0!==e.name?`<span class="stat-name">${e.name}${Object(i.isNonstandardSource)(e.source)?" (UA)":""}${r?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${c.wrapperTag} ${u} ${h}>${m}${p}`),e.entries)for(let s=0;s<e.entries.length;s++)c.recursiveEntryRender(e.entries[s],t,d,"<p>","</p>");t.push(`</${c.wrapperTag}>`)}}function p(c){const o=function(){let t,s,i=0,a=!1;const l=[];let n="";for(let c=0;c<e.length;++c)switch(t=e.charAt(c),s=c<e.length-1?e.charAt(c+1):null,t){case"{":"@"===s?i++>0?n+=t:(l.push(n),a=!1,n=""):n+=t;break;case"}":0==--i?(l.push(n),n=""):n+=t;break;default:n+=t}n.length>0&&l.push(n);return l}();for(let e=0;e<o.length;e++){const d=o[e];if(null!=d&&""!==d)if("@"===d.charAt(0)){const[e,o]=[(r=d).substr(0,r.indexOf(" ")),r.substr(r.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),c.recursiveEntryRender(o,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),c.recursiveEntryRender(o,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${l.a.actionToExplanation(o)}" class="explanation">${o}</span>`);break;case"@skill":t.push(`<span title="${l.a.skillToExplanation(o)}" class="explanation">${o}</span>`)}else{const[l,r,d,...h]=o.split("|"),u=`${l}${r?`${a.n}${r}`:""}`,p={type:"link",href:{type:"internal",path:"",hash:Object(i.encodeForHash)(u)},text:d||l};switch(e){case"@spell":r||(p.href.hash+=a.n+a.hb),p.href.hash="/spells/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@item":r||(p.href.hash+=a.n+a.T),p.href.hash="/items/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@condition":r||(p.href.hash+=a.n+a.hb),p.href.hash="/conditions/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@class":const e=n.RE_INLINE_CLASS.exec(o);e&&(p.href.hash=e[1].trim(),p.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),r||(p.href.hash+=a.n+a.hb),p.href.hash="/classes/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@creature":r||(p.href.hash+=a.n+a.cb),p.href.hash="/bestiary/"+p.href.hash,c.recursiveEntryRender(p,t,s);break;case"@filter":t.push(l);break;case"@damage":case"@dice":case"@book":t.push(l);break;case"@5etools":r.indexOf(".")>-1?p.href.hash="/"+r.substring(0,r.indexOf(".")):p.href.hash="/"+r,c.recursiveEntryRender(p,t,s)}}}else t.push(d)}var r}r&&h()}}n.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},n.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,n.HEAD_NEG_1="statsBlockSectionHead",n.HEAD_0="statsBlockHead",n.HEAD_1="statsBlockSubHead",n.HEAD_2="statsInlineHead",n.DATA_NONE="data-none",t.a=n},110:function(e,t,s){"use strict";var i=s(7),a=s(18),l=s(1),n=(s(77),s(39));class c extends i.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(Array.isArray(this.value)&&this.options){const e=this.value.map(e=>-1!==this.options.indexOf(e)?this.options.indexOf(e):this.options.findIndex(t=>t.name===e.name&&t.source===e.source)).filter(e=>-1!==e);this.listBox&&(this.listBox.selectedValues=e),this.multiValue=e.map(e=>{let t=this.options[e];return t.name?t.name:Object(l.util_capitalizeAll)(t)}).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.value.name?this.$.select.value=this.options.findIndex(e=>e.name===this.value.name||e===this.value.name)+"":this.$.select.value=this.options.findIndex(e=>e.name===this.value||e===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(n.b)(this.model)),this.$.select.renderer=(e,t)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",e=>{t.opened=!0;let s=null!==e.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!s&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let e=this.listBox.selectedValues.map(e=>this.options[e]);this.multiValue=e.map(e=>e.name?e.name:Object(l.util_capitalizeAll)(e)).join(", "),this.addCallback&&this.addCallback(e)},0)})),this.options&&this.options.length)for(let e=0;e<this.options.length;e++){const t=this.options[e],s=document.createElement("vaadin-item");t.name?(s.textContent=t.name,s.setAttribute("value",e)):(s.textContent=Object(l.util_capitalizeAll)(t),s.setAttribute("value",e)),this.listBox.appendChild(s)}e.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const e=this.$.select.value;if(e&&!this.choices){const t=this.options[e];this.addCallback?this.addCallback(t,this.model):Object(a.z)(void 0,t,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(e){return!!e}_label(e,t){if(e)return t?`${e} (${t})`:e}static get template(){return i.b`
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
    `}}customElements.define("dnd-select-add",c)},120:function(e,t,s){"use strict";s.r(t);var i=s(7),a=s(27),l=s(18),n=(s(117),s(110),s(103));class c extends i.a{static get properties(){return{initialValue:{type:Boolean,value:!1,observer:"initValueChange"},checked:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:""},secondaryLabel:{type:String,value:""}}}initValueChange(){this.switchEl&&(this.switchEl.checked=this.initialValue,this.checked=this.initialValue)}ready(){super.ready(),this.switchEl=new n.a(this.shadowRoot.querySelector(".mdc-switch")),this.switchEl.checked=this.initialValue,this.checked=this.initialValue}connectedCallback(){super.connectedCallback(),this.switchEventHandler=()=>{this.checked=this.switchEl.checked,this.dispatchEvent(new CustomEvent("switch-change",{detail:{checked:this.switchEl.checked},bubbles:!0,composed:!0}))},this.shadowRoot.querySelector(".mdc-switch__native-control").addEventListener("change",this.switchEventHandler)}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot.querySelector(".mdc-switch__native-control").removeEventListener("change",this.switchEventHandler)}static get template(){return i.b`
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
    `}}customElements.define("dnd-switch",c);var o=s(67);s(74);class r extends i.a{static get properties(){return{label:{type:String,value:""},icon:{type:String,value:""}}}connectedCallback(){this.button=new o.a(this.$.button)}_exists(e){return!!e}static get template(){return i.b`
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
    `}}customElements.define("dnd-button",r);class d extends i.a{static get properties(){return{levelIndex:{type:Number},checked:{type:Boolean,value:!1},selectedFeat:{type:Object},selectedAbility1:{type:String,value:""},selectedAbility2:{type:String,value:""},featHasAttributeChoice:{type:Boolean,value:!1},featAttributeSelection:{type:String,value:""},featAttributeOptions:{type:Array,value:[]}}}constructor(){super(),this.attributeOptions=["STR","DEX","CON","INT","WIS","CHA"]}connectedCallback(){super.connectedCallback(),this.switchChangeHandler=e=>{this.checked=e.detail.checked,this._genASICallback()()},this.addEventListener("switch-change",this.switchChangeHandler),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.s)()),Object(l.i)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("switch-change",this.switchChangeHandler),Object(l.i)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){const{asi:t,index:s}=await Object(l.c)(this.levelIndex,e);if(this.featHasAttributeChoice=!1,t){if(this.selectedFeat=t.feat,this.selectedAbility1=t.ability1,this.selectedAbility2=t.ability2,this.checked=t.isFeat,t.isFeat&&t.feat&&t.feat.name&&t.feat.source){const s=`${t.feat.name}_${t.feat.source}`,i=await Object(l.o)(s);i.ability&&i.ability.length&&i.ability[0].choose&&(this.featHasAttributeChoice=!0,this.featAttributeOptions=i.ability[0].choose.from.map(e=>e.toUpperCase()),this.featAttributeSelection=e.featAttributeSelections&&e.featAttributeSelections[s]?e.featAttributeSelections[s]:"")}}else this.selectedFeat={name:"",source:""},this.selectedAbility1="",this.selectedAbility2="",this.checked=!1;this.asiIndex=s}_genASICallback(e){return t=>{Object(l.E)({feat:"feat"===e?{name:t.name,source:t.source}:this.selectedFeat,ability1:"ability1"===e?t:this.selectedAbility1,ability2:"ability2"===e?t:this.selectedAbility2,isFeat:this.checked},this.asiIndex)}}_genFeatAbilityCallback(){return e=>{if(this.selectedFeat&&this.selectedFeat.name&&this.selectedFeat.source){const t=`${this.selectedFeat.name}_${this.selectedFeat.source}`;Object(l.J)(t,e)}}}static get template(){return i.b`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          max-width: 192px;
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
    `}}customElements.define("dnd-asi-select",d);s(109);var h=s(1);const u={"artificer(ua)":{class:{2:{name:"Wonderous Invention",count:1,options:["{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},5:{name:"Wonderous Invention",count:1,options:["{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},10:{name:"Wonderous Invention",count:1,options:["{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},15:{name:"Wonderous Invention",count:1,options:["{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]},20:{name:"Wonderous Invention",count:1,options:["{@item Eyes of the eagle}","{@item gem of brightness}","{@item gloves of missile snaring}","{@item gloves of swimming and climbing}","{@item ring of jumping}","{@item ring of mind shielding}","{@item wings of flying}","{@item Boots of striding and springing}","{@item bracers of archery}","{@item brooch of shielding}","{@item broom of flying}","{@item hat of disguise}","{@item slippers of spider climbing}","{@item Bag of beans}","{@item chime of opening}","{@item decanter of endless water}","{@item eyes of minute seeing}","{@item folding boat}","{@item Heward's handy haversack}","{@item Alchemy jug}","{@item helm of comprehending languages}","{@item lantern of revealing}","{@item ring of swimming}","{@item robe of useful items}","{@item rope of climbing}","{@item wand of magic detection}","{@item wand of secrets}","{@item Bag of holding}","{@item cap of water breathing}","{@item driftglobe}","{@item goggles of night}","{@item sending stones}"]}}},"artificer (revisited)":{class:{2:{name:"Infuse Item",count:3,type:"featureType=ai|source=UAArtificerRevisited"},4:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},7:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},11:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},15:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"},19:{name:"Infuse Item",count:1,type:"featureType=ai|source=UAArtificerRevisited"}}},artificer:{class:{2:{name:"Infuse Item",count:4,type:"featureType=ai|source=ERLW"},6:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},10:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},14:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"},18:{name:"Infuse Item",count:2,type:"featureType=ai|source=ERLW"}}},barbarian:{subclasses:{"Path of the Totem Warrior":{3:{name:"Totem Spirit",count:1,options:["Bear","Eagle","Elk","Wolf","Tiger"]},6:{name:"Aspect of the Beast",count:1,options:["Bear","Eagle","Elk",{name:"Tiger",options:["athletics","acrobatics","stealth","survival"],choose:2,type:"proficiency"},"Wolf"]},14:{name:"Totemic Attunement",count:1,options:["Bear","Eagle","Elk","Tiger","Wolf"]}}}},bard:{subclasses:{"College of Swords":{3:{name:"Fighting Style",count:1,type:"fs:b"}}}}};var p=s(104),m=(s(73),s(39));class b extends(Object(a.a)(i.a)){static get properties(){return{levels:{type:Array,value:[]},classes:{type:Object},subclasses:{type:Object,value:void 0},heightByRows:{type:Boolean,value:()=>window.innerWidth<900}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(l.s)()),Object(l.i)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(l.i)().removeEventListener("character-selected",this.characterChangeHandler)}ready(){super.ready();const e=new p.a;setTimeout(()=>{const t=this.$.classGrid;let s;t.rowDetailsRenderer=((t,s,i)=>{t.firstElementChild||(t.innerHTML='<div class="details" id="stats"></div>');let a=[],l=this._getClassLevelFeatures(this.levels,i.index,this.classes,this.subclasses);for(let t of l)e.recursiveEntryRender(t,a,0,void 0,!0);const n=t.querySelector(".details");Object(h.jqEmpty)(n),n.innerHTML=a.join("")}).bind(this),t.addEventListener("grid-dragstart",(function(e){s=e.detail.draggedItems[0],t.dropMode="between"})),t.addEventListener("grid-dragend",(function(e){s=t.dropMode=null})),t.addEventListener("grid-drop",(function(e){const i=e.detail.dropTargetItem;if(s&&s!==i){const a=t.items.filter((function(e){return e!==s})),n=a.indexOf(i)+("below"===e.detail.dropLocation?1:0);a.splice(n,0,s),Object(l.H)(a)}}))},0)}async updateFromCharacter(e){this.character=e,this.classes=await Object(l.l)(e),this.subclasses=JSON.parse(JSON.stringify(e.subclasses)),this.classChoices=await this._findLevelChoices(e,this.classes),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.levels=e.levels,this.$.classGrid.clearCache()}_getClassLevelFeatures(e,t,s,i){if(s&&e[t]){const a=e[t].name,l=s[a];if(l){const s=l.classFeatures;let n=0,c=-1;if(e.length>=t+1){for(let i=0;i<t;i++)if(e[i].name===a){n++;const e=s[n];if(e){e.find(e=>e.gainSubclassFeature)&&c++}}const o=s[n];if(o){if(o.find(e=>e.gainSubclassFeature)&&i&&i[a]&&l.subclasses&&l.subclasses.length){const e=l.subclasses.find(e=>i[a].name===e.name);if(e.subclassFeatures[c])return e.subclassFeatures[c].map(e=>(e.isSubclass=!0,e)),[...o].concat(e.subclassFeatures[c])}return o}}}}}_getClassLevelFeatureStringArray(e,t,s,i){if(e&&void 0!==t&&s&&i){const a=this._getClassLevelFeatures(e,t,s,i);if(a)return a.map(e=>({name:Object(h.getEntryName)(e),isSubclass:e.isSubclass}))}}_level(e){return e+1}_deleteLevel(e){let t=e.model.__data.index;this.levels.splice(t,1),Object(l.H)(this.levels)}_expandDetails(e){let t=e.model.__data.item,s=this.$.classGrid.detailsOpenedItems.indexOf(t)>-1;for(let e of this.$.classGrid.detailsOpenedItems)this.$.classGrid.closeItemDetails(e);s?this.$.classGrid.closeItemDetails(t):this.$.classGrid.openItemDetails(t)}async _findLevelChoices(e,t){const s=[];if(e&&e.levels&&e.levels.length)for(let i=0;i<e.levels.length;i++)s.push(await this._findChoices(e,t,i));return s}async _findChoices(e,t,s){if(t&&e.levels&&e.levels.length&&e.levels.length>s){let i=e.levels,a=e.subclasses,n=i[s].name,c=t[n];if(c){let o=[],r=0,d=Object(l.w)(c);for(let e=0;e<=s;e++){i[e].name===n&&r++}void 0!==d&&r===d&&o.push({id:"subclass",from:c.subclasses,selections:e.subclasses[n]});let h=this._getClassLevelFeatures(i,s,t);if(h&&h.length&&h.find(e=>"Ability Score Improvement"===e.name)&&o.push({id:"asi"}),0===s){const t=c.startingProficiencies.skills[0].choose;o.push({id:"profs",count:t.count,from:t.from,selections:e.classSkillProficiencies})}if(r){const e=u[n.toLowerCase()];if(e&&e.class&&e.class[r]){const t=[].concat(e.class[r]);for(const e of t)if(e.options)o.push({id:"classFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:n.toLowerCase(),feature:e.name,level:r,selections:Object(l.j)(n.toLowerCase(),r,e.name)});else if(e.type){const t=await Object(m.a)("features",e.type);o.push({id:"classFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:n.toLowerCase(),feature:e.name,level:r,selections:Object(l.j)(n.toLowerCase(),r,e.name)})}}if(e&&e.subclasses&&a[n]&&e.subclasses[a[n]]&&e.subclasses[a[n]][r]){const t=[].concat(e.subclasses[a[n]][r]);for(const e of t)if(e.options)o.push({id:"subclassFeature",name:e.name,from:e.options,count:e.count>1?e.count:void 0,class:n.toLowerCase(),subclass:a[n],feature:e.name,level:r,selections:Object(l.v)(n.toLowerCase(),a[n],r,e.name)});else if(e.type){const t=await Object(m.a)("features",e.type);o.push({id:"subclassFeature",name:e.name,from:t,count:e.count>1?e.count:void 0,class:n.toLowerCase(),subclass:a[n],feature:e.name,level:r,selections:Object(l.v)(n.toLowerCase(),a[n],r,e.name)})}}}return o}}return[]}_equal(e,t){return e===t}_genSubclassCallback(e){return t=>{Object(l.A)(void 0,e.name,t)}}_genSubclassOptions(e){return this.classes[e.name].subclasses}_getSubclassSelection(e,t){return t[e.name]}_classFeatureOptionAddCallback(e,t,s){return i=>{let a;a=Array.isArray(i)?i.map(e=>e.name?{name:e.name,source:e.source}:e):i.name?{name:i.name,source:i.source}:i,Object(l.G)(e,t,s,a)}}_subclassFeatureOptionAddCallback(e,t,s,i){return a=>{let n;n=Array.isArray(a)?a.map(e=>e.name?{name:e.name,source:e.source}:e):a.name?{name:a.name,source:a.source}:a,Object(l.M)(e,t,s,i,n)}}_indexOfLevel(e,t){return t.indexOf(e)}_isMobile(){return window.innerWidth<921}_objArray(e){return Object.values(e)}_atIndex(e,t){return e?e[t]:null}_svgFromClass(e){return e?e.replace(/(\s|\(|\))/g,""):""}_addClassLevel(e){Object(l.z)(void 0,e.model.item,"classes")}_classSkillAddCallback(e){Object(l.I)(e)}static get template(){return i.b`
      <style include="material-styles my-styles">
        .something {
          display: block;
        }
        #stats {
          margin-top: 16px;
          line-height: 1.9;
        }
        .details {
          padding: 0 24px;
        }

        .heading-wrap {
          display: flex;
          justify-content: space-between;
          margin: 22px 14px 5px;
          align-items: center;
        }

        .heading {
          font-size: 24px;
          font-weight: bold;
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
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .open-details:hover {
          color: var(--mdc-theme-secondary);
        }

        .level-col {
          width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
          padding: 6px 0;
        }
        .level-col__level {
          margin-right: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .level-col__image-wrap {
          width: 30px;
          position: relative;
          height: 21px;
          display: inline-block;
        }
        .level-col__image {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: -1px;
        }
        .level-col__class {
          font-size: 20px;
          font-weight: bold;
        }

        .features-col {
          white-space: normal;
          margin: 0;
          padding: 8px 0;
          width: 100%;
          font-size: 15px;
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
          right: -8px;
          top: 4px;
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
        .details {
          padding: 0 6px;
        }
        @media(min-width: 921px) {
          .open-details {
            flex-wrap: nowrap;
          }
          .features-col {
            margin: 0 30px 0 12px;
            width: unset;
            font-size: 16px;
          }
        }
      </style>

      <div class="heading-wrap">
        <h2 class="heading">Class</h2>
        <dnd-select-add model="classes" placeholder="Add a Level"></dnd-select-add>
      </div>
      <div class="button-wrap">
        <template is="dom-repeat" items="[[_objArray(classes)]]">
          <dnd-button icon="add" label="[[item.name]]" on-click="_addClassLevel"></dnd-button>
        </template>
      </div>

      <vaadin-grid id="classGrid" rows-draggable items=[[levels]] theme="no-border" height-by-rows$="[[heightByRows]]">
        <vaadin-grid-column flex-grow="1">
          <template>
            <div class="row">
              <div class="open-details" on-click="_expandDetails">
                <div class="level-col">
                  <span class="level-col__level">[[_level(index)]]</span>
                  <span class="level-col__image-wrap" ><dnd-svg class="level-col__image" id="[[_svgFromClass(item.name)]]"></dnd-svg></span>
                  <span class="level-col__class">[[item.name]]</span>
                </div>

                <div class="features-col">
                  <template is="dom-repeat" items="[[_getClassLevelFeatureStringArray(levels, index, classes, subclasses)]]">
                    <span class="class-feature" subclass$="[[item.isSubclass]]">[[item.name]]</span>
                  </template>
                </div>
              </div>

              <div class="choices-col">
                <template is="dom-repeat" items="[[_atIndex(classChoices, index)]]" as="choice">
                  <div class="choices-col__choice">
                    <template is="dom-if" if="[[_equal(choice.id, 'subclass')]]">
                      <dnd-select-add class="choices-col__subclass-choice" label="Subclass" placeholder="<Choose Subclass>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_genSubclassCallback(item)]]"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'asi')]]">
                      <dnd-asi-select level-index="[[_indexOfLevel(item, levels)]]" character="[[character]]"></dnd-asi-select>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'profs')]]">
                      <dnd-select-add choices="[[choice.count]]" label="Skill Proficiency" placeholder="<Choose Skills>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'classFeature')]]">
                      <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_classFeatureOptionAddCallback(choice.class, choice.level, choice.feature)]]"></dnd-select-add>
                    </template>
                    <template is="dom-if" if="[[_equal(choice.id, 'subclassFeature')]]">
                      <dnd-select-add choices="[[choice.count]]" label="[[choice.name]]" placeholder="<Choose Option>"
                        options="[[choice.from]]" value="[[choice.selections]]" add-callback="[[_subclassFeatureOptionAddCallback(choice.class, choice.subclass, choice.level, choice.feature)]]"></dnd-select-add>
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
    `}}customElements.define("dnd-character-builder-class",b)}}]);
//# sourceMappingURL=5.bundle.js.map