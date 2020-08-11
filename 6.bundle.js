(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{111:function(e,t,i){"use strict";i.r(t);var a=i(7),c=i(18),d=i(2);class r extends a.a{static get properties(){return{selectedBackground:{type:String,value:""},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},selectedRace:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(c.p)()),Object(c.g)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(c.g)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background.name,this.selectedRace=e.race.name;let t=await Object(c.f)();t&&t.choose?(this.backgroundSkillProfOptions=t.choose.from,this.backgroundSkillProfChoices=t.choose.count||1,this.backgroundSkillProfSelections=e.backgroundSkillProficiencies):(this.backgroundSkillProfOptions=void 0,this.backgroundSkillProfChoices=void 0,this.backgroundSkillProfSelections=void 0);let i=await Object(c.e)(t);this.defaultBackgroundSkillProf=i.map(e=>Object(d.util_capitalizeAll)(e)).join(", ");let a=await Object(c.o)();a&&a.choose?(this.raceAttributeOptions=a.choose.from.map(e=>e.toUpperCase()),this.raceAttributeChoices=a.choose.count||1,this.raceAttributeSelections=e.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let r=await Object(c.n)(a);this.defaultRaceAttribute=r.map(e=>{let t=e[0].toLowerCase(),i=e[1];return t.toUpperCase()+" "+Object(d.absInt)(i)}).join(", ")}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return a.b`
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .col-wrap {
          display: flex;
        }
      </style>

      <div class="col-wrap">

        <div>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]"></dnd-select-add>
          <div hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default: [[defaultBackgroundSkillProf]]</div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>


        <div>
          <dnd-select-add model="races" value="[[selectedRace]]"></dnd-select-add>
          <div hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default: [[defaultRaceAttribute]]</div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",r)}}]);
//# sourceMappingURL=6.bundle.js.map