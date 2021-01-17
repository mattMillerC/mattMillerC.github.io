class CreatureListItem extends AsyncActionsMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <style>
      [hidden] {
        display: none !important;
      }
      :host([selected]) {
        color: #fff !important;
        background-color: #116cd6;
      }
      .card {
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #aaa;
        align-items: center;
      }
      .card > * {
        margin-right: 10px;
      }
      .card > *:last-child {
        margin-right: 0;
      }
      .card-col {
        display: flex;
        flex-direction: column;
      }
      .card-col.grow {
        flex-grow: 1;
        overflow: hidden;
      }
      .card-col.grow > * {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .card-col.align-right {
        align-items: flex-end;
      }
      img {
        border-radius: 50%;
      }
      img:not([src]) {
        display: none;
      }
    </style>

    <div hidden\$="[[!_isEqual(model, 'monsters')]]" class="card" selected\$="[[selected]]">
      <img src\$="[[item.image_small]]" width="32" height="32">
      <div class="card-col grow">
        <strong class="text-name">[[item.name]]</strong>
        <i>[[item.size]] [[item.type]], [[item.alignment]]</i>
      </div>
      <div class="card-col align-right">
        <span>CR [[item.crString]]</span>
        <strong class\$="{{item.source}}">[[item.source]]</strong>
      </div>
      <dnd-button on-click="_addToCombatTracker" tabindex="0" bigicon="" class="addButton pull-right" icon="plus"></dnd-button>
    </div>

    <div hidden\$="[[!_isEqual(model, 'players')]]" class="card" selected\$="[[selected]]">
      <img src\$="[[item.image_small]]" width="32" height="32">
      <div class="card-col grow">
        <strong class="text-name">[[item.name]]</strong>
        <div>
          <i hidden\$="[[!_hasIt(item.race)]]">[[_capitalize(item.race)]]</i><i hidden\$="[[!_hasBoth(item.race, item.clazz)]]"> </i><i hidden\$="[[!_hasIt(item.clazz)]]">[[_capitalize(item.clazz)]]</i><i hidden\$="[[!_hasEitherAnd(item.clazz, item.race, item.alignment)]]">, </i><i hidden\$="[[!_hasIt(item.alignment)]]">[[item.alignment]]</i>
        </div>
      </div>
      <div class="card-col align-right">
        <strong hidden\$="[[!_hasIt(item.level)]]">Level [[item.level]]</strong>
      </div>
      <dnd-button on-click="_addToCombatTracker" tabindex="0" bigicon="" class="addButton pull-right" icon="plus"></dnd-button>
    </div>

    <div hidden\$="[[!_isEqual(model, 'npcs')]]" class="card" selected\$="[[selected]]">
      <img src\$="[[item.image_small]]" width="32" height="32">
      <div class="card-col grow">
        <strong class="text-name">[[item.name]]</strong>
        <div>
          <i hidden\$="[[!_hasIt(item.race)]]">[[_capitalize(item.race)]]</i><i hidden\$="[[!_hasBoth(item.race, item.clazz)]]"> </i><i hidden\$="[[!_hasIt(item.clazz)]]">[[_capitalize(item.clazz)]]</i><i hidden\$="[[!_hasEitherAnd(item.clazz, item.race, item.alignment)]]">, </i><i hidden\$="[[!_hasIt(item.alignment)]]">[[item.alignment]]</i>
        </div>
      </div>
      <div class="card-col align-right">
        <span hidden\$="[[!_hasIt(item.crString)]]">CR [[item.crString]]</span>
        <strong hidden\$="[[!_hasIt(item.level)]]">Level [[item.level]]</strong>
      </div>
      <dnd-button on-click="_addToCombatTracker" tabindex="0" bigicon="" class="addButton pull-right" icon="plus"></dnd-button>
    </div>

    <div hidden\$="[[!_isEqual(model, 'massCombat')]]" class="card" selected\$="[[selected]]">
      <div class="card-col grow">
        <strong class="text-name">[[item.name]]</strong>
      </div>
      <dnd-button on-click="_addToCombatTracker" tabindex="0" bigicon="" class="addButton pull-right" icon="plus"></dnd-button>
    </div>
`;
  }

  static get is() {
    return 'dnd-creature-list-item';
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      item: {
        type: Object,
      },
      model: {
        type: String,
      },
    };
  }

  _hasEitherAnd(a, b, c) {
    return (a || b) && c;
  }

  _hasIt(a) {
    return !!a;
  }

  _hasBoth(a, b) {
    return a && b;
  }

  _capitalize(str) {
    return str ? str.replace(/\b\w/g, (l) => l.toUpperCase()) : '';
  }

  _addToCombatTracker(e) {
    this.dispatch('addCombatant', this.model, this.item);
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(CreatureListItem.is, CreatureListItem);
