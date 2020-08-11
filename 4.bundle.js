(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{107:function(t,e,i){"use strict";var a=i(7),s=i(18),n=i(2),l=(i(76),i(39));class d extends a.a{static get properties(){return{test:{type:Boolean,reflectToAttribute:!0,value:!1},options:{type:Array,observer:"optionsUpdated"},model:{type:String},addCallback:{type:Function},value:{type:String,value:"",observer:"valueUpdated"},choices:{type:Number,observer:"choicesUpdated"},label:{type:String},placeholder:{type:String},multiValue:{type:String,value:""}}}choicesUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}optionsUpdated(){this.listBox&&(this.listBox.remove(),delete this.listBox),this.$.select.render()}valueUpdated(){if(this.choices)if(this.value&&this.options){const t=this.value.map(t=>this.options.indexOf(t)).filter(t=>-1!==t);this.listBox&&(this.listBox.selectedValues=t),this.multiValue=t.map(t=>Object(n.util_capitalizeAll)(this.options[t])).join(", ")}else this.listBox&&(this.listBox.selectedValues=[]),this.multiValue="";else this.value&&this.options?this.$.select.value=this.options.findIndex(t=>t.name===this.value||t===this.value)+"":this.$.select.value=""}ready(){super.ready(),setTimeout(async()=>{this.model&&(this.options=await Object(l.a)(this.model)),this.$.select.renderer=(t,e)=>{if(!this.listBox){if(this.listBox=document.createElement("vaadin-list-box"),this.choices&&(this.listBox.setAttribute("multiple",!0),this.listBox.addEventListener("click",t=>{e.opened=!0;let i=null!==t.srcElement.getAttribute("selected");setTimeout(()=>{this.listBox.selectedValues.length>this.choices&&!i&&this.listBox.selectedValues.splice(this.listBox.selectedValues.length-2,1);let t=this.listBox.selectedValues.map(t=>this.options[t]);this.multiValue=t.map(t=>Object(n.util_capitalizeAll)(t)).join(", "),this.addCallback&&this.addCallback(t)},0)})),this.options&&this.options.length)for(let t=0;t<this.options.length;t++){const e=this.options[t],i=document.createElement("vaadin-item");e.name?(i.textContent=e.name,i.setAttribute("value",t)):(i.textContent=Object(n.util_capitalizeAll)(e),i.setAttribute("value",t)),this.listBox.appendChild(i)}t.appendChild(this.listBox),this.$.select._assignMenuElement(),this.valueUpdated()}}},0)}connectedCallback(){super.connectedCallback(),this.selectChangeHandler=()=>{const t=this.$.select.value;if(t&&!this.choices){const e=this.options[t];this.addCallback?this.addCallback(e,this.model):Object(s.t)(void 0,e,this.model),this.value||(this.$.select.value="")}},this.$.select.addEventListener("change",this.selectChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),this.$.select.removeEventListener("change",this.selectChangeHandler)}_exists(t){return!!t}static get template(){return a.b`
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
    `}}customElements.define("dnd-select-add",d)},113:function(t,e,i){"use strict";i.r(e);var a=i(7);i(50),i(49),i(70);const s=i(13).a`<dom-module id="lumo-number-field" theme-for="vaadin-number-field">
  <template>
    <style include="lumo-field-button">
      :host {
        width: 8em;
      }

      :host([has-controls]:not([theme~="align-right"])) [part="value"] {
        text-align: center;
      }

      [part="decrease-button"][disabled],
      [part="increase-button"][disabled] {
        opacity: 0.2;
      }

      :host([has-controls]) [part="input-field"] {
        padding: 0;
      }

      [part="decrease-button"],
      [part="increase-button"] {
        cursor: pointer;
        font-size: var(--lumo-icon-size-s);
        width: 1.6em;
        height: 1.6em;
      }

      [part="decrease-button"]::before,
      [part="increase-button"]::before {
        margin-top: 0.2em;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="value"],
      :host([dir="rtl"]) [part="input-field"] ::slotted(input) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(s.content);i(78),i(30);var n=i(65),l=i(19);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const d=document.createElement("template");let r;d.innerHTML='<dom-module id="vaadin-number-field-template">\n  <template>\n    <style>\n      :host([readonly]) [part$="button"] {\n        pointer-events: none;\n      }\n\n      [part="decrease-button"]::before {\n        content: "−";\n      }\n\n      [part="increase-button"]::before {\n        content: "+";\n      }\n\n      [part="decrease-button"],\n      [part="increase-button"] {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      /* Hide the native arrow icons */\n      [part="value"]::-webkit-outer-spin-button,\n      [part="value"]::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      [part="value"] {\n        /* Older Firefox versions (v47.0) requires !important */\n        -moz-appearance: textfield !important;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] {\n        direction: ltr;\n      }\n\n      :host([dir="rtl"]) [part="value"]::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        direction: rtl;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n        text-align: left;\n      }\n\n      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n        text-align: left;\n      }\n    </style>\n\n    <div disabled$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n\n    <div disabled$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden$="[[!hasControls]]">\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(d.content);class o extends n.a{static get is(){return"vaadin-number-field"}static get version(){return"2.6.2"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(t){t.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(t){t.preventDefault(),this._increaseValue()}static get template(){if(!r){r=super.template.cloneNode(!0);const t=l.a.import(this.is+"-template","template"),e=t.content.querySelector('[part="decrease-button"]'),i=t.content.querySelector('[part="increase-button"]'),a=t.content.querySelector("style"),s=r.content.querySelector('[part="input-field"]'),n=r.content.querySelector('[name="prefix"]');s.insertBefore(e,n),s.appendChild(i),r.content.appendChild(a)}return r}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(t,e,i,a,s,n,l){if(!this.invalid)return;const d=t=>!t&&0!==t;d(s)&&d(n)?super._constraintsChanged(t,e,i,a):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(t){if(this.disabled||this.readonly)return;let e=parseFloat(this.value);this.value?e<this.min?(t=0,e=this.min):e>this.max&&(t=0,e=this.max):0==this.min&&t<0||0==this.max&&t>0||0==this.max&&0==this.min?(t=0,e=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?e=0:this.min>0?(e=this.min,this.max<0&&t<0&&(e=this.max),t=0):this.max<0&&(e=this.max,t<0?t=0:this._getIncrement(1,e-this.step)>this.max?e-=2*this.step:e-=this.step);const i=this._getIncrement(t,e);this.value&&0!=t&&!this._incrementIsInsideTheLimits(t,e)||this._setValue(i)}_setValue(t){this.value=this.inputElement.value=String(parseFloat(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(t,e){let i=this.step||1,a=this.min||0;const s=Math.max(this._getMultiplier(e),this._getMultiplier(i),this._getMultiplier(a));i*=s,a*=s;const n=((e=Math.round(e*s))-a)%i;return t>0?(e-n+i)/s:t<0?(e-(n||i))/s:e/s}_getDecimalCount(t){const e=String(t),i=e.indexOf(".");return-1===i?1:e.length-i-1}_getMultiplier(t){if(!isNaN(t))return Math.pow(10,this._getDecimalCount(t))}_incrementIsInsideTheLimits(t,e){return t<0?null==this.min||this._getIncrement(t,e)>=this.min:t>0?null==this.max||this._getIncrement(t,e)<=this.max:this._getIncrement(t,e)<=this.max&&this._getIncrement(t,e)>=this.min}_allowed(t){const e=t*(this.step||1),i=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(e,i)}_stepChanged(t){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?t:"any",this.__stepChangedCalled=!0,this.setAttribute("step",t)}_minChanged(t){this.inputElement.min=t}_maxChanged(t){this.inputElement.max=t}_valueChanged(t,e){t&&isNaN(parseFloat(t))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,e)}_onKeyDown(t){38==t.keyCode?(t.preventDefault(),this._increaseValue()):40==t.keyCode&&(t.preventDefault(),this._decreaseValue()),super._onKeyDown(t)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(o.is,o);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const c=document.createElement("template");c.innerHTML='<dom-module id="vaadin-integer-field-template">\n\n  \n</dom-module>',document.head.appendChild(c.content);class h extends o{static get is(){return"vaadin-integer-field"}static get version(){return"2.6.2"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(t,e){if(""!==t&&!this.__isInteger(t))return console.warn(`Trying to set non-integer value "${t}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(t,e)}_stepChanged(t,e){if(!this.__hasOnlyDigits(t))return console.warn(`Trying to set invalid step size "${t}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(t,e)}__isInteger(t){return/^(-\d)?\d*$/.test(String(t))}__hasOnlyDigits(t){return/^\d*$/.test(String(t))}}window.customElements.define(h.is,h);i(107);var u=i(18),p=i(2);class v extends a.a{static get properties(){return{str:{type:Number},dex:{type:Number},con:{type:Number},int:{type:Number},wis:{type:Number},cha:{type:Number},strAdj:{type:Number,value:0},dexAdj:{type:Number,value:0},conAdj:{type:Number,value:0},intAdj:{type:Number,value:0},wisAdj:{type:Number,value:0},chaAdj:{type:Number,value:0},saves:{type:Array,value:[]},classSkillProfOptions:{type:Object,value:{}},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""},strProfs:{type:String,value:""},dexProfs:{type:String,value:""},intProfs:{type:String,value:""},wisProfs:{type:String,value:""},chaProfs:{type:String,value:""}}}static get observers(){return["updateCharAttr(str, dex, con, int, wis, cha)"]}updateCharAttr(t,e,i,a,s,n){t&&e&&i&&a&&s&&n&&Object(u.D)({str:t,dex:e,con:i,int:a,wis:s,cha:n})}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=t=>{let e=t.detail.character;this.updateAttributesFromCharacter(e)},this.updateAttributesFromCharacter(Object(u.p)()),Object(u.g)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(u.g)().removeEventListener("character-selected",this.characterChangeHandler)}async updateAttributesFromCharacter(t){if(t&&t.attr){const e=t.attr;e.str===this.str&&e.dex===this.dex&&e.con===this.con&&e.int===this.int&&e.wis===this.wis&&e.cha===this.cha||this.setProperties({str:t.attr.str,dex:t.attr.dex,con:t.attr.con,int:t.attr.int,wis:t.attr.wis,cha:t.attr.cha}),this.saves=await Object(u.i)(),this.classSkillProfOptions=await Object(u.j)(),this.classSkillProfSelections=t.classSkillProficiencies;let i={str:0,dex:0,con:0,int:0,wis:0,cha:0},a=await Object(u.o)();a&&a.choose?(this.raceAttributeOptions=a.choose.from.map(t=>t.toUpperCase()),this.raceAttributeChoices=a.choose.count||1,this.raceAttributeSelections=t.raceAttributes,t.raceAttributes.forEach(t=>{i[t.toLowerCase()]++})):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let s=await Object(u.n)(a);this.defaultRaceAttribute=s.map(t=>{let e=t[0].toLowerCase(),a=t[1];return i[e]+=a,e.toUpperCase()+" "+Object(p.absInt)(a)}).join(", ");let n=await Object(u.c)();for(let t of n)t.featSelections&&(i[t.featSelections.toLowerCase()]+=1),t.featAttribute&&Object.entries(t.featAttribute).filter(t=>"choose"!==t[0]).forEach(t=>{let e=t[0].toLowerCase(),a=t[1];i[e]+=a}),t.asiAttributes&&Object.entries(t.asiAttributes).forEach(t=>{let e=t[0].toLowerCase(),a=t[1];i[e]+=a});this.strAdj=i.str,this.dexAdj=i.dex,this.conAdj=i.con,this.intAdj=i.int,this.wisAdj=i.wis,this.chaAdj=i.cha;let l=await Object(u.q)("str");this.strProfs=l.map(t=>Object(p.util_capitalizeAll)(t)).join(", ");let d=await Object(u.q)("dex");this.dexProfs=d.map(t=>Object(p.util_capitalizeAll)(t)).join(", ");let r=await Object(u.q)("int");this.intProfs=r.map(t=>Object(p.util_capitalizeAll)(t)).join(", ");let o=await Object(u.q)("wis");this.wisProfs=o.map(t=>Object(p.util_capitalizeAll)(t)).join(", ");let c=await Object(u.q)("cha");this.chaProfs=c.map(t=>Object(p.util_capitalizeAll)(t)).join(", ")}}_adjustString(t){return 0!==t&&void 0!==t?Object(p.absInt)(t):""}_total(t,e){let i=parseInt(t),a=parseInt(e);return i=isNaN(i)?0:i,a=isNaN(a)?0:a,i+a}_mod(t,e){return Object(p.absInt)(Math.floor((this._total(t,e)-10)/2))}_contains(t,e){return t.indexOf(e)>-1}_exists(){for(let t of arguments)if(t&&(t.constructor!==Object||Object.entries(t).length>0)&&(!Array.isArray(t)||t.length>0))return!0;return!1}_classSkillAddCallback(t){Object(u.A)(t)}_backgroundSkillAddCallback(t){Object(u.y)(t)}_raceAttributeAddCallback(t){Object(u.C)(t)}static get template(){return a.b`
      <style include="material-styles">
        :host {
          display: block;
          padding: 14px;
        }
        .prof-choice-wrap {
          display: flex;
          flex-direction: column;
          width: 100%;
          justify-content: space-between;
        }
        .prof-choice-wrap dnd-select-add {
          width: 100%;
        }

        .prof-choice-wrap > div {
          margin-bottom: 24px;
        }

        .default-selection {
          font-style: italic;
        }

        .table-wrap {
          display: flex;
          flex-wrap: wrap;
        }
        .stats {
          width: 100%;
          margin-top: 32px;
        }

        .row {
          height: 92px;
        }

        .data {
          margin-top: 32px;
          font-size: 18px;
          padding: 10px 8px 8px;
          display: flex;
          justify-content: center;
        }

        .mod {
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          width: 32px;
          margin: 32px auto 0;
        }

        .prof {
          justify-content: flex-start;
        }

        .mobile-label .data {
          justify-content: flex-start;
        }

        vaadin-integer-field {
          width: 100px;
        }
        
        .save {
          width: 24px;
        }

        .save-icon {
          width: 24px;
        }

        [hidden] {
          visibility: hidden;
        }

        @media(min-width: 921px) {
          .stats {
            width: 50%;
          }
          .mobile-label {
            display: none;
          }
          .attr-choice-wrap,
          .prof-choice-wrap {
            flex-direction: row;
          }
        }
      </style>
  
      <div class="prof-choice-wrap">
        <div>
          <div hidden$="[[_exists(classSkillProfOptions)]]">Select 1st Level to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(classSkillProfOptions)]]">Skill Proficiencies from Class</div>
          <dnd-select-add hidden$="[[!_exists(classSkillProfOptions)]]" choices="[[classSkillProfOptions.count]]" placeholder="<Choose Skills>"
            options="[[classSkillProfOptions.from]]" value="[[classSkillProfSelections]]" add-callback="[[_classSkillAddCallback]]"></dnd-select-add>
        </div>
      </div>

      <div class="table-wrap">
        <table class="stats">
          <thead>
            <tr>
              <th></th>
              <th>Adjust.</th>
              <th>Total</th>
              <th>Mod.</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td><vaadin-integer-field value={{str}} min="1" max="20" has-controls label="Strength"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(strAdj)]]</div></td>
              <td><div class="total data">[[_total(strAdj, str)]]</div></td>
              <td><div class="mod data">[[_mod(strAdj, str)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{dex}} min="1" max="20" has-controls label="Dexterity"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(dexAdj)]]</div></td>
              <td><div class="total data">[[_total(dexAdj, dex)]]</div></td>
              <td><div class="mod data">[[_mod(dexAdj, dex)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{con}} min="1" max="20" has-controls label="Constitution"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(conAdj)]]</div></td>
              <td><div class="total data">[[_total(conAdj, con)]]</div></td>
              <td><div class="mod data">[[_mod(conAdj, con)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{int}} min="1" max="20" has-controls label="Intellegence"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(intAdj)]]</div></td>
              <td><div class="total data">[[_total(intAdj, int)]]</div></td>
              <td><div class="mod data">[[_mod(intAdj, int)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{wis}} min="1" max="20" has-controls label="Wisdom"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(wisAdj)]]</div></td>
              <td><div class="total data">[[_total(wisAdj, wis)]]</div></td>
              <td><div class="mod data">[[_mod(wisAdj, wis)]]</div></td>
            </tr>
            <tr class="row">
              <td><vaadin-integer-field value={{cha}} min="1" max="20" has-controls label="Charisma"></vaadin-integer-field></td>
              <td><div class="adj data">[[_adjustString(chaAdj)]]</div></td>
              <td><div class="total data">[[_total(chaAdj, cha)]]</div></td>
              <td><div class="mod data">[[_mod(chaAdj, cha)]]</div></td>
            </tr>
          </tbody>
        </table>

        <table class="stats">
          <thead>
            <tr>
              <th class="mobile-label">Attribute</th>
              <th><div class="save">Save</div></th>
              <th><div class="prof">Proficiencies</div></th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td class="mobile-label"><div class="data">STR</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'str')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[strProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">DEX</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'dex')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[dexProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">CON</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'con')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">INT</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'int')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[intProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">WIS</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'wis')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[wisProfs]]</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">CHA</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'cha')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">[[chaProfs]]</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `}}customElements.define("dnd-character-builder-attributes",v)}}]);
//# sourceMappingURL=4.bundle.js.map