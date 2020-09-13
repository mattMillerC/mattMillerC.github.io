(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{107:function(e,l,t){"use strict";
/*! droll v0.2.1  http://github.com/thebinarypenguin/droll */var i={};function d(){this.numDice=0,this.numSides=0,this.modifier=0,this.minResult=0,this.maxResult=0,this.avgResult=0}function r(){this.rolls=[],this.modifier=0,this.total=0}r.prototype.toString=function(){return 1===this.rolls.length&&0===this.modifier?this.rolls[0]+"":1<this.rolls.length&&0===this.modifier?this.rolls.join(" + ")+" = "+this.total:1===this.rolls.length&&0<this.modifier?this.rolls[0]+" + "+this.modifier+" = "+this.total:1<this.rolls.length&&0<this.modifier?this.rolls.join(" + ")+" + "+this.modifier+" = "+this.total:1===this.rolls.length&&this.modifier<0?this.rolls[0]+" - "+Math.abs(this.modifier)+" = "+this.total:1<this.rolls.length&&this.modifier<0?this.rolls.join(" + ")+" - "+Math.abs(this.modifier)+" = "+this.total:void 0},i.parse=function(e){var l,t=new d;return!!(l=e.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i))&&(t.numDice=+l[1]||1,t.numSides=+l[2],t.modifier=+l[3]||0,t.minResult=+t.numDice+t.modifier,t.maxResult=t.numDice*t.numSides+t.modifier,t.avgResult=(t.maxResult+t.minResult)/2,t)},i.validate=function(e){return!!i.parse(e)},i.roll=function(e){var l,t=new r;if(!(l=i.parse(e)))return!1;for(var d=0;d<l.numDice;d++)t.rolls[d]=1+Math.floor(Math.random()*l.numSides);t.modifier=l.modifier;for(var s=0;s<t.rolls.length;s++)t.total+=t.rolls[s];return t.total+=t.modifier,t},l.a=i},108:function(e,l,t){"use strict";t.r(l),t.d(l,"onLoad",(function(){return o}));var i=t(1),d=t(141),r=t(138),s=t(107);function o(e){let l=e.querySelector("div#output"),t=0,o=-1,a=new d.a(e.querySelector(".mdc-text-field"));new r.a(e.querySelector(".mdc-notched-outline")),a.useNativeValidation=!1;let n=d=>{let r=s.a.roll(d.replace(/\s/g,""));if(r){let s=Object(i.parseHTML)(`<div>\n        <em><a class='roll' data-roll='${d}'>${d}</a></em> rolled for <strong>${r.total}</strong>${r.rolls.length>1?`<br>(${r.rolls.join(", ")})`:""}\n        </div>`);Object(i.jqPrepend)(l,s),l.style.display=null,u(s),t+=r.total,e.querySelector("#total").innerHTML=t,e.querySelector(".roll-total-wrap").style.display=null,e.querySelector(".roll-clear").style.display=null,a.value=""}else e.querySelector(".dice-field-container .mdc-text-field").classList.add("error")};e.querySelector(".roll-clear").addEventListener("click",i=>{i.preventDefault(),o=-1,l.innerHTML="",e.querySelector(".roll-total-wrap").style.display="none",e.querySelector(".roll-clear").style.display="none",t=0}),e.querySelector(".roll-submit").addEventListener("click",l=>{l.preventDefault(),o=-1,e.querySelector(".dice-field-container .mdc-text-field").classList.remove("error");let t=e.querySelector(".roll-field").value;t?n(t):e.querySelector(".dice-field-container .mdc-text-field").classList.add("error"),e.querySelector(".roll-field").focus()}),e.querySelector(".roll-field").addEventListener("keydown",l=>{let t=l.keyCode||l.which,i=e.querySelectorAll("#output > div").length;38===t?(l.preventDefault(),o+1<i&&(o++,a.value=e.querySelector(`#output div:eq(${o}) a.roll`).getAttribute("data-roll"))):40===t?(l.preventDefault(),o-1>-1&&(o--,a.value=e.querySelector(`#output div:eq(${o}) a.roll`).getAttribute("data-roll"))):13===t?(l.preventDefault(),e.querySelector(".roll-submit").click()):190===t||188===t?(l.preventDefault(),a.value=a.value+"d"):32!==t&&189!==t&&187!==t||(l.preventDefault(),a.value=a.value+" + ")}),e.querySelector(".roll-field").addEventListener("submit",l=>{l.preventDefault(),e.querySelector(".roll-submit").click()}),e.querySelector(".roll-field").addEventListener("textInput",e=>{var l=e.originalEvent.data;!l||"."!==l&&","!==l?!l||" "!==l&&"+"!==l||(e.preventDefault(),a.value=a.value+"+"):(e.preventDefault(),a.value=a.value+"d")}),e.querySelector(".roll-field").addEventListener("focus",l=>{e.querySelector(".dice-field-label").style.display=null}),e.querySelector(".roll-field").addEventListener("blur",l=>{e.querySelector(".dice-field-label").style.display="none"});let c=e.querySelectorAll(".roll[data-roll]");for(let e of c)u(e);function u(e){e.addEventListener("click",e=>{e.preventDefault();let l=e.target.closest(".roll").getAttribute("data-roll");l&&n(l)})}}},99:function(e,l,t){"use strict";t.r(l);var i=t(7),d=(t(62),t(69),t(110),t(108));class r extends i.a{connectedCallback(){super.connectedCallback(),Object(d.onLoad)(this.shadowRoot)}static get template(){return i.b`
      <style include="material-styles my-styles"></style>

      <div class="dice-wrapper">
        <div class="dice-field-container">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
            <i class="material-icons mdc-text-field__icon mdc-theme--primary">casino</i>
            <input inputmode="numeric" type="tel" class="mdc-text-field__input roll-field" />
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="search-field" class="mdc-floating-label">Roll</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <span class="dice-field-label"
            >Use period (.) or comma (,) to insert a "d".<br />Use space to insert a plus (+).</span
          >
          <button class="mdc-button mdc-button--raised roll-submit">
            <span class="mdc-button__label">Roll!</span>
          </button>
          <button class="mdc-button mdc-button--raised roll-clear" style="display: none;">
            <span class="mdc-button__label">Clear</span>
          </button>

          <div class="roll-total-wrap" style="display: none;">Total: <span id="total"></span></div>
          <div id="output"></div>
        </div>

        <div class="dice-list-container">
          <div class="dice-grid-item roll" data-roll="1d4">
            <dnd-svg id="d4" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d6">
            <dnd-svg id="d6" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d8">
            <dnd-svg id="d8" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d10">
            <dnd-svg id="d10" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d12">
            <dnd-svg id="d12" class="dice-grid-item--image"></dnd-svg>
          </div>
          <div class="dice-grid-item roll" data-roll="1d20">
            <dnd-svg id="d20" class="dice-grid-item--image"></dnd-svg>
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-dice",r);class s extends i.a{static get template(){return i.b`
      <style include="material-styles my-styles"></style>

      <dnd-dice></dnd-dice>
    `}}customElements.define("dnd-dice-view",s)}}]);
//# sourceMappingURL=12.bundle.js.map