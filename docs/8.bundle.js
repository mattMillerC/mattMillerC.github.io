(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{105:function(e,t,s){"use strict";var a=s(1),r=s(0),n=s(5);function i(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,l,c,o){if(s=null==s?"section"===e.type?-1:0:s,l=null==l?null:l,c=null==c?null:c,(o=null!=o&&o)&&h(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":p(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(a.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),p(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let n=0;n<e.items.length;n++)this.recursiveEntryRender(e.items[n],t,s+1,`<li ${Object(a.isNonstandardSource)(e.items[n].source)?`class="${r.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(a){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${r(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let r=0;r<e.rows.length;++r){t.push("<tr class='table-row'>");for(let i=0;i<e.rows[r].length;++i)t.push(`<td ${n(i)}>`),a.recursiveEntryRender(e.rows[r][i],t,s+1),t.push("</td>");t.push("</tr>")}function r(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function n(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:r(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){p(e,!0)}(this);break;case"patron":!function(e){p(e,!1)}(this);break;case"abilityDc":h(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),u();break;case"abilityAttackMod":null!==l&&t.push(l),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),null!==c&&t.push(c);break;case"inline":if(e.entries)for(let a=0;a<e.entries.length;a++)this.recursiveEntryRender(e.entries[a],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(i.getEntryDice(e));break;case"link":!function(e,s){let r;if("internal"===s.href.type){if(r=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(r+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];r+=`,${Object(a.encodeForHash)(t.key)}:${Object(a.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(r=s.href.url);t.push(`<a href='${r}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(d(e.entry))}}else"string"==typeof e?(h(),d(this),u()):(h(),t.push(e),u());function h(){null!==l&&t.push(l)}function u(){null!==c&&t.push(c)}function p(l,c){const o=s>=2,h=c?s+1:s,u=function(){const t=[];Object(a.isNonstandardSource)(e.source)&&t.push(r.i);o&&void 0!==e.name?t.push(i.HEAD_2):t.push(-1===s?i.HEAD_NEG_1:0===s?i.HEAD_0:i.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(r.j);return t.length>0?`class="${t.join(" ")}"`:""}(),p=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${n.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${r.f}="${e.subclass.name}" ${r.g}="${e.subclass.source}" ${s}`:`${r.f}="${i.DATA_NONE}" ${r.g}="${i.DATA_NONE}" ${s}`}return t}(),d=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",b=void 0!==e.name?`<span class="stat-name">${e.name}${Object(a.isNonstandardSource)(e.source)?" (UA)":""}${o?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${l.wrapperTag} ${p} ${u}>${b}${d}`),e.entries)for(let s=0;s<e.entries.length;s++)l.recursiveEntryRender(e.entries[s],t,h,"<p>","</p>");t.push(`</${l.wrapperTag}>`)}}function d(l){const c=function(){let t,s,a=0,r=!1;const n=[];let i="";for(let l=0;l<e.length;++l)switch(t=e.charAt(l),s=l<e.length-1?e.charAt(l+1):null,t){case"{":"@"===s?a++>0?i+=t:(n.push(i),r=!1,i=""):i+=t;break;case"}":0==--a?(n.push(i),i=""):i+=t;break;default:i+=t}i.length>0&&n.push(i);return n}();for(let e=0;e<c.length;e++){const h=c[e];if(null!=h&&""!==h)if("@"===h.charAt(0)){const[e,c]=[(o=h).substr(0,o.indexOf(" ")),o.substr(o.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),l.recursiveEntryRender(c,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),l.recursiveEntryRender(c,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${n.a.actionToExplanation(c)}" class="explanation">${c}</span>`);break;case"@skill":t.push(`<span title="${n.a.skillToExplanation(c)}" class="explanation">${c}</span>`)}else{const[n,o,h,...u]=c.split("|"),p=`${n}${o?`${r.n}${o}`:""}`,d={type:"link",href:{type:"internal",path:"",hash:Object(a.encodeForHash)(p)},text:h||n};switch(e){case"@spell":o||(d.href.hash+=r.n+r.hb),d.href.hash="/spells/"+d.href.hash,l.recursiveEntryRender(d,t,s);break;case"@item":o||(d.href.hash+=r.n+r.T),d.href.hash="/items/"+d.href.hash,l.recursiveEntryRender(d,t,s);break;case"@condition":o||(d.href.hash+=r.n+r.hb),d.href.hash="/conditions/"+d.href.hash,l.recursiveEntryRender(d,t,s);break;case"@class":const e=i.RE_INLINE_CLASS.exec(c);e&&(d.href.hash=e[1].trim(),d.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),o||(d.href.hash+=r.n+r.hb),d.href.hash="/classes/"+d.href.hash,l.recursiveEntryRender(d,t,s);break;case"@creature":o||(d.href.hash+=r.n+r.cb),d.href.hash="/bestiary/"+d.href.hash,l.recursiveEntryRender(d,t,s);break;case"@filter":t.push(n);break;case"@damage":case"@dice":case"@book":t.push(n);break;case"@5etools":o.indexOf(".")>-1?d.href.hash="/"+o.substring(0,o.indexOf(".")):d.href.hash="/"+o,l.recursiveEntryRender(d,t,s)}}}else t.push(h)}var o}o&&u()}}i.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},i.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,i.HEAD_NEG_1="statsBlockSectionHead",i.HEAD_0="statsBlockHead",i.HEAD_1="statsBlockSubHead",i.HEAD_2="statsInlineHead",i.DATA_NONE="data-none",t.a=i},119:function(e,t,s){"use strict";s.r(t);var a=s(7),r=s(18),n=s(105),i=s(107),l=s(1);class c extends a.a{static get properties(){return{classEquipment:{type:String},hasClass:{type:Boolean,value:!1},hasBackground:{type:Boolean,value:!1},isEditMode:{type:Boolean,value:!1}}}constructor(){super(),this.renderer=new n.a}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(r.y)()),Object(r.j)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode},Object(i.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(i.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(r.j)().removeEventListener("character-selected",this.characterChangeHandler),Object(i.b)().removeEventListener("editModeChange",this.editModeHandler)}async updateFromCharacter(e){if(this.hasClass=!1,this.hasBackground=!1,this.$.backgroundEquipment.innerHTML="",this.$.classEquipment.innerHTML="",e){let t;if(e.levels&&e.levels.length>0){t=(await Object(r.m)())[e.levels[0].name],this.hasClass=!0,this.$.classEquipment.innerHTML=this.parseClassEquipment(t.startingEquipment)}else this.$.classEquipment.innerHTML="";if(!t||t.startingEquipment.additionalFromBackground){const e=await Object(r.g)();e?(this.hasBackground=!0,this.$.backgroundEquipment.innerHTML=this.parseBackgroundEquipment(e.entries)):this.$.backgroundEquipment.innerHTML=""}else this.$.backgroundEquipment.innerHTML="";this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}parseClassEquipment(e){if(e){return`${e.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":""}${0===e.default.length?"":`<ul><li>${e.default.map(e=>this.renderStr(e)).join("</li><li>")}</ul>`}${void 0===e.goldAlternative?"":`<p>Alternatively, you may start with ${this.renderStr(e.goldAlternative)} gp to buy your own equipment.</p>`}`}}parseBackgroundEquipment(e){if(e){const t=Object(l.entrySearch)("Equipment",e);return`<p>${this.renderStr(t.entry)}</p>`}}renderStr(e){let t=[];return this.renderer.recursiveEntryRender(e,t,0),t.join(" ")}static get template(){return a.b`
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
        a {
          color: var(--mdc-theme-secondary);
        }

        .col-wrap {
          display: flex; 
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .row-wrap {
          width: 100%;
        }
        .row-wrap:not(:last-child) {
          margin-bottom: 24px;
        }

        .row-wrap > *:not(h2):not(:last-child) {
          margin-bottom: 10px;
        }

        span {
          font-size: 14px;
          font-style: italic;
        }

        @media(min-width: 921px) {
          .row-wrap {
            width: calc(50% - 10px);
          }
          .row-wrap:first-child {
            margin-bottom: 0;
          }
        }
      </style>

      <div class="col-wrap">
        <div class="row-wrap">
          <h2>From Class</h2>
          <span hidden$=[[hasClass]]>Select a class to see equipment</span>
          <div id="classEquipment"></div>
        </div>

        <div class="row-wrap">
          <h2>From Background</h2>
          <span hidden$=[[hasBackground]]>Select a background to see equipment</span>
          <div id="backgroundEquipment"></div>
        </div>

        <div class="row-wrap">
          <h2>Other Items</h2>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-equipment",c)}}]);
//# sourceMappingURL=8.bundle.js.map