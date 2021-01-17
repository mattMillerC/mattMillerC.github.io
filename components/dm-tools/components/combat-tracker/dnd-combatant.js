class Combatant extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-table.css">
    <style>
      :host {
        display: table-row;
        width: 100%;
        position: relative;
      }
      :host([turn]) {
        color: #fff;
        background-color: #eb9316 !important;
      }
      :host([dead]) {
        color: gainsboro;
      }
      :host([selected]) {
        color: #fff;
        background-color: #116cd6 !important;
      }
      :host([selected][turn]) {
        background-image: linear-gradient(to bottom, #eb9316 0, #116cd6 100%);
      }
      .table-cell {
        display: table-cell;
      }
    </style>

    <div class="table-cell">[[initiativeFloor]]</div>
    <div class="table-cell">
      [[combatant.creatureData.name]] [[combatant.index]]
    </div>
    <div class="table-cell">[[_formatTime(combatant.combatData.timer)]]</div>
    <div class="table-cell">[[combatant.creatureData.crString]]</div>
    <div class="table-cell">[[currentHp]]</div>
`;
  }

  static get is() {
    return 'dnd-combatant';
  }

  static get properties() {
    return {
      combatant: {
        type: Object,
      },
      initiativeFloor: {
        type: Number,
        computed: '_initiativeFloor(combatant.combatData.initiative)',
      },
      currentHp: {
        type: Number,
        computed:
          '_computeHp(combatant.combatData.healthDelta, combatant.creatureData.hp)',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    Polymer.Gestures.addListener(this.root, 'tap', (e) => {
      console.log('tapped');
      if (this.hasAttribute('selected')) {
        this.dispatch({
          type: 'SET_COMBAT_SELECTION',
          selectedCombatant: {},
        });
      } else {
        this.dispatch({
          type: 'SET_COMBAT_SELECTION',
          selectedCombatant: this.combatant,
        });
        this.dispatch({
          type: 'SET_SELECTION',
          selection: {
            model: this.combatant.model,
            creature: this.combatant.creatureData,
          },
        });
      }
    });
  }

  _computeHp() {
    return (
      this.combatant.creatureData.hp + this.combatant.combatData.healthDelta
    );
  }

  _initiativeFloor() {
    return Math.floor(this.combatant.combatData.initiative);
  }

  _formatTime(millis) {
    let timeLeft = millis,
      ms,
      s,
      min,
      hr,
      result = '',
      twodigits = function (number) {
        if ((number + '').length === 1) {
          return '0' + number;
        }
        return number;
      };

    ms = timeLeft % 1000;
    timeLeft = (timeLeft - ms) / 1000;
    s = timeLeft % 60;
    timeLeft = (timeLeft - s) / 60;
    min = timeLeft % 60;
    timeLeft = (timeLeft - min) / 60;
    hr = timeLeft;

    if (hr > 0) {
      result += hr + ':' + twodigits(min) + ':';
    } else if (min > 0) {
      result += min + ':';
    }

    result += twodigits(s) + '.' + ms.toString()[0];
    if (result === '00.0') {
      return '';
    }
    return result;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(Combatant.is, Combatant);
