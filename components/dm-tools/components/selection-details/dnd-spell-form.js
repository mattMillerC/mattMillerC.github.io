class SpellForm extends Polymer.Element {
  static get template() {
    return Polymer.html`
		<dnd-image-field image="{{spell.image_full}}"></dnd-image-field>
		<dnd-name-field name="{{spell.name}}"></dnd-name-field>
		<dnd-spell-subname-field level="{{spell.level}}" school="{{spell.school}}"></dnd-spell-subname-field>
		<dnd-basic-field value="{{spell.casting_time}}" label="Casting Time"></dnd-basic-field>
		<dnd-basic-field value="{{spell.range}}" label="Range"></dnd-basic-field>
		<dnd-basic-field value="{{spell.components}}" label="Components"></dnd-basic-field>
		<dnd-basic-field value="{{spell.material}}" label="Materials"></dnd-basic-field>
		<dnd-basic-field value="{{spell.duration}}" label="Duration"></dnd-basic-field>
		<dnd-basic-field value="{{spell.concentration}}" label="Concentration"></dnd-basic-field>
		<dnd-basic-field value="{{spell.class}}" label="Classes"></dnd-basic-field>

		<dnd-rich-text-area value="{{spell.desc}}" label="Description (markdown)"></dnd-rich-text-area>
`;
  }

  static get is() {
    return 'dnd-spell-form';
  }

  static properties() {
    return {
      spell: {
        type: Object,
        value: {},
      },
    };
  }
}
window.customElements.define(SpellForm.is, SpellForm);
