(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{104:function(e,s,t){"use strict";var a=t(1),r=t(0),n=t(5);function i(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,s,t,l,c,o){if(t=null==t?"section"===e.type?-1:0:t,l=null==l?null:l,c=null==c?null:c,(o=null!=o&&o)&&h(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":p(this,!0);break;case"options":!function(s){e.entries&&(e.entries=e.entries.sort((e,s)=>e.name&&s.name?Object(a.ascSort)(e.name,s.name):e.name?-1:s.name?1:0),p(s,!1))}(this);break;case"list":if(e.items){s.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let n=0;n<e.items.length;n++)this.recursiveEntryRender(e.items[n],s,t+1,`<li ${Object(a.isNonstandardSource)(e.items[n].source)?`class="${r.i}"`:""}>`,"</li>");s.push("</ul>")}break;case"table":!function(a){s.push("<table class='table'>"),void 0!==e.caption&&s.push(`<caption>${e.caption}</caption>`);if(s.push("<thead>"),s.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let t=0;t<e.colLabels.length;++t)s.push(`<th ${r(t)}>${e.colLabels[t]}</th>`);s.push("</tr>"),s.push("</thead>"),s.push("<tbody>");for(let r=0;r<e.rows.length;++r){s.push("<tr class='table-row'>");for(let i=0;i<e.rows[r].length;++i)s.push(`<td ${n(i)}>`),a.recursiveEntryRender(e.rows[r][i],s,t+1),s.push("</td>");s.push("</tr>")}function r(s){return void 0===e.colStyles||s>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[s]}"`}function n(s){return void 0!==e.rowStyles?void 0===e.rowStyles||s>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[s]}"`:r(s)}s.push("</tbody>"),s.push("</table>")}(this);break;case"invocation":!function(e){p(e,!0)}(this);break;case"patron":!function(e){p(e,!1)}(this);break;case"abilityDc":h(),s.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),u();break;case"abilityAttackMod":null!==l&&s.push(l),s.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(a.utils_makeAttChoose)(e.attributes)}</span>`),null!==c&&s.push(c);break;case"inline":if(e.entries)for(let a=0;a<e.entries.length;a++)this.recursiveEntryRender(e.entries[a],s,t);break;case"bonus":s.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":s.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":s.push(i.getEntryDice(e));break;case"link":!function(e,t){let r;if("internal"===t.href.type){if(r=`${e.baseUrl}${t.href.path}#`,void 0!==t.href.hash&&(r+=t.href.hash,void 0!==t.href.subhashes))for(let e=0;e<t.href.subhashes.length;e++){const s=t.href.subhashes[e];r+=`,${Object(a.encodeForHash)(s.key)}:${Object(a.encodeForHash)(s.value)}`}}else"external"===t.href.type&&(r=t.href.url);s.push(`<a href='${r}'>${t.text}</a>`)}(this,e);break;case"item":s.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,s,t),s.push("</li>");break;case"print":s.push(d(e.entry))}}else"string"==typeof e?(h(),d(this),u()):(h(),s.push(e),u());function h(){null!==l&&s.push(l)}function u(){null!==c&&s.push(c)}function p(l,c){const o=t>=2,h=c?t+1:t,u=function(){const s=[];Object(a.isNonstandardSource)(e.source)&&s.push(r.i);o&&void 0!==e.name?s.push(i.HEAD_2):s.push(-1===t?i.HEAD_NEG_1:0===t?i.HEAD_0:i.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||s.push(r.j);return s.length>0?`class="${s.join(" ")}"`:""}(),p=function(){let s="";if("invocation"===e.type||"patron"===e.type){const t=e.source?`title="Source: ${n.a.sourceJsonToFull(e.source)}"`:"";s=void 0!==e.subclass?`${r.f}="${e.subclass.name}" ${r.g}="${e.subclass.source}" ${t}`:`${r.f}="${i.DATA_NONE}" ${r.g}="${i.DATA_NONE}" ${t}`}return s}(),d=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",b=void 0!==e.name?`<span class="stat-name">${e.name}${Object(a.isNonstandardSource)(e.source)?" (UA)":""}${o?".":""}</span> `:"";if(e.entries||e.name){if(s.push(`<${l.wrapperTag} ${p} ${u}>${b}${d}`),e.entries)for(let t=0;t<e.entries.length;t++)l.recursiveEntryRender(e.entries[t],s,h,"<p>","</p>");s.push(`</${l.wrapperTag}>`)}}function d(l){const c=function(){let s,t,a=0,r=!1;const n=[];let i="";for(let l=0;l<e.length;++l)switch(s=e.charAt(l),t=l<e.length-1?e.charAt(l+1):null,s){case"{":"@"===t?a++>0?i+=s:(n.push(i),r=!1,i=""):i+=s;break;case"}":0==--a?(n.push(i),i=""):i+=s;break;default:i+=s}i.length>0&&n.push(i);return n}();for(let e=0;e<c.length;e++){const h=c[e];if(null!=h&&""!==h)if("@"===h.charAt(0)){const[e,c]=[(o=h).substr(0,o.indexOf(" ")),o.substr(o.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":s.push("<b>"),l.recursiveEntryRender(c,s,t),s.push("</b>");break;case"@i":case"@italic":s.push("<i>"),l.recursiveEntryRender(c,s,t),s.push("</i>");break;case"@action":s.push(`<span title="${n.a.actionToExplanation(c)}" class="explanation">${c}</span>`);break;case"@skill":s.push(`<span title="${n.a.skillToExplanation(c)}" class="explanation">${c}</span>`)}else{const[n,o,h,...u]=c.split("|"),p=`${n}${o?`${r.n}${o}`:""}`,d={type:"link",href:{type:"internal",path:"",hash:Object(a.encodeForHash)(p)},text:h||n};switch(e){case"@spell":o||(d.href.hash+=r.n+r.hb),d.href.hash="/spells/"+d.href.hash,l.recursiveEntryRender(d,s,t);break;case"@item":o||(d.href.hash+=r.n+r.T),d.href.hash="/items/"+d.href.hash,l.recursiveEntryRender(d,s,t);break;case"@condition":o||(d.href.hash+=r.n+r.hb),d.href.hash="/conditions/"+d.href.hash,l.recursiveEntryRender(d,s,t);break;case"@class":const e=i.RE_INLINE_CLASS.exec(c);e&&(d.href.hash=e[1].trim(),d.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),o||(d.href.hash+=r.n+r.hb),d.href.hash="/classes/"+d.href.hash,l.recursiveEntryRender(d,s,t);break;case"@creature":o||(d.href.hash+=r.n+r.cb),d.href.hash="/bestiary/"+d.href.hash,l.recursiveEntryRender(d,s,t);break;case"@filter":s.push(n);break;case"@damage":case"@dice":case"@book":s.push(n);break;case"@5etools":o.indexOf(".")>-1?d.href.hash="/"+o.substring(0,o.indexOf(".")):d.href.hash="/"+o,l.recursiveEntryRender(d,s,t)}}}else s.push(h)}var o}o&&u()}}i.getEntryDice=function(e){let s;if(e.number&&e.faces)s=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let t of e.toRoll)s=String(t.number)+"d"+t.faces+" + ";s=s.substring(0,s.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${s}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${s}').total; }">${s}</span>`:s},i.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,i.HEAD_NEG_1="statsBlockSectionHead",i.HEAD_0="statsBlockHead",i.HEAD_1="statsBlockSubHead",i.HEAD_2="statsInlineHead",i.DATA_NONE="data-none",s.a=i},116:function(e,s,t){"use strict";t.r(s);var a=t(7),r=t(18),n=t(104),i=t(1);class l extends a.a{static get properties(){return{classEquipment:{type:String},hasClass:{type:Boolean,value:!1},hasBackground:{type:Boolean,value:!1}}}constructor(){super(),this.renderer=new n.a}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let s=e.detail.character;this.updateFromCharacter(s)},this.updateFromCharacter(Object(r.s)()),Object(r.i)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(r.i)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){if(this.hasClass=!1,this.hasBackground=!1,this.$.backgroundEquipment.innerHTML="",this.$.classEquipment.innerHTML="",e){let s;if(e.levels&&e.levels.length>0){s=(await Object(r.l)())[e.levels[0].name],this.hasClass=!0,this.$.classEquipment.innerHTML=this.parseClassEquipment(s.startingEquipment)}if(!s||s.startingEquipment.additionalFromBackground){const e=await Object(r.f)();e&&(this.hasBackground=!0,this.$.backgroundEquipment.innerHTML=this.parseBackgroundEquipment(e.entries))}this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0}))}}parseClassEquipment(e){if(e){return`${e.additionalFromBackground?"<p>You start with the following items, plus anything provided by your background.</p>":""}${0===e.default.length?"":`<ul><li>${e.default.map(e=>this.renderStr(e)).join("</li><li>")}</ul>`}${void 0===e.goldAlternative?"":`<p>Alternatively, you may start with ${this.renderStr(e.goldAlternative)} gp to buy your own equipment.</p>`}`}}parseBackgroundEquipment(e){if(e){const s=Object(i.entrySearch)("Equipment",e);return`<p>${this.renderStr(s.entry)}</p>`}}renderStr(e){let s=[];return this.renderer.recursiveEntryRender(e,s,0),s.join(" ")}static get template(){return a.b`
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
        .row-wrap:first-child {
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
      </div>
    `}}customElements.define("dnd-character-builder-equipment",l)}}]);
//# sourceMappingURL=8.bundle.js.map