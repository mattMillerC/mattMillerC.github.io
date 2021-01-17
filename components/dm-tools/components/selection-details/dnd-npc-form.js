class NpcForm extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <dnd-image-field image="{{npc.image_full}}"></dnd-image-field>
    <dnd-name-field name="{{npc.name}}"></dnd-name-field>
    <dnd-class-level-field race="{{npc.race}}" clazz="{{npc.clazz}}" level="{{npc.level}}"></dnd-class-level-field>
    <dnd-subname-field size="{{npc.size}}" alignment="{{npc.alignment}}" type="{{npc.type}}" tag="{{npc.tag}}"></dnd-subname-field>
    <hr>
    <dnd-basic-field value="{{npc.ac}}" label="Armor Class"></dnd-basic-field>
    <dnd-basic-field value="{{npc.hp}}" label="Hit Points" validate-number="" required=""></dnd-basic-field>
    <dnd-basic-field value="{{npc.speed}}" label="Speed"></dnd-basic-field>
    <dnd-basic-field value="{{npc.initiativeModifier}}" label="Initiative Modifier" validate-number="" required=""></dnd-basic-field>
    <dnd-cr-field crnum="{{npc.cr}}" crstr="{{npc.crString}}"></dnd-cr-field>
    <hr>
    <dnd-stats-field stats="{{npc.stats}}"></dnd-stats-field>
    <hr>
    <dnd-basic-field value="{{npc.damageVulnerabilities}}" label="Damage Vulnerabilities"></dnd-basic-field>
    <dnd-basic-field value="{{npc.damageResistances}}" label="Damage Resistances"></dnd-basic-field>
    <dnd-basic-field value="{{npc.damageImmunities}}" label="Damage Immunities"></dnd-basic-field>
    <dnd-basic-field value="{{npc.conditionImmunities}}" label="Condition Immunities"></dnd-basic-field>
    <dnd-basic-field value="{{npc.savingThrows}}" label="Saving Throws"></dnd-basic-field>
    <dnd-basic-field value="{{npc.skills}}" label="Skills"></dnd-basic-field>
    <dnd-basic-field value="{{npc.senses}}" label="Senses"></dnd-basic-field>
    <dnd-basic-field value="{{npc.passivePerception}}" label="Passive Perception"></dnd-basic-field>
    <dnd-basic-field value="{{npc.languages}}" label="Languages"></dnd-basic-field>
    <hr>
    <dnd-list-field list-items="{{npc.traits}}" title="Traits"></dnd-list-field>
    <dnd-list-field list-items="{{npc.actions}}" title="Actions"></dnd-list-field>
    <dnd-list-field list-items="{{npc.legendaryActions}}" title="Legendary Actions"></dnd-list-field>
    <dnd-list-field list-items="{{npc.spells}}" list-type="spell" title="Spells"></dnd-list-field>
    <dnd-mass-combat-roll-field rolls="{{npc.rolls}}"></dnd-mass-combat-roll-field>
`;
  }

  static get is() {
    return 'dnd-npc-form';
  }

  static properties() {
    return {
      npc: {
        type: Object,
        value: {},
      },
    };
  }
}
window.customElements.define(NpcForm.is, NpcForm);
