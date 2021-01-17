class PlayerForm extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <dnd-image-field image="{{player.image_full}}"></dnd-image-field>
    <dnd-name-field name="{{player.name}}"></dnd-name-field>
    <dnd-class-level-field race="{{player.race}}" clazz="{{player.clazz}}" level="{{player.level}}"></dnd-class-level-field>
    <dnd-subname-field size="{{player.size}}" alignment="{{player.alignment}}" type="{{player.type}}" tag="{{player.tag}}"></dnd-subname-field>
    <hr>
    <dnd-basic-field value="{{player.ac}}" label="Armor Class"></dnd-basic-field>
    <dnd-basic-field value="{{player.hp}}" label="Hit Points" validate-number="" required=""></dnd-basic-field>
    <dnd-basic-field value="{{player.speed}}" label="Speed"></dnd-basic-field>
    <dnd-basic-field value="{{player.initiativeModifier}}" label="Initiative Modifier" validate-number="" required=""></dnd-basic-field>
    <hr>
    <dnd-stats-field stats="{{player.stats}}"></dnd-stats-field>
    <hr>
    <dnd-basic-field value="{{player.savingThrows}}" label="Saving Throws"></dnd-basic-field>
    <dnd-basic-field value="{{player.skills}}" label="Skills"></dnd-basic-field>
    <dnd-basic-field value="{{player.senses}}" label="Senses"></dnd-basic-field>
    <dnd-basic-field value="{{player.passivePerception}}" label="Passive Perception"></dnd-basic-field>
    <dnd-basic-field value="{{player.languages}}" label="Languages"></dnd-basic-field>
`;
  }

  static get is() {
    return 'dnd-player-form';
  }

  static properties() {
    return {
      player: {
        type: Object,
        value: {},
      },
    };
  }
}
window.customElements.define(PlayerForm.is, PlayerForm);
