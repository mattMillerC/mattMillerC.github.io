(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{104:function(e,t,s){"use strict";var l=s(1),r=s(0),a=s(5);function n(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,i,o,c){if(s=null==s?"section"===e.type?-1:0:s,i=null==i?null:i,o=null==o?null:o,(c=null!=c&&c)&&p(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":h(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(l.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),h(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let a=0;a<e.items.length;a++)this.recursiveEntryRender(e.items[a],t,s+1,`<li ${Object(l.isNonstandardSource)(e.items[a].source)?`class="${r.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(l){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${r(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let r=0;r<e.rows.length;++r){t.push("<tr class='table-row'>");for(let n=0;n<e.rows[r].length;++n)t.push(`<td ${a(n)}>`),l.recursiveEntryRender(e.rows[r][n],t,s+1),t.push("</td>");t.push("</tr>")}function r(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function a(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:r(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){h(e,!0)}(this);break;case"patron":!function(e){h(e,!1)}(this);break;case"abilityDc":p(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(l.utils_makeAttChoose)(e.attributes)}</span>`),d();break;case"abilityAttackMod":null!==i&&t.push(i),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(l.utils_makeAttChoose)(e.attributes)}</span>`),null!==o&&t.push(o);break;case"inline":if(e.entries)for(let l=0;l<e.entries.length;l++)this.recursiveEntryRender(e.entries[l],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(n.getEntryDice(e));break;case"link":!function(e,s){let r;if("internal"===s.href.type){if(r=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(r+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];r+=`,${Object(l.encodeForHash)(t.key)}:${Object(l.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(r=s.href.url);t.push(`<a href='${r}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(u(e.entry))}}else"string"==typeof e?(p(),u(this),d()):(p(),t.push(e),d());function p(){null!==i&&t.push(i)}function d(){null!==o&&t.push(o)}function h(i,o){const c=s>=2,p=o?s+1:s,d=function(){const t=[];Object(l.isNonstandardSource)(e.source)&&t.push(r.i);c&&void 0!==e.name?t.push(n.HEAD_2):t.push(-1===s?n.HEAD_NEG_1:0===s?n.HEAD_0:n.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(r.j);return t.length>0?`class="${t.join(" ")}"`:""}(),h=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${a.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${r.f}="${e.subclass.name}" ${r.g}="${e.subclass.source}" ${s}`:`${r.f}="${n.DATA_NONE}" ${r.g}="${n.DATA_NONE}" ${s}`}return t}(),u=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",m=void 0!==e.name?`<span class="stat-name">${e.name}${Object(l.isNonstandardSource)(e.source)?" (UA)":""}${c?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${i.wrapperTag} ${h} ${d}>${m}${u}`),e.entries)for(let s=0;s<e.entries.length;s++)i.recursiveEntryRender(e.entries[s],t,p,"<p>","</p>");t.push(`</${i.wrapperTag}>`)}}function u(i){const o=function(){let t,s,l=0,r=!1;const a=[];let n="";for(let i=0;i<e.length;++i)switch(t=e.charAt(i),s=i<e.length-1?e.charAt(i+1):null,t){case"{":"@"===s?l++>0?n+=t:(a.push(n),r=!1,n=""):n+=t;break;case"}":0==--l?(a.push(n),n=""):n+=t;break;default:n+=t}n.length>0&&a.push(n);return a}();for(let e=0;e<o.length;e++){const p=o[e];if(null!=p&&""!==p)if("@"===p.charAt(0)){const[e,o]=[(c=p).substr(0,c.indexOf(" ")),c.substr(c.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),i.recursiveEntryRender(o,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),i.recursiveEntryRender(o,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${a.a.actionToExplanation(o)}" class="explanation">${o}</span>`);break;case"@skill":t.push(`<span title="${a.a.skillToExplanation(o)}" class="explanation">${o}</span>`)}else{const[a,c,p,...d]=o.split("|"),h=`${a}${c?`${r.n}${c}`:""}`,u={type:"link",href:{type:"internal",path:"",hash:Object(l.encodeForHash)(h)},text:p||a};switch(e){case"@spell":c||(u.href.hash+=r.n+r.hb),u.href.hash="/spells/"+u.href.hash,i.recursiveEntryRender(u,t,s);break;case"@item":c||(u.href.hash+=r.n+r.T),u.href.hash="/items/"+u.href.hash,i.recursiveEntryRender(u,t,s);break;case"@condition":c||(u.href.hash+=r.n+r.hb),u.href.hash="/conditions/"+u.href.hash,i.recursiveEntryRender(u,t,s);break;case"@class":const e=n.RE_INLINE_CLASS.exec(o);e&&(u.href.hash=e[1].trim(),u.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),c||(u.href.hash+=r.n+r.hb),u.href.hash="/classes/"+u.href.hash,i.recursiveEntryRender(u,t,s);break;case"@creature":c||(u.href.hash+=r.n+r.cb),u.href.hash="/bestiary/"+u.href.hash,i.recursiveEntryRender(u,t,s);break;case"@filter":t.push(a);break;case"@damage":case"@dice":case"@book":t.push(a);break;case"@5etools":c.indexOf(".")>-1?u.href.hash="/"+c.substring(0,c.indexOf(".")):u.href.hash="/"+c,i.recursiveEntryRender(u,t,s)}}}else t.push(p)}var c}c&&d()}}n.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},n.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,n.HEAD_NEG_1="statsBlockSectionHead",n.HEAD_0="statsBlockHead",n.HEAD_1="statsBlockSubHead",n.HEAD_2="statsInlineHead",n.DATA_NONE="data-none",t.a=n},109:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return n})),s.d(t,"spellHtml",(function(){return i}));var l=s(104),r=s(5);const a=new l.a;function n(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=i(e);t.querySelector(".stats-wrapper").innerHTML=s}function i(e){const t=[];if(t.push(`<div class="margin-bottom_med"><span class="stats-source source${e.source}" title="${r.a.sourceJsonToFull(e.source)}">${r.a.sourceJsonToAbv(e.source)}</div>`),t.push(`<div class="margin-bottom_med"><span>${r.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${r.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${r.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${r.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${r.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),a.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};a.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${r.a.spMainClassesToFull(e.classes)}</div>`),e.classes.fromSubclass){const s=r.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),a.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},121:function(e,t,s){"use strict";s.r(t);var l=s(7),r=(s(119),s(44),s(36),s(13));const a=r.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
  <template>
    <style>
      :host {
        --vaadin-grid-tree-toggle-level-offset: 2em;
        align-items: center;
        vertical-align: middle;
        margin-left: calc(var(--lumo-space-s) * -1);
        -webkit-tap-highlight-color: transparent;
      }

      :host(:not([leaf])) {
        cursor: default;
      }

      [part="toggle"] {
        display: inline-block;
        font-size: 1.5em;
        line-height: 1;
        width: 1em;
        height: 1em;
        text-align: center;
        color: var(--lumo-contrast-50pct);
        /* Increase touch target area */
        padding: calc(1em / 3);
        margin: calc(1em / -3);
      }

      :host(:not([dir="rtl"])) [part="toggle"] {
        margin-right: 0;
      }

      @media (hover: hover) {
        :host(:hover) [part="toggle"] {
          color: var(--lumo-contrast-80pct);
        }
      }

      [part="toggle"]::before {
        font-family: "lumo-icons";
        display: inline-block;
        height: 100%;
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(--lumo-icons-angle-right);
      }

      :host([expanded]) [part="toggle"]::before {
        content: var(--lumo-icons-angle-right);
        transform: rotate(90deg);
      }

      /* Experimental support for hierarchy connectors, using an unsupported selector */
      :host([theme~="connectors"]) #level-spacer {
        position: relative;
        z-index: -1;
        font-size: 1em;
        height: 1.5em;
      }

      :host([theme~="connectors"]) #level-spacer::before {
        display: block;
        content: "";
        margin-top: calc(var(--lumo-space-m) * -1);
        height: calc(var(--lumo-space-m) + 3em);
        background-image: linear-gradient(to right, transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px), var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px));
        background-size: var(--vaadin-grid-tree-toggle-level-offset) var(--vaadin-grid-tree-toggle-level-offset);
        background-position: calc(var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px) 0;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) {
        margin-left: 0;
        margin-right: calc(var(--lumo-space-s) * -1);
      }

      :host([dir="rtl"]) [part="toggle"] {
        margin-left: 0;
      }

      :host([dir="rtl"][expanded]) [part="toggle"]::before {
        transform: rotate(-90deg);
      }

      :host([dir="rtl"][theme~="connectors"]) #level-spacer::before {
        background-image: linear-gradient(to left, transparent calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px), var(--lumo-contrast-10pct) calc(var(--vaadin-grid-tree-toggle-level-offset) - 1px));
        background-position: calc(100% - (var(--vaadin-grid-tree-toggle-level-offset) / 2 - 2px)) 0;
      }

      :host([dir="rtl"]:not([expanded])) [part="toggle"]::before,
      :host([dir="rtl"][expanded]) [part="toggle"]::before {
        content: var(--lumo-icons-angle-left);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(a.content);s(30);var n=s(15),i=s(20),o=s(41),c=s(10);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const p=document.createElement("template");p.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(p.content);class d extends(Object(i.a)(Object(o.a)(l.a))){static get template(){return r.a`
    <style>
      :host {
        display: inline-flex;
        align-items: baseline;

        /* CSS API for :host */
        --vaadin-grid-tree-toggle-level-offset: 1em;

        /*
          ShadyCSS seems to polyfill :dir(rtl) only for :host, thus using
          a host custom CSS property for ltr/rtl toggle icon choice.
         */
        ---collapsed-icon: "\\e7be\\00a0";
      }

      :host(:dir(rtl)) {
        ---collapsed-icon: "\\e7bd\\00a0";
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:not([leaf])) {
        cursor: pointer;
      }

      #level-spacer,
      [part="toggle"] {
        flex: none;
      }

      #level-spacer {
        display: inline-block;
        width: calc(var(---level, '0') * var(--vaadin-grid-tree-toggle-level-offset));
      }

      [part="toggle"]::before {
        font-family: "vaadin-grid-tree-icons";
        line-height: 1em; /* make icon font metrics not affect baseline */
      }

      :host(:not([expanded])) [part="toggle"]::before {
        content: var(---collapsed-icon);
      }

      :host([expanded]) [part="toggle"]::before {
        content: "\\e7bc\\00a0"; /* icon glyph + single non-breaking space */
      }

      :host([leaf]) [part="toggle"] {
        visibility: hidden;
      }
    </style>

    <span id="level-spacer"></span>
    <span part="toggle"></span>
    <slot></slot>
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=n.a.debounce(this._debouncerUpdateLevel,c.c,()=>this.updateStyles({"---level":t}))}}customElements.define(d.is,d);var h=s(18),u=s(39),m=s(106),g=s(109),A=s(1),f=s(5);s(113),s(112);class b extends l.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},heightByRows:{type:Boolean,value:()=>window.innerWidth<900},isEditMode:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(h.s)()),Object(h.i)().addEventListener("character-selected",this.characterChangeHandler),this.editModeHandler=e=>{this.isEditMode=e.detail.isEditMode,this.refresh=!0,this.updateFromCharacter(Object(h.s)())},Object(m.b)().addEventListener("editModeChange",this.editModeHandler),this.isEditMode=Object(m.c)()}disconnectedCallback(){super.disconnectedCallback(),Object(h.i)().removeEventListener("character-selected",this.characterChangeHandler),Object(m.b)().removeEventListener("editModeChange",this.editModeHandler)}ready(){super.ready(),this.multiclassSlotsDef=[[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]],setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const s=e.page*e.pageSize,l=e.parentItem?e.parentItem.children:this.spellDisplay;if(l&&l.length){t(l.slice(s,s+e.pageSize),l.length)}}).bind(this)},0)}updateSpellStats(e,t,s){}async updateFromCharacter(e){if(e&&this.refresh){const t=await Object(h.l)(e),s=Object(h.k)(e),l=[],r={};let a=[];this.updateSpellStats(e,t,s);for(const[n,i]of Object.entries(s)){const s=t[n];if(s.casterProgression){let t,o,c,p,d="known";if(s.classTableGroups.forEach(e=>{if(e.colLabels&&e.colLabels.length){const s=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spells known")>-1);s>-1&&e.rows&&e.rows.length>i-1&&(t=e.rows[i-1][s]);const l=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("cantrips known")>-1);l>-1&&e.rows&&e.rows.length>i-1&&(o=e.rows[i-1][l]);const r=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("slot level")>-1);if(r>-1&&e.rows&&e.rows.length>i-1){const t=e.rows[i-1][r].match(/(\d+)/g);t&&t.length&&(c=parseInt(t[0]))}const a=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spell slots")>-1);a>-1&&e.rows&&e.rows.length>i-1&&(p=e.rows[i-1][a])}}),void 0===t){d="prepared";const e="full"===s.casterProgression?1:.5,l=await Object(h.d)(s.spellcastingAbility);t=Math.floor(i*e)+l,t=t<1?1:t}let m=await Object(u.a)("spells",{key:"classes.fromClassList",value:{name:n,source:s.source}});const g=Object(h.w)(s);if(i>=g){const t=e.subclasses&&e.subclasses[n]?e.subclasses[n].shortName:"";if(t){let e=await Object(u.a)("spells",{key:"classes.fromSubclass",value:{"subclass.name":t,"class.name":n,"class.source":s.source}});e.forEach(e=>{e.isSubclassSpell=!0}),m=[...new Set(m.concat(e))]}}const A=s.classTableGroups.find(e=>"Spell Slots per Spell Level"===e.title);let f;if(A)f=A.rows[i-1].filter(e=>0!==e);else{f=[];for(let e=0;e<c;e++)f.push(0)}const b=o?0:1;o&&(f=[0].concat(f));let v=JSON.parse(JSON.stringify(e.preparedSpells)),w=JSON.parse(JSON.stringify(e.preparedCantrips));e.preparedSpells[n]={},e.preparedCantrips[n]={};const y=f.map((t,s)=>{if(-1!==t){let r=m.filter(e=>e.level===s+b).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>{const l=s+b===0,r=l?Object(h.y)(n,t,w):Object(h.y)(n,t,v);return r&&(l?e.preparedCantrips[n][t.name]={name:t.name,source:t.source}:e.preparedSpells[n][t.name]={name:t.name,source:t.source}),this.isEditMode||r||t.isSubclassSpell?{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:n,parentLevel:s+b}],hasChildren:!0,parentClass:n,parentLevel:s+b,isCantrip:l,isSubclassSpell:t.isSubclassSpell,isWarlock:!!c}:void 0}).filter(e=>void 0!==e);const a={id:"level",level:s+b,spellSlots:t,currentSlots:Object(h.u)(s+b),children:r,hasChildren:r.length>0,parentClass:n,isWarlock:!!c};return this.$.grid.expandedItems.some(e=>"level"===e.id&&e.level===a.level&&e.parentClass===a.parentClass)&&l.push(a),a}return null}).filter(e=>null!==e);if(r[n]={current:e.preparedSpells&&e.preparedSpells[n]?Object.keys(e.preparedSpells[n]):[],max:t,type:d,maxCantrips:o,currentCantrips:e.preparedCantrips&&e.preparedCantrips[n]?Object.keys(e.preparedCantrips[n]):[]},y.length){const e={id:"class",className:n,level:i,hasCantrips:b,children:y,spellsKnown:t,hasChildren:y.length>0,spellPrepType:d,multiclassingLevels:("full"===s.casterProgression?1:.5)*i,isWarlock:!!c,warlockSpellLevel:c,warlockSpellSlots:p};l.push(e),a.push(e)}}}if(a.sort((e,t)=>e.children.length-t.children.length),!this.isEditMode&&a.length){let t,s,l=[],r=0,n=-1;for(let e of a)e.isWarlock?(t=e.warlockSpellLevel,s=e.warlockSpellSlots):(r+=e.multiclassingLevels,n++),e.children.forEach((t,s)=>{const r=s+e.hasCantrips;l[r]?t.children[s]&&l[r].children.push(t.children[s]):l[r]=t});l=l.filter(e=>void 0!==e);const i=0===l[0].level;if(n>0){const e=this.multiclassSlotsDef[r];for(let t=i?1:0;t<l.length;t++)l[t].spellSlots=e[t-(i?1:0)]}t&&(l[t-(i?0:1)].warlockSpellSlots=s,l[t-(i?0:1)].currentWarlockSlots=e.warlockSpellSlots||0),a=l}this.refresh=!1,Object(h.C)(e),this.spellsKnown=r,this.spellDisplay=a,this.expandedItems=l,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,composed:!0})),this.$.grid.clearCache()}}_renderSpell(e){return Object(g.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isSubclassSpell&&this.isEditMode){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedSpell(this.spellsKnown,t,s.name),r=this._currentSpellsKnownCount(t,this.spellsKnown),a=this._maxSpellsKnownCount(t,this.spellsKnown);if((l||r<a)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].current.indexOf(s.name);e[t].current.splice(l,1)}else e[t].current.push(s.name);this.spellsKnown=e,Object(h.O)(t,s)}else r>=a&&this._flashPreparedButton(Object(A.findInPath)("button",e.path))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,s=e.model.item.children[0],l=this._isPreparedCantrip(this.spellsKnown,t,s.name),r=this._currentCantripsKnownCount(t,this.spellsKnown),a=this._maxCantripsKnownCount(t,this.spellsKnown);if((l||r<a)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(l){const l=e[t].currentCantrips.indexOf(s.name);e[t].currentCantrips.splice(l,1)}else e[t].currentCantrips.push(s.name);this.spellsKnown=e,Object(h.N)(t,s)}else r>=a&&this._flashPreparedButton(Object(A.findInPath)("button",e.path))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(A.findInPath)("vaadin-checkbox",e.path),s=!!Object(A.findInPath)("[warlock-spell]",e.path),l=s?e.model.item.currentWarlockSlots:e.model.item.currentSlots,r=s?e.model.item.warlockSpellSlots:e.model.item.spellSlots,a=e.model.item.level;if(t){!!t.checked&&l<r?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1)}else l<r?s?e.model.item.currentWarlockSlots=l+1:e.model.item.currentSlots=l+1:l>0&&(s?e.model.item.currentWarlockSlots=l-1:e.model.item.currentSlots=l-1);s?(this._setSpellSlotsChecked(e.model.item.currentWarlockSlots,Object(A.findInPath)(".slot-checkboxes",e.path)),Object(h.L)(a,e.model.item.currentWarlockSlots,void 0,!0)):(this._setSpellSlotsChecked(e.model.item.currentSlots,Object(A.findInPath)(".slot-checkboxes",e.path)),Object(h.L)(a,e.model.item.currentSlots))}_setSpellSlotsChecked(e,t){const s=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<s.length;t++)s[t].checked=t<e}_preventDefault(e){e.preventDefault(),e.stopPropagation()}_isPreparedClass(e,t,s){const l=t.parentClass,r=t.name,a=t.isCantrip,n=t.isSubclassSpell;if(n)return s?"spell-button always-prepared edit-mode":"spell-button always-prepared";return(a?this._isPreparedCantrip(e,l,r):this._isPreparedSpell(e,l,r,n))?s?"spell-prepared spell-button edit-mode":"spell-prepared spell-button":s?"spell-button edit-mode":"spell-button"}_isPreparedSpell(e,t,s,l){return l||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(s)>-1}_isPreparedCantrip(e,t,s){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(s)>-1}_isPreparedText(e,t){const s=t.parentClass,l=t.name,r=t.isCantrip,a=t.isSubclassSpell,n=e[s].type;if(a)return"Always";return(r?this._isPreparedCantrip(e,s,l):this._isPreparedSpell(e,s,l,a))?"known"===n?"Learned":"Prepared":"known"===n?"Learn":"Prepare"}_countToArray(e){const t=[];for(var s=0;s<e;s++)t.push(null);return t}_toLevel(e){return 0===e?f.a.spLevelToFull(e)+"s":f.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_spellsKnownString(e){return"Spells "+Object(A.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return f.a.spLevelToFull(e.children[0].level)}_isSpellSlotChecked(e,t){return t<e}_spellClassText(e){return Object(A.util_capitalizeAll)(e)}_isEmpty(e){return!e||!e.length}_hideCheckboxes(e){return!e||e>0&&this.isEditMode}_equal(e,t){return e===t}static get template(){return l.b`
      <style include='my-styles'>
        :host {}
        :host {
          display: block;
        }
        [hidden] {
          display: none !important;
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 34px 14px 24px;
        }

        vaadin-grid-tree-toggle { 
          width: 100%;
          cursor: pointer;
        }

        .class-wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 4px;
          /* padding-top: 34px;
          padding-bottom: 8px; */
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .class-wrap h3 {
          font-size: 22px;
          font-weight: bold;
        }

        .spells-prepared-text {
          margin-right: 6px;
          margin-left: auto;
        }
        .prepared-count {
          color: var(--mdc-theme-secondary);
          font-weight: bold;
        }
        .cantrips-prepared {
          margin-right: 0;
        }

        .level-outer-wrap {
          border-bottom: 1px solid var(--_lumo-grid-secondary-border-color);
          padding-bottom: 8px;
          display: flex;
          height: 32px;
        }

        .level-wrap {
          width: 100%;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .slot-checkboxes {
          cursor: pointer;
          display: flex;
          padding: 4px;
        }

        .slot-checkboxes span {
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          margin-left: 4px;
        }

        .checkbox {
          width: 18px;
          height: 18px;
          margin: 4px;
          background-color: var(--mdc-theme-text-disabled-on-background);
        }
        .checkbox[checked] {
          background-color: var(--mdc-theme-secondary);
        }

        .spell-wrap {
          width: calc(100% - 100px);
          margin-left: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spell-inner-wrap {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .spell-level {
          color: var(--mdc-theme-text-disabled-on-background);
          margin-left: 8px;
          margin-right: 4px;
          font-size: 12px;
        }

        .rit-ind,
        .conc-ind {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          color: var(--mdc-theme-on-secondary);
          background-color: var(--mdc-theme-secondary);
          font-size: 10px;
          position: relative;
          bottom: 1px;
          margin-left: 4px;
        }

        .rit-ind::before {
          content: 'R';
        }

        .conc-ind::before {
          content: 'C';
        }

        .spell-def-wrap {
          font-size: 14px;
          width: calc(100% - 20px);
          margin: 0 auto;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
        }

        .spell-def-wrap .margin-bottom_med {
          margin-bottom: 0px !important;
        }

        .spell-def-wrap .text {
          margin-top: 16px;
        }

        .spell-def-wrap p {
          margin-bottom: 16px;
        }

        .stats-wrapper {
          margin: 0 14px;
        }

        .spell-button,
        .class-icon {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          width: 60px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 1px 4px;
        }
        .spell-button.edit-mode {
          cursor: pointer;
        }
        .spell-button.always-prepared {
          background-color: var(--mdc-theme-secondary-lighter);
          cursor: not-allowed;
        }
        .spell-button.spell-prepared {
          background-color: var(--mdc-theme-secondary);
        }
        .spell-button.flash-error {
          background-color: var(--mdc-theme-error);
          transition: background-color 0.2s ease-out;
        }
        .spell-button.transition-bg {
          transition: background-color 0.2s ease-in;
        }
        .class-icon {
          width: auto;
        }
      </style>

      <h2>Spells</h2>
      <div>
        <vaadin-grid id="grid" theme="no-border no-row-borders" expanded-items="[[expandedItems]]" height-by-rows$="[[heightByRows]]">
          <vaadin-grid-column flex-grow="1">
            <template>
                <template is="dom-if" if="[[_equal(item.id, 'class')]]">
                  <div class="class-wrap">
                    <h3>[[item.className]]</h3>
                    <div class='spells-prepared-text'>
                      <span>[[_spellsKnownString(item.spellPrepType)]]</span>
                      <span class='prepared-count'>[[_currentSpellsKnownCount(item.className, spellsKnown)]] / [[_maxSpellsKnownCount(item.className, spellsKnown)]]</span>
                    </div>
                  </div>
                </template>
    
                <template is="dom-if" if="[[_equal(item.id, 'level')]]">
                  <div class="level-outer-wrap">
                    <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}">
                      <h4 class="level-wrap">[[_toLevel(item.level)]]</h4>
                      <div class="cantrips-prepared spells-prepared-text" hidden$="[[!_equal(item.level, 0)]]">
                        <span>Cantrips Known:</span>
                        <span class='prepared-count'>[[_currentCantripsKnownCount(item.parentClass, spellsKnown)]] / [[_maxCantripsKnownCount(item.parentClass, spellsKnown)]]</span>
                      </div>
                    </vaadin-grid-tree-toggle>

                    <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.warlockSpellSlots, isEditMode)]]" on-click="_toggleSpellSlot" warlock-spell>
                      <template is='dom-repeat' items='[[_countToArray(item.warlockSpellSlots)]]' as="thing">
                        <vaadin-checkbox on-click="_preventDefault" checked="[[_isSpellSlotChecked(item.currentWarlockSlots, index)]]"></vaadin-checkbox>
                      </template>
                      <span>Pact</span>
                    </div>

                    <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode)]]" on-click="_toggleSpellSlot">
                      <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                        <vaadin-checkbox on-click="_preventDefault" checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox>
                      </template>
                      <span>Slots</span>
                    </div>
                  </div>
                </template>

                <template is="dom-if" if="[[_equal(item.id, 'spell')]]">
                  <div class="spell-outer-wrap">
                    <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" class="spell-wrap">
                      <span class="spell-inner-wrap">[[item.name]]<span class="spell-level" hidden>[[_spellLevel(item)]]</span><span class="rit-ind" title="Ritual" hidden$="[[!_isRitualSpell(item)]]"></span><span class="conc-ind" title="Concentration" hidden$="[[!_isConcentrationSpell(item)]]"></span></span>
                    </vaadin-grid-tree-toggle>
                    <button class$="[[_isPreparedClass(spellsKnown, item, isEditMode)]]" hidden$="[[!isEditMode]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
                    <span class="class-icon" hidden$="[[isEditMode]]">[[_spellClassText(item.parentClass)]]</span>
                  </div>
                </template>

                <template is="dom-if" if="[[_equal(item.id, 'spelldef')]]">
                  <div class="spell-def-wrap">
                    <div class= "stats-wrapper" inner-h-t-m-l="[[_renderSpell(item)]]"></div>
                  </div>
                </template>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
    `}}customElements.define("dnd-character-builder-spells",b)}}]);
//# sourceMappingURL=6.bundle.js.map