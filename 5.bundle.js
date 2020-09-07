(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{104:function(e,t,s){"use strict";var n=s(2),l=s(0),r=s(5);function a(){this.wrapperTag="div",this.baseUrl="",this.setWrapperTag=function(e){this.wrapperTag=e},this.setBaseUrl=function(e){this.baseUrl=e},this.recursiveEntryRender=function(e,t,s,o,i,c){if(s=null==s?"section"===e.type?-1:0:s,o=null==o?null:o,i=null==i?null:i,(c=null!=c&&c)&&p(),"object"==typeof e){switch(void 0===e.type||"section"===e.type?"entries":e.type){case"entries":h(this,!0);break;case"options":!function(t){e.entries&&(e.entries=e.entries.sort((e,t)=>e.name&&t.name?Object(n.ascSort)(e.name,t.name):e.name?-1:t.name?1:0),h(t,!1))}(this);break;case"list":if(e.items){t.push(`<ul ${e.style?`class="${e.style}"`:""}>`);for(let r=0;r<e.items.length;r++)this.recursiveEntryRender(e.items[r],t,s+1,`<li ${Object(n.isNonstandardSource)(e.items[r].source)?`class="${l.i}"`:""}>`,"</li>");t.push("</ul>")}break;case"table":!function(n){t.push("<table class='table'>"),void 0!==e.caption&&t.push(`<caption>${e.caption}</caption>`);if(t.push("<thead>"),t.push("<tr class='table-row table-row--header'>"),e.colLabels)for(let s=0;s<e.colLabels.length;++s)t.push(`<th ${l(s)}>${e.colLabels[s]}</th>`);t.push("</tr>"),t.push("</thead>"),t.push("<tbody>");for(let l=0;l<e.rows.length;++l){t.push("<tr class='table-row'>");for(let a=0;a<e.rows[l].length;++a)t.push(`<td ${r(a)}>`),n.recursiveEntryRender(e.rows[l][a],t,s+1),t.push("</td>");t.push("</tr>")}function l(t){return void 0===e.colStyles||t>=e.colStyles.length?"class='table-cell'":`class="table-cell ${e.colStyles[t]}"`}function r(t){return void 0!==e.rowStyles?void 0===e.rowStyles||t>=e.rowStyles.length?"class='table-cell'":`class="table-cell ${e.rowStyles[t]}"`:l(t)}t.push("</tbody>"),t.push("</table>")}(this);break;case"invocation":!function(e){h(e,!0)}(this);break;case"patron":!function(e){h(e,!1)}(this);break;case"abilityDc":p(),t.push(`<span class='spell-ability'><span>${e.name} save DC</span> = 8 + your proficiency bonus + your ${Object(n.utils_makeAttChoose)(e.attributes)}</span>`),d();break;case"abilityAttackMod":null!==o&&t.push(o),t.push(`<span class='spell-ability'><span>${e.name} attack modifier</span> = your proficiency bonus + your ${Object(n.utils_makeAttChoose)(e.attributes)}</span>`),null!==i&&t.push(i);break;case"inline":if(e.entries)for(let n=0;n<e.entries.length;n++)this.recursiveEntryRender(e.entries[n],t,s);break;case"bonus":t.push((e.value<0?"":"+")+e.value);break;case"bonusSpeed":t.push((e.value<0?"":"+")+e.value+"ft.");break;case"dice":t.push(a.getEntryDice(e));break;case"link":!function(e,s){let l;if("internal"===s.href.type){if(l=`${e.baseUrl}${s.href.path}#`,void 0!==s.href.hash&&(l+=s.href.hash,void 0!==s.href.subhashes))for(let e=0;e<s.href.subhashes.length;e++){const t=s.href.subhashes[e];l+=`,${Object(n.encodeForHash)(t.key)}:${Object(n.encodeForHash)(t.value)}`}}else"external"===s.href.type&&(l=s.href.url);t.push(`<a href='${l}'>${s.text}</a>`)}(this,e);break;case"item":t.push(`<li><b>${e.name}: </b>`),this.recursiveEntryRender(e.entry,t,s),t.push("</li>");break;case"print":t.push(u(e.entry))}}else"string"==typeof e?(p(),u(this),d()):(p(),t.push(e),d());function p(){null!==o&&t.push(o)}function d(){null!==i&&t.push(i)}function h(o,i){const c=s>=2,p=i?s+1:s,d=function(){const t=[];Object(n.isNonstandardSource)(e.source)&&t.push(l.i);c&&void 0!==e.name?t.push(a.HEAD_2):t.push(-1===s?a.HEAD_NEG_1:0===s?a.HEAD_0:a.HEAD_1);"invocation"!==e.type&&"patron"!==e.type||void 0===e.subclass||t.push(l.j);return t.length>0?`class="${t.join(" ")}"`:""}(),h=function(){let t="";if("invocation"===e.type||"patron"===e.type){const s=e.source?`title="Source: ${r.a.sourceJsonToFull(e.source)}"`:"";t=void 0!==e.subclass?`${l.f}="${e.subclass.name}" ${l.g}="${e.subclass.source}" ${s}`:`${l.f}="${a.DATA_NONE}" ${l.g}="${a.DATA_NONE}" ${s}`}return t}(),u=e.prerequisite?`<span class="prerequisite">Prerequisite: ${e.prerequisite}</span>`:"",m=void 0!==e.name?`<span class="stat-name">${e.name}${Object(n.isNonstandardSource)(e.source)?" (UA)":""}${c?".":""}</span> `:"";if(e.entries||e.name){if(t.push(`<${o.wrapperTag} ${h} ${d}>${m}${u}`),e.entries)for(let s=0;s<e.entries.length;s++)o.recursiveEntryRender(e.entries[s],t,p,"<p>","</p>");t.push(`</${o.wrapperTag}>`)}}function u(o){const i=function(){let t,s,n=0,l=!1;const r=[];let a="";for(let o=0;o<e.length;++o)switch(t=e.charAt(o),s=o<e.length-1?e.charAt(o+1):null,t){case"{":"@"===s?n++>0?a+=t:(r.push(a),l=!1,a=""):a+=t;break;case"}":0==--n?(r.push(a),a=""):a+=t;break;default:a+=t}a.length>0&&r.push(a);return r}();for(let e=0;e<i.length;e++){const p=i[e];if(null!=p&&""!==p)if("@"===p.charAt(0)){const[e,i]=[(c=p).substr(0,c.indexOf(" ")),c.substr(c.indexOf(" ")+1)];if("@bold"===e||"@b"===e||"@italic"===e||"@i"===e||"@skill"===e||"@action"===e)switch(e){case"@b":case"@bold":t.push("<b>"),o.recursiveEntryRender(i,t,s),t.push("</b>");break;case"@i":case"@italic":t.push("<i>"),o.recursiveEntryRender(i,t,s),t.push("</i>");break;case"@action":t.push(`<span title="${r.a.actionToExplanation(i)}" class="explanation">${i}</span>`);break;case"@skill":t.push(`<span title="${r.a.skillToExplanation(i)}" class="explanation">${i}</span>`)}else{const[r,c,p,...d]=i.split("|"),h=`${r}${c?`${l.n}${c}`:""}`,u={type:"link",href:{type:"internal",path:"",hash:Object(n.encodeForHash)(h)},text:p||r};switch(e){case"@spell":c||(u.href.hash+=l.n+l.hb),u.href.hash="/spells/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@item":c||(u.href.hash+=l.n+l.T),u.href.hash="/items/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@condition":c||(u.href.hash+=l.n+l.hb),u.href.hash="/conditions/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@class":const e=a.RE_INLINE_CLASS.exec(i);e&&(u.href.hash=e[1].trim(),u.href.subhashes=[{key:"sub",value:e[2].trim()+"~phb"}]),c||(u.href.hash+=l.n+l.hb),u.href.hash="/classes/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@creature":c||(u.href.hash+=l.n+l.cb),u.href.hash="/bestiary/"+u.href.hash,o.recursiveEntryRender(u,t,s);break;case"@filter":t.push(r);break;case"@damage":case"@dice":case"@book":t.push(r);break;case"@5etools":c.indexOf(".")>-1?u.href.hash="/"+c.substring(0,c.indexOf(".")):u.href.hash="/"+c,o.recursiveEntryRender(u,t,s)}}}else t.push(p)}var c}c&&d()}}a.getEntryDice=function(e){let t;if(e.number&&e.faces)t=String(e.number)+"d"+e.faces;else if(e.toRoll&&e.toRoll.length){for(let s of e.toRoll)t=String(s.number)+"d"+s.faces+" + ";t=t.substring(0,t.length-3)}return"undefined"!=typeof droll&&!0===e.rollable?`<span class='roller unselectable' onclick="if (this.rolled) { this.innerHTML = this.innerHTML.split('=')[0].trim()+' = '+droll.roll('${t}').total; } else { this.rolled = true; this.innerHTML += ' = '+droll.roll('${t}').total; }">${t}</span>`:t},a.RE_INLINE_CLASS=/(.*?) \((.*?)\)/,a.HEAD_NEG_1="statsBlockSectionHead",a.HEAD_0="statsBlockHead",a.HEAD_1="statsBlockSubHead",a.HEAD_2="statsInlineHead",a.DATA_NONE="data-none",t.a=a},108:function(e,t,s){"use strict";s.r(t),s.d(t,"renderSelection",(function(){return a})),s.d(t,"spellHtml",(function(){return o}));var n=s(104),l=s(5);const r=new n.a;function a(e,t){t.querySelector(".selection-wrapper").innerHTML='\n\t<div class="stats-wrapper margin-bottom_large">\n\t</div>';const s=o(e);t.querySelector(".stats-wrapper").innerHTML=s}function o(e){const t=[];if(t.push(`<div class="margin-bottom_med"><span class="stats-source source${e.source}" title="${l.a.sourceJsonToFull(e.source)}">${l.a.sourceJsonToAbv(e.source)}</div>`),t.push(`<div class="margin-bottom_med"><span>${l.a.spLevelSchoolMetaToFull(e.level,e.school,e.meta)}</span></div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${l.a.spTimeListToFull(e.time)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${l.a.spRangeToFull(e.range)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${l.a.spComponentsToFull(e.components)}</div>`),t.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${l.a.spDurationToFull(e.duration)}</div>`),t.push("<div class='text'>"),r.recursiveEntryRender({type:"entries",entries:e.entries},t,1),e.entriesHigherLevel){const s={type:"entries",entries:e.entriesHigherLevel};r.recursiveEntryRender(s,t,2)}if(t.push("</div>"),t.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${l.a.spMainClassesToFull(e.classes)}</div>`),e.classes.fromSubclass){const s=l.a.spSubclassesToCurrentAndLegacyFull(e.classes);t.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${s[0]}</div>`),s[1]&&t.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${s[1]}</div>`)}return e.scrollNote&&(t.push('<div class="mdc-theme--text-disabled-on-background">'),r.recursiveEntryRender("{@italic Note: Both the {@class Fighter (Eldritch Knight)} and the {@class Rogue (Arcane Trickster)} spell lists include all {@class Wizard} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}",t,2),t.push("</div>")),t.join("")}},119:function(e,t,s){"use strict";s.r(t);var n=s(7),l=(s(117),s(44),s(36),s(13));const r=l.a`<dom-module id="lumo-grid-tree-toggle" theme-for="vaadin-grid-tree-toggle">
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
</dom-module>`;document.head.appendChild(r.content);s(30);var a=s(15),o=s(20),i=s(41),c=s(10);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const p=document.createElement("template");p.innerHTML="<custom-style>\n  <style>\n    @font-face {\n      font-family: \"vaadin-grid-tree-icons\";\n      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQkAA0AAAAABrwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAECAAAABoAAAAcgHwa6EdERUYAAAPsAAAAHAAAAB4AJwAOT1MvMgAAAZQAAAA/AAAAYA8TBIJjbWFwAAAB8AAAAFUAAAFeGJvXWmdhc3AAAAPkAAAACAAAAAgAAAAQZ2x5ZgAAAlwAAABLAAAAhIrPOhFoZWFkAAABMAAAACsAAAA2DsJI02hoZWEAAAFcAAAAHQAAACQHAgPHaG10eAAAAdQAAAAZAAAAHAxVAgBsb2NhAAACSAAAABIAAAASAIAAVG1heHAAAAF8AAAAGAAAACAACgAFbmFtZQAAAqgAAAECAAACTwflzbdwb3N0AAADrAAAADYAAABZQ7Ajh3icY2BkYGAA4twv3Vfi+W2+MnCzMIDANSOmbGSa2YEZRHEwMIEoAAoiB6sAeJxjYGRgYD7w/wADAwsDCDA7MDAyoAI2AFEEAtIAAAB4nGNgZGBg4GBgZgDRDAxMDGgAAAGbABB4nGNgZp7JOIGBlYGBaSbTGQYGhn4IzfiawZiRkwEVMAqgCTA4MDA+38d84P8BBgdmIAapQZJVYGAEAGc/C54AeJxjYYAAxlAIzQTELAwMBxgZGB0ACy0BYwAAAHicY2BgYGaAYBkGRgYQiADyGMF8FgYbIM3FwMHABISMDArP9/3/+/8/WJXC8z0Q9v8nEp5gHVwMMMAIMo+RDYiZoQJMQIKJARUA7WBhGN4AACFKDtoAAAAAAAAAAAgACAAQABgAJgA0AEIAAHichYvBEYBADAKBVHBjBT4swl9KS2k05o0XHd/yW1hAfBFwCv9sIlJu3nZaNS3PXAaXXHI8Lge7DlzF7C1RgXc7xkK6+gvcD2URmQB4nK2RQWoCMRiFX3RUqtCli65yADModOMBLLgQSqHddRFnQghIAnEUvEA3vUUP0LP0Fj1G+yb8R5iEhO9/ef/7FwFwj28o9EthiVp4hBlehcfUP4Ur8o/wBAv8CU+xVFvhOR7UB7tUdUdlVRJ6HnHWTnhM/V24In8JT5j/KzzFSi2E53hUz7jCcrcIiDDwyKSW1JEct2HdIPH1DFytbUM0PofWdNk5E5oUqb/Q6HHBiVGZpfOXkyUMEj5IyBuNmYZQjBobfsuassvnkKLe1OuBBj0VQ8cRni2xjLWsHaM0jrjx3peYA0/vrdmUYqe9iy7bzrX6eNP7Jh1SijX+AaUVbB8AAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSruZMzlHaB0q4A76kLlwAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKxJigiD6mhFTNowGACmcA/8AAA==) format('woff');\n      font-weight: normal;\n      font-style: normal;\n    }\n  </style>\n</custom-style>",document.head.appendChild(p.content);class d extends(Object(o.a)(Object(i.a)(n.a))){static get template(){return l.a`
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
`}static get is(){return"vaadin-grid-tree-toggle"}static get properties(){return{level:{type:Number,value:0,observer:"_levelChanged"},leaf:{type:Boolean,value:!1,reflectToAttribute:!0},expanded:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0}}}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e))}_onClick(e){this.leaf||(e.preventDefault(),this.expanded=!this.expanded)}_levelChanged(e){const t=Number(e).toString();this.style["---level"]=t,this._debouncerUpdateLevel=a.a.debounce(this._debouncerUpdateLevel,c.c,()=>this.updateStyles({"---level":t}))}}customElements.define(d.is,d);var h=s(18),u=s(39),m=s(108),g=s(2),A=s(5);s(111),s(110);class f extends n.a{static get properties(){return{spellsKnown:{type:Object,value:{}},preparedSpells:{type:Object,value:{}},heightByRows:{type:Boolean,value:()=>window.innerWidth<900}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.refresh=!0,this.updateFromCharacter(Object(h.s)()),Object(h.i)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(h.i)().removeEventListener("character-selected",this.characterChangeHandler)}ready(){super.ready(),setTimeout(()=>{this.$.grid.dataProvider=((e,t)=>{const s=e.page*e.pageSize,n=e.parentItem?e.parentItem.children:this.spellDisplay;if(n&&n.length){t(n.slice(s,s+e.pageSize),n.length)}}).bind(this)},0)}async updateFromCharacter(e){const t=Date.now();if(e&&this.refresh){const t=await Object(h.l)(e),s=Object(h.k)(e),n=[],l=[],r={};for(const[a,o]of Object.entries(s)){const s=t[a];if(s.casterProgression){let t,i,c,p,d="known";if(s.classTableGroups.forEach(e=>{if(e.colLabels&&e.colLabels.length){const s=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spells known")>-1);s>-1&&e.rows&&e.rows.length>o-1&&(t=e.rows[o][s]);const n=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("cantrips known")>-1);n>-1&&e.rows&&e.rows.length>o-1&&(i=e.rows[o][n]);const l=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("slot level")>-1);if(l>-1&&e.rows&&e.rows.length>o-1){const t=e.rows[o][l].match(/(\d+)/g);t&&t.length&&(c=parseInt(t[0]))}const r=e.colLabels.findIndex(e=>e.toLowerCase().indexOf("spell slots")>-1);r>-1&&e.rows&&e.rows.length>o-1&&(p=e.rows[o][r])}}),void 0===t){d="prepared";const e="full"===s.casterProgression?1:.5,n=await Object(h.d)(s.spellcastingAbility);t=Math.floor(o*e)+n,t=t<1?1:t}let m=await Object(u.a)("spells",{key:"classes.fromClassList",value:{name:a,source:s.source}});const g=Object(h.w)(s);if(o>=g){const t=e.subclasses&&e.subclasses[a]?e.subclasses[a].shortName:"";if(t){let e=await Object(u.a)("spells",{key:"classes.fromSubclass",value:{"subclass.name":t,"class.name":a,"class.source":s.source}});e.forEach(e=>{e.isSubclassSpell=!0}),m=[...new Set(m.concat(e))]}}const A=s.classTableGroups.find(e=>"Spell Slots per Spell Level"===e.title);let f;if(A)f=A.rows[o-1].filter(e=>0!==e);else{f=[];for(let e=0;e<c;e++)e===c-1?f.push(p):f.push(0)}const b=i?0:1;i&&(f=[0].concat(f));let v=JSON.parse(JSON.stringify(e.preparedSpells));e.preparedSpells[a]={};const w=f.map((t,s)=>{if(-1!==t){let n=m.filter(e=>e.level===s+b).sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0).map(t=>(Object(h.y)(a,t,v)&&(e.preparedSpells[a][t.name]={name:t.name,source:t.source}),{id:"spell",name:t.name,children:[{...t,hasChildren:!1,id:"spelldef",parentClass:a,parentLevel:s+b}],hasChildren:!0,parentClass:a,parentLevel:s+b,isCantrip:s+b===0,isSubclassSpell:t.isSubclassSpell,isWarlock:!!c}));return{id:"level",level:s+b,spellSlots:t,currentSlots:Object(h.u)(a,s+b),children:n,hasChildren:n.length>0,parentClass:a}}return null}).filter(e=>null!==e);if(r[a]={current:e.preparedSpells&&e.preparedSpells[a]?Object.keys(e.preparedSpells[a]):[],max:t,type:d,maxCantrips:i,currentCantrips:e.preparedCantrips&&e.preparedCantrips[a]?Object.keys(e.preparedCantrips[a]):[]},w.length){const e={id:"class",className:a,level:o,children:w,spellsKnown:t,hasChildren:w.length>0,spellPrepType:d};l.push(e),n.push(e)}}}this.refresh=!1,Object(h.C)(e),this.spellsKnown=r,this.spellDisplay=n,this.expandedItems=l,this.$.grid.clearCache()}const s=Date.now();console.error("Spells Tab: "+(s-t))}_renderSpell(e){return Object(m.spellHtml)(e)}_toggleSpellPrepared(e){e.preventDefault(),e.stopPropagation();if(!e.model.item.isSubclassSpell){if(e.model.item.isCantrip)this._toggleCantripPrepared(e);else{const t=e.model.item.parentClass,s=e.model.item.children[0],n=this._isPreparedSpell(this.spellsKnown,t,s.name),l=this._currentSpellsKnownCount(t,this.spellsKnown),r=this._maxSpellsKnownCount(t,this.spellsKnown);if((n||l<r)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(n){const n=e[t].current.indexOf(s.name);e[t].current.splice(n,1)}else e[t].current.push(s.name);this.spellsKnown=e,Object(h.O)(t,s)}else l>=r&&this._flashPreparedButton(Object(g.findInPath)("button",e.path))}}}_toggleCantripPrepared(e){e.preventDefault(),e.stopPropagation();const t=e.model.item.parentClass,s=e.model.item.children[0],n=this._isPreparedCantrip(this.spellsKnown,t,s.name),l=this._currentCantripsKnownCount(t,this.spellsKnown),r=this._maxCantripsKnownCount(t,this.spellsKnown);if((n||l<r)&&"spelldef"===s.id){let e=JSON.parse(JSON.stringify(this.spellsKnown));if(n){const n=e[t].currentCantrips.indexOf(s.name);e[t].currentCantrips.splice(n,1)}else e[t].currentCantrips.push(s.name);this.spellsKnown=e,Object(h.N)(t,s)}else l>=r&&this._flashPreparedButton(Object(g.findInPath)("button",e.path))}_flashPreparedButton(e){e&&(e.classList.add("transition-bg"),e.classList.add("flash-error"),setTimeout(()=>{e.classList.remove("flash-error"),setTimeout(()=>{e.classList.remove("transition-bg")},200)},200))}_toggleSpellSlot(e){e.preventDefault(),e.stopPropagation();const t=Object(g.findInPath)("vaadin-checkbox",e.path),s=e.model.item.currentSlots,n=e.model.item.spellSlots,l=e.model.item.className,r=e.model.item.level;if(t){!!t.checked&&s<n?e.model.item.currentSlots=s+1:s>0&&(e.model.item.currentSlots=s-1)}else s<n?e.model.item.currentSlots=s+1:s>0&&(e.model.item.currentSlots=s-1);this._setSpellSlotsChecked(e.model.item.currentSlots,Object(g.findInPath)(".slot-checkboxes",e.path)),Object(h.L)(l,r,e.model.item.currentSlots)}_setSpellSlotsChecked(e,t){const s=t.querySelectorAll("vaadin-checkbox");for(let t=0;t<s.length;t++)s[t].checked=t<e}_preventDefault(e){e.preventDefault()}_isPreparedClass(e,t){const s=t.parentClass,n=t.name,l=t.isCantrip,r=t.isSubclassSpell;if(r)return"spell-button always-prepared";return(l?this._isPreparedCantrip(e,s,n):this._isPreparedSpell(e,s,n,r))?"spell-prepared spell-button":"spell-button"}_isPreparedSpell(e,t,s,n){return n||e[t]&&e[t].current&&e[t].current.length&&e[t].current.indexOf(s)>-1}_isPreparedCantrip(e,t,s){return e[t]&&e[t].currentCantrips&&e[t].currentCantrips.length&&e[t].currentCantrips.indexOf(s)>-1}_isPreparedText(e,t){const s=t.parentClass,n=t.name,l=t.isCantrip,r=t.isSubclassSpell,a=e[s].type;if(r)return"Always";return(l?this._isPreparedCantrip(e,s,n):this._isPreparedSpell(e,s,n,r))?"known"===a?"Learned":"Prepared":"known"===a?"Learn":"Prepare"}_countToArray(e){const t=[];for(var s=0;s<e;s++)t.push(null);return t}_toLevel(e){return 0===e?A.a.spLevelToFull(e)+"s":A.a.spLevelToFull(e)+" Level"}_currentSpellsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].current.length:0}_maxSpellsKnownCount(e,t){return t&&e&&t[e]?t[e].max:0}_currentCantripsKnownCount(e,t){return t&&e&&t[e]&&t[e].current?t[e].currentCantrips.length:0}_maxCantripsKnownCount(e,t){return t&&e&&t[e]?t[e].maxCantrips:0}_spellsKnownString(e){return"Spells "+Object(g.util_capitalize)(e)+":"}_isRitualSpell(e){const t=e.children[0];return t&&t.meta&&t.meta.ritual}_isConcentrationSpell(e){return e.children[0].duration.some(e=>e.concentration)}_spellLevel(e){if(e&&e.children&&e.children.length&&e.children[0].level)return A.a.spLevelToFull(e.children[0].level)}_isEmpty(e){return!e||!e.length}_isTruthy(e){return!!e}_equal(e,t){return e===t}static get template(){return n.b`
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

        .spell-button {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          width: 60px;
          display: inline-flex;
          justify-content: center;
          white-space: normal;
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
                    <div class="slot-checkboxes" hidden$="[[!_isTruthy(item.spellSlots)]]" on-click="_toggleSpellSlot">
                      <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]'>
                        <vaadin-checkbox on-click="_preventDefault"></vaadin-checkbox>
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
                    <button class$="[[_isPreparedClass(spellsKnown, item)]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
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
    `}}customElements.define("dnd-character-builder-spells",f)}}]);
//# sourceMappingURL=5.bundle.js.map