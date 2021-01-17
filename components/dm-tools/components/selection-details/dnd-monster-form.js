class MonsterForm extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: block;
      }

      .edit .flex-wrap > * {
        flex-basis: 49%;
      }

      .form-wrap {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
      }

      .edit > * {
        margin-top: 5px;
        margin-bottom: 15px;
      }
      .edit > dnd-basic-field {
        flex-basis: calc(50% - 12.5px);
      }
      hr {
        width: 100%;
        border-top: 0;
        border-bottom: 1px solid;
      }
    </style>

    <div class="form-wrap">
      <dnd-image-field image="{{monster.image_full}}"></dnd-image-field>
      <dnd-source-field source="{{monster.source}}" source-full="{{monster.sourceFull}}" link="{{monster.link}}"></dnd-source-field>
      <dnd-name-field name="{{monster.name}}"></dnd-name-field>
      <dnd-subname-field size="{{monster.size}}" alignment="{{monster.alignment}}" type="{{monster.type}}" tag="{{monster.tag}}"></dnd-subname-field>
      <hr>
      <dnd-basic-field value="{{monster.ac}}" label="Armor Class"></dnd-basic-field>
      <dnd-basic-field value="{{monster.hp}}" label="Hit Points" validate-number="" required=""></dnd-basic-field>
      <dnd-basic-field value="{{monster.speed}}" label="Speed"></dnd-basic-field>
      <dnd-basic-field value="{{monster.initiativeModifier}}" label="Initiative Modifier" validate-number="" required=""></dnd-basic-field>
      <dnd-cr-field crnum="{{monster.cr}}" crstr="{{monster.crString}}"></dnd-cr-field>
      <hr>
      <dnd-stats-field stats="{{monster.stats}}"></dnd-stats-field>
      <hr>
      <dnd-basic-field value="{{monster.damageVulnerabilities}}" label="Damage Vulnerabilities"></dnd-basic-field>
      <dnd-basic-field value="{{monster.damageResistances}}" label="Damage Resistances"></dnd-basic-field>
      <dnd-basic-field value="{{monster.damageImmunities}}" label="Damage Immunities"></dnd-basic-field>
      <dnd-basic-field value="{{monster.conditionImmunities}}" label="Condition Immunities"></dnd-basic-field>
      <dnd-basic-field value="{{monster.savingThrows}}" label="Saving Throws"></dnd-basic-field>
      <dnd-basic-field value="{{monster.skills}}" label="Skills"></dnd-basic-field>
      <dnd-basic-field value="{{monster.senses}}" label="Senses"></dnd-basic-field>
      <dnd-basic-field value="{{monster.passivePerception}}" label="Passive Perception"></dnd-basic-field>
      <dnd-basic-field value="{{monster.languages}}" label="Languages"></dnd-basic-field>

      <dnd-list-field list-items="{{monster.traits}}" title="Traits"></dnd-list-field>
      <dnd-list-field list-items="{{monster.actions}}" title="Actions"></dnd-list-field>
      <dnd-list-field list-items="{{monster.legendaryActions}}" title="Legendary Actions"></dnd-list-field>
      <dnd-list-field list-items="{{monster.spells}}" spell-dc="{{monster.spellDc}}" spell-mod="{{monster.spellMod}}" list-type="spell" title="Spells"></dnd-list-field>
      <dnd-rolls-field rolls="{{monster.rolls}}"></dnd-rolls-field>
    </div>
`;
  }

  static get is() {
    return 'dnd-monster-form';
  }

  static get properties() {
    return {
      monster: {
        type: Object,
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
    };
  }

  _modeClass() {
    return this.mode === 'edit' ? 'edit' : 'view';
  }

  _isEqual(a, b) {
    return a == b;
  }
}
window.customElements.define(MonsterForm.is, MonsterForm);
