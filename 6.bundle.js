(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{111:function(e,t,a){"use strict";a.r(t);var i=a(7),c=a(18),r=a(2);class d extends i.a{static get properties(){return{selectedBackground:{type:String,value:""},backgroundSkillProfOptions:{type:Object,value:[]},defaultBackgroundSkillProf:{type:String,value:""},selectedRace:{type:String,value:""},raceAttributeOptions:{type:Object,value:[]},defaultRaceAttribute:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),this.characterChangeHandler=e=>{let t=e.detail.character;this.updateFromCharacter(t)},this.updateFromCharacter(Object(c.o)()),Object(c.g)().addEventListener("character-selected",this.characterChangeHandler)}disconnectedCallback(){super.disconnectedCallback(),Object(c.g)().removeEventListener("character-selected",this.characterChangeHandler)}async updateFromCharacter(e){this.selectedBackground=e.background.name,this.selectedRace=e.race.name;let t=await Object(c.f)();t&&t.choose?(this.backgroundSkillProfOptions=t.choose.from,this.backgroundSkillProfChoices=t.choose.count||1,this.backgroundSkillProfSelections=e.backgroundSkillProficiencies):(this.backgroundSkillProfOptions=void 0,this.backgroundSkillProfChoices=void 0,this.backgroundSkillProfSelections=void 0);let a=await Object(c.e)(t);this.defaultBackgroundSkillProf=a.map(e=>Object(r.util_capitalizeAll)(e)).join(", ");let i=await Object(c.n)();i&&i.choose?(this.raceAttributeOptions=i.choose.from.map(e=>e.toUpperCase()),this.raceAttributeChoices=i.choose.count||1,this.raceAttributeSelections=e.raceAttributes):(this.raceAttributeOptions=void 0,this.raceAttributeChoices=void 0,this.raceAttributeSelections=void 0);let d=await Object(c.m)(i);this.defaultRaceAttribute=d.map(e=>{let t=e[0].toLowerCase(),a=e[1];return t.toUpperCase()+" "+Object(r.absInt)(a)}).join(", ")}_backgroundSkillAddCallback(e){Object(c.x)(e)}_raceAttributeAddCallback(e){Object(c.B)(e)}_exists(){for(let e of arguments)if(e&&(e.constructor!==Object||Object.entries(e).length>0)&&(!Array.isArray(e)||e.length>0))return!0;return!1}static get template(){return i.b`
      <style>
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
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

        .default-selection {
          font-size: 14px;
          margin-bottom: 0 !important;
        }

        .default-selection span {
          color: var(--mdc-theme-secondary)
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
          <h2>Background</h2>
          <dnd-select-add model="backgrounds" value="[[selectedBackground]]"></dnd-select-add>
          <div hidden$="[[_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Select Background to add Skill Proficiencies</div>
          <div hidden$="[[!_exists(backgroundSkillProfOptions, defaultBackgroundSkillProf)]]">Skill Proficiencies from Background:</div>
          <div hidden$="[[!_exists(defaultBackgroundSkillProf)]]" class="default-selection">Default Skills: <span>[[defaultBackgroundSkillProf]]</span></div>
          <dnd-select-add hidden$="[[!_exists(backgroundSkillProfOptions)]]" choices="[[backgroundSkillProfChoices]]" placeholder="<Choose Skills>" label="Choosen Skill(s)"
            options="[[backgroundSkillProfOptions]]" value="[[backgroundSkillProfSelections]]" add-callback="[[_backgroundSkillAddCallback]]"></dnd-select-add>
        </div>

        <div class="row-wrap">
          <h2>Race</h2>
          <dnd-select-add model="races" value="[[selectedRace]]"></dnd-select-add>
          <div hidden$="[[_exists(raceAttributeOptions, defaultRaceAttribute)]]">Select Race to add Attribute Bonuses</div>
          <div hidden$="[[!_exists(raceAttributeOptions, defaultRaceAttribute)]]">Attribute Bonuses from Race:</div>
          <div hidden$="[[!_exists(defaultRaceAttribute)]]" class="default-selection">Default Attributes: <span>[[defaultRaceAttribute]]</span></div>
          <dnd-select-add hidden$="[[!_exists(raceAttributeOptions)]]" choices="[[raceAttributeChoices]]" placeholder="<Choose Attribute>" label="Choosen Attribute(s)"
            options="[[raceAttributeOptions]]" value="[[raceAttributeSelections]]" add-callback="[[_raceAttributeAddCallback]]"></dnd-select-add>
        </div>
      </div>
    `}}customElements.define("dnd-character-builder-background-race",d)}}]);
//# sourceMappingURL=6.bundle.js.map