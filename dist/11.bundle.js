(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{42:function(e,t,l){"use strict";l.r(t);var s=l(12),a=(l(21),l(22),l(25),l(60),l(53)),d=l(54),c=l(59),i=l(11);class n extends s.a{static get properties(){return{classes:{type:Object,observer:"_dataLoaded"},hash:{type:String,value:""},loading:{type:Boolean,value:!0,observer:"_loadingChange"}}}static get observers(){return["_updateClassFromHash(classes, hash)"]}constructor(){super(),this.loading=!0,Object(a.a)("classes").then(e=>{this.set("classes",e),this.loading=!1})}connectedCallback(){super.connectedCallback(),this.selectionChangeEventHandler=e=>{let t=e?e.detail.selection:Object(i.c)();t&&this.set("hash",t)},this.deselectionChangeEventHandler=()=>{this.set("hash","")},this.selectionChangeEventHandler(),Object(i.e)().addEventListener("selection-change",this.selectionChangeEventHandler),Object(i.e)().addEventListener("selection-deselected",this.deselectionChangeEventHandler),Object(c.onLoad)(this.shadowRoot)}disconnectedCallback(){super.disconnectedCallback(),this.deselectionChangeEventHandler(),Object(i.e)().removeEventListener("selection-change",this.selectionChangeEventHandler),Object(i.e)().removeEventListener("selection-deselected",this.deselectionChangeEventHandler)}_loadingChange(){this.dispatchEvent(new CustomEvent("loading-data",{bubbles:!0,composed:!0,detail:{loading:this.loading}}))}_dataLoaded(){Object(c.onDataLoad)(this.classes,this.shadowRoot)}_updateClassFromHash(){if(this.classes&&this.hash){let e,t;if(this.shadowRoot.querySelector(".main").classList.add("item-opened"),this.hash.indexOf(",")>-1){let l=this.hash.split(",");e=Object(d.b)(this.classes,l[0]),t=l.slice(1)}else e=Object(d.b)(this.classes,this.hash);e?(Object(c.onHashChange)(e,this.shadowRoot),t&&Object(c.onSubChange)(t,this.hash,this.shadowRoot),this.dispatchEvent(new CustomEvent("title-change",{bubbles:!0,composed:!0,detail:{title:e.name}}))):Object(i.a)(!0)}this.hash||this.shadowRoot.querySelector(".main").classList.remove("item-opened")}static get template(){return s.b`
      <style include="material-styles my-styles"></style>
      <div class="main">

        <dnd-svg class="class-icon stand-alone-icon"></dnd-svg>

        <button class="mdc-icon-button close-item material-icons">close</button>
        <button class="mdc-icon-button mdc-button--raised back-to-top material-icons hidden">arrow_upward</button>

        <div class="class-list-container"></div>

        <div class="class-page--class-container">
          <div id="classtable">
            <table class="table">
              <tr id="groupHeaders" class="table-row table-row--header">
                <th colspan="3"></th>
                <!-- spacer to match the 3 default cols (level, prof, features) -->
              </tr>
              <tr id="colHeaders" class="table-row table-row--header">
                <th class="level table-cell">Level</th>
                <th class="pb table-cell">Proficiency Bonus</th>
                <th class="features table-cell">Features</th>
              </tr>
              <tr id="level1" class="table-row">
                <td class="level table-cell">1st</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level2" class="table-row">
                <td class="level table-cell">2nd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level3" class="table-row">
                <td class="level table-cell">3rd</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level4" class="table-row">
                <td class="level table-cell">4th</td>
                <td class="pb table-cell">+2</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level5" class="table-row">
                <td class="level table-cell">5th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level6" class="table-row">
                <td class="level table-cell">6th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level7" class="table-row">
                <td class="level table-cell">7th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level8" class="table-row">
                <td class="level table-cell">8th</td>
                <td class="pb table-cell">+3</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level9" class="table-row">
                <td class="level table-cell">9th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level10" class="table-row">
                <td class="level table-cell">10th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level11" class="table-row">
                <td class="level table-cell">11th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level12" class="table-row">
                <td class="level table-cell">12th</td>
                <td class="pb table-cell">+4</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level13" class="table-row">
                <td class="level table-cell">13th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level14" class="table-row">
                <td class="level table-cell">14th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level15" class="table-row">
                <td class="level table-cell">15th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level16" class="table-row">
                <td class="level table-cell">16th</td>
                <td class="pb table-cell">+5</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level17" class="table-row">
                <td class="level table-cell">17th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level18" class="table-row">
                <td class="level table-cell">18th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level19" class="table-row">
                <td class="level table-cell">19th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
              <tr id="level20" class="table-row">
                <td class="level table-cell">20th</td>
                <td class="pb table-cell">+6</td>
                <td class="features table-cell"></td>
              </tr>
            </table>
          </div>

          <div id="statsprof" class="stats">
            <div id="hp" colspan="6">
              <h5>Hit Points</h5>
              <div id="hitdice">
                <strong>Hit Dice:</strong>
                <span> </span>
              </div>
              <div id="hp1stlevel">
                <strong>Hit Points at 1st Level:</strong>
                <span> </span>
              </div>
              <div id="hphigherlevels">
                <strong>Hit Points at Higher Levels:</strong>
                <span> </span>
              </div>
            </div>
            <div id="prof" colspan="6">
              <h5>Proficiencies</h5>
              <span
                >You are proficient with the following items, in addition to any proficiencies provided by your race or
                background.</span
              >
              <div id="armor">
                <strong>Armor:</strong>
                <span> </span>
              </div>
              <div id="weapons">
                <strong>Weapons:</strong>
                <span> </span>
              </div>
              <div id="tools">
                <strong>Tools:</strong>
                <span> </span>
              </div>
              <div id="saves">
                <strong>Saving Throws:</strong>
                <span> </span>
              </div>
              <div id="skills">
                <strong>Skills:</strong>
                <span> </span>
              </div>
              <div id="equipment" colspan="6">
                <h5>Starting Equipment</h5>
                <div></div>
              </div>
            </div>
          </div>

          <div id="subclassHeight"></div>
          <div id="subclasses"></div>
          <div id="stats" class="stats">
            <!-- populate with JS -->
          </div>
        </div>
      </div>
    `}}customElements.define("dnd-classes",n);class r extends s.a{static get template(){return s.b`
      <style include="material-styles my-styles"></style>
      
      <dnd-classes></dnd-classes>
    `}}customElements.define("dnd-classes-view",r)}}]);
//# sourceMappingURL=11.bundle.js.map