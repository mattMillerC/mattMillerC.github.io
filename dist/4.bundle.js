(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{111:function(t,e,a){"use strict";a.r(e);var i=a(7),s=(a(48),a(47),a(70),a(13));const n=s.a`<dom-module id="lumo-number-field" theme-for="vaadin-number-field">
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
</dom-module>`;document.head.appendChild(n.content);a(78),a(30);var d=a(64),r=a(19);
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const l=s.a`<dom-module id="vaadin-number-field-template">
  <template>
    <style>
      :host([readonly]) [part\$="button"] {
        pointer-events: none;
      }

      [part="decrease-button"]::before {
        content: "−";
      }

      [part="increase-button"]::before {
        content: "+";
      }

      [part="decrease-button"],
      [part="increase-button"] {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Hide the native arrow icons */
      [part="value"]::-webkit-outer-spin-button,
      [part="value"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      [part="value"] {
        /* Older Firefox versions (v47.0) requires !important */
        -moz-appearance: textfield !important;
      }

      :host([dir="rtl"]) [part="input-field"] {
        direction: ltr;
      }

      :host([dir="rtl"]) [part="value"]::placeholder {
        direction: rtl;
      }

      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {
        direction: rtl;
      }

      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,
      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {
        direction: rtl;
      }

      :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {
        text-align: left;
      }

      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {
        text-align: left;
      }

      :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,
      :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {
        text-align: left;
      }
    </style>

    <div disabled\$="[[!_allowed(-1, value, min, max, step)]]" part="decrease-button" on-click="_decreaseValue" on-touchend="_decreaseButtonTouchend" hidden\$="[[!hasControls]]">
    </div>

    <div disabled\$="[[!_allowed(1, value, min, max, step)]]" part="increase-button" on-click="_increaseValue" on-touchend="_increaseButtonTouchend" hidden\$="[[!hasControls]]">
    </div>
  </template>

  
</dom-module>`;let o;document.head.appendChild(l.content);class c extends d.a{static get is(){return"vaadin-number-field"}static get version(){return"2.7.0-alpha6"}static get properties(){return{hasControls:{type:Boolean,value:!1,reflectToAttribute:!0},min:{type:Number,reflectToAttribute:!0,observer:"_minChanged"},max:{type:Number,reflectToAttribute:!0,observer:"_maxChanged"},step:{type:Number,value:1,observer:"_stepChanged"}}}ready(){super.ready(),this.__previousValidInput=this.value||"",this.inputElement.type="number",this.inputElement.addEventListener("change",this.__onInputChange.bind(this))}_decreaseButtonTouchend(t){t.preventDefault(),this._decreaseValue()}_increaseButtonTouchend(t){t.preventDefault(),this._increaseValue()}static get template(){if(!o){o=super.template.cloneNode(!0);const t=r.a.import(this.is+"-template","template"),e=t.content.querySelector('[part="decrease-button"]'),a=t.content.querySelector('[part="increase-button"]'),i=t.content.querySelector("style"),s=o.content.querySelector('[part="input-field"]'),n=o.content.querySelector('[name="prefix"]');s.insertBefore(e,n),s.appendChild(a),o.content.appendChild(i)}return o}_createConstraintsObserver(){this._createMethodObserver("_constraintsChanged(required, minlength, maxlength, pattern, min, max, step)")}_constraintsChanged(t,e,a,i,s,n,d){if(!this.invalid)return;const r=t=>!t&&0!==t;r(s)&&r(n)?super._constraintsChanged(t,e,a,i):this.validate()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(t){if(this.disabled||this.readonly)return;let e=parseFloat(this.value);this.value?e<this.min?(t=0,e=this.min):e>this.max&&(t=0,e=this.max):0==this.min&&t<0||0==this.max&&t>0||0==this.max&&0==this.min?(t=0,e=0):(null==this.max||this.max>=0)&&(null==this.min||this.min<=0)?e=0:this.min>0?(e=this.min,this.max<0&&t<0&&(e=this.max),t=0):this.max<0&&(e=this.max,t<0?t=0:this._getIncrement(1,e-this.step)>this.max?e-=2*this.step:e-=this.step);const a=this._getIncrement(t,e);this.value&&0!=t&&!this._incrementIsInsideTheLimits(t,e)||this._setValue(a)}_setValue(t){this.value=this.inputElement.value=String(parseFloat(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_getIncrement(t,e){let a=this.step||1,i=this.min||0;const s=Math.max(this._getMultiplier(e),this._getMultiplier(a),this._getMultiplier(i));a*=s,i*=s;const n=((e=Math.round(e*s))-i)%a;return t>0?(e-n+a)/s:t<0?(e-(n||a))/s:e/s}_getDecimalCount(t){const e=String(t),a=e.indexOf(".");return-1===a?1:e.length-a-1}_getMultiplier(t){if(!isNaN(t))return Math.pow(10,this._getDecimalCount(t))}_incrementIsInsideTheLimits(t,e){return t<0?null==this.min||this._getIncrement(t,e)>=this.min:t>0?null==this.max||this._getIncrement(t,e)<=this.max:this._getIncrement(t,e)<=this.max&&this._getIncrement(t,e)>=this.min}_allowed(t){const e=t*(this.step||1),a=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(e,a)}_stepChanged(t,e){this.__validateByStep=this.__stepChangedCalled||null!==this.getAttribute("step"),this.inputElement.step=this.__validateByStep?t:"any",this.__stepChangedCalled=!0,this.setAttribute("step",t)}_minChanged(t){this.inputElement.min=t}_maxChanged(t){this.inputElement.max=t}_valueChanged(t,e){t&&isNaN(parseFloat(t))?this.value="":"string"!=typeof this.value&&(this.value=String(this.value)),super._valueChanged(this.value,e)}_onKeyDown(t){38==t.keyCode?(t.preventDefault(),this._increaseValue()):40==t.keyCode&&(t.preventDefault(),this._decreaseValue()),super._onKeyDown(t)}__onInputChange(){this.validate()}checkValidity(){return void 0!==this.min||void 0!==this.max||this.__validateByStep?this.inputElement.checkValidity():super.checkValidity()}}window.customElements.define(c.is,c);
/**
@license
Copyright (c) 2019 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const h=s.a`<dom-module id="vaadin-integer-field-template">

  
</dom-module>`;document.head.appendChild(h.content);class u extends c{static get is(){return"vaadin-integer-field"}static get version(){return"2.7.0-alpha6"}static get properties(){return{pattern:String,preventInvalidInput:Boolean,minlength:Number,maxlength:Number}}ready(){super.ready(),this._enabledCharPattern="[-+\\d]"}_valueChanged(t,e){if(""!==t&&!this.__isInteger(t))return console.warn(`Trying to set non-integer value "${t}" to <vaadin-integer-field>. Clearing the value.`),void(this.value="");super._valueChanged(t,e)}_stepChanged(t,e){if(!this.__hasOnlyDigits(t))return console.warn(`Trying to set invalid step size "${t}", which is not a positive integer, to <vaadin-integer-field>. Resetting the default value 1.`),void(this.step=1);super._stepChanged(t,e)}__isInteger(t){return/^(-\d)?\d*$/.test(String(t))}__hasOnlyDigits(t){return/^\d*$/.test(String(t))}}window.customElements.define(u.is,u);var p=a(18);class v extends i.a{static get properties(){return{str:{type:Number},dex:{type:Number},con:{type:Number},int:{type:Number},wis:{type:Number},cha:{type:Number},strAdj:{type:Number,value:0},dexAdj:{type:Number,value:0},conAdj:{type:Number,value:0},intAdj:{type:Number,value:0},wisAdj:{type:Number,value:0},chaAdj:{type:Number,value:0},saves:{type:Array,value:[]}}}static get observers(){return["updateCharAttr(str, dex, con, int, wis, cha)"]}updateCharAttr(t,e,a,i,s,n){t&&e&&a&&i&&s&&n&&Object(p.n)({str:t,dex:e,con:a,int:i,wis:s,cha:n})}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=t=>{let e=t.detail.character;this.updateAttributesFromCharacter(e)},this.updateAttributesFromCharacter(Object(p.i)()),Object(p.d)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(p.d)().removeEventListener("character-selected",this.characterChangeHandler)}async updateAttributesFromCharacter(t){if(t&&t.attr){const e=t.attr;e.str===this.str&&e.dex===this.dex&&e.con===this.con&&e.int===this.int&&e.wis===this.wis&&e.cha===this.cha||this.setProperties({str:t.attr.str,dex:t.attr.dex,con:t.attr.con,int:t.attr.int,wis:t.attr.wis,cha:t.attr.cha}),this.saves=await Object(p.f)()}}_adjustString(t){return 0!==t&&void 0!==t?this._absInt(t):""}_total(t,e){let a=parseInt(t),i=parseInt(e);return a=isNaN(a)?0:a,i=isNaN(i)?0:i,a+i}_mod(t,e){return this._absInt(Math.floor((this._total(t,e)-10)/2))}_absInt(t){return t>0?"+"+t:t}_contains(t,e){return t.indexOf(e)>-1}static get template(){return i.b`
      <style include="material-styles">
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
          padding: 16px;
          display: flex;
          justify-content: center;
        }

        .mod {
          border: 1px solid black;
          border-radius: 4px;
          width: 32px;
          margin: 32px auto 0;
        }

        vaadin-integer-field {
          width: 100px;
        }

        th {
          font-weight: normal;
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
        }
      </style>

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
              <th>Save</th>
              <th>Proficiencies</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td class="mobile-label"><div class="data">Strength</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'str')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data">Athletics</div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Dexterity</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'dex')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Constitution</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'con')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Intellegence</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'int')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Wisdom</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'wis')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
            <tr class="row">
              <td class="mobile-label"><div class="data">Charisma</div></td>
              <td><div class="save data">
                <span hidden$="[[!_contains(saves, 'cha')]]" class="save-icon material-icons">done</span>
              </div></td>
              <td><div class="prof data"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `}}customElements.define("dnd-character-builder-attributes",v)}}]);
//# sourceMappingURL=4.bundle.js.map