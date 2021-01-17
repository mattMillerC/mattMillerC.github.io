import '../ui/dnd-confirm-button.js';
class CombatToolbar extends AsyncActionsMixin(ReduxMixin(Polymer.Element)) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-toolbar.css">
    <style>
      [hidden] {
        display: none !important;
      }
      #prevBtn,
      #nextBtn {
        margin-top: 3px;
      }
      .flex-wrap {
        display: flex;
        margin-top: -5px;
      }
      .title {
        flex: 0 0 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .info {
        margin-top: 10px;
        flex: 0 0 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      #clearBtn {
        align-self: baseline;
      }
    </style>

    <dnd-toolbar>
      <div class="title">[[shortenedTitle]]</div>

      <div class="btn-group">
        <dnd-button id="prevBtn" icon="fast-backward" default=""></dnd-button>
        <dnd-button id="playPauseBtn" icon\$="[[_playPauseIcon(isPlaying)]]" large="" default=""></dnd-button>
        <dnd-button id="nextBtn" icon="fast-forward" default=""></dnd-button>
      </div>

      <div class="flex-wrap">
        <dnd-confirm-button id="clearBtn" click-callback="[[clearCallback()]]" icon="trash"></dnd-confirm-button>
        <dnd-button-input id="saveInput" icon="floppy" placeholder="Name" value="[[shortenedTitle]]" maintain-value=""></dnd-button-input>
        <dnd-encounter-opener text=""></dnd-encounter-opener>
      </div>

      <div class="info">
        <div class="round">Round: [[round]]</div>
        <div class="timer">[[_formatTime(timer)]]</div>
        <div class="xp">XP: [[totalXp]]</div>
      </div>
    </dnd-toolbar>
`;
  }

  static get is() {
    return 'dnd-combat-toolbar';
  }

  static get properties() {
    return {
      isPlaying: {
        type: Boolean,
        value: false,
      },
      combat: {
        type: String,
        statePath: 'combat',
      },
      combatants: {
        type: Array,
        statePath: 'combat.combatants',
      },
      title: {
        type: String,
        statePath: 'combat.title',
      },
      shortenedTitle: {
        type: String,
        computed: '_shortenTitle(title, combat)',
      },
      round: {
        type: Object,
        statePath: 'combat.round',
      },
      timer: {
        type: Number,
        statePath: 'combat.timer',
      },
      totalXp: {
        type: Number,
        computed: 'calcXp(combatants)',
      },
      combatTitleSeparator: {
        type: String,
        value: '  -  ',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.saveInput.addEventListener('change', (e) => {
      let currentTime = Date.now(),
        timestampStr = moment().format('M/D/YY, h:mm:ss a'),
        combatTitle = e.detail + this.combatTitleSeparator + timestampStr;

      this.dispatch(
        'save',
        'encounters',
        {
          sort: Date.now(),
          title: combatTitle,
          encounter: this.getState().combat,
        },
        () => {
          this.dispatch('loadSelectSource', 'encounters');
        }
      );
      this.dispatch({ type: 'SET_COMBAT_TITLE', title: combatTitle });
    });

    Polymer.Gestures.addListener(this.$.playPauseBtn, 'tap', (e) => {
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        if (this._findCurrentTurnIndex() === -1) {
          this.setFirstTurn();
        }
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    });
    Polymer.Gestures.addListener(this.$.prevBtn, 'tap', (e) => {
      this.prevCombatant();
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.startTimer();
      }
    });
    Polymer.Gestures.addListener(this.$.nextBtn, 'tap', (e) => {
      this.nextCombatant();
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.startTimer();
      }
    });
  }

  clearCallback(e) {
    return function (e) {
      this.dispatch({ type: 'CLEAR_COMBATANTS' });
      this.isPlaying = false;
      this.pauseTimer();
      this.dispatch({ type: 'SET_TIME', time: 0 });
    }.bind(this);
  }

  setFirstTurn() {
    this._setTurn(this._findStartingTurnIndex(), 0);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (!this.timer) {
        this.dispatch({ type: 'SET_TIME', time: 100 });
      } else {
        this.dispatch({ type: 'SET_TIME', time: this.timer + 100 });
      }
    }, 100);
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
  }

  nextCombatant() {
    let currentTurnIndex = this._findCurrentTurnIndex(),
      stillLooking = true,
      lookingIndex = currentTurnIndex,
      roundDelta = 0;

    if (currentTurnIndex === undefined) {
      return false;
    }

    while (stillLooking) {
      lookingIndex++;
      if (lookingIndex >= this.combatants.length) {
        lookingIndex = 0;
        roundDelta = 1;
      }
      if (lookingIndex === currentTurnIndex) {
        if (!this.combatants[lookingIndex].combatData.isDead) {
          this._setTurn(lookingIndex, roundDelta);
          stillLooking = false;
          return true;
        } else {
          stillLooking = false;
          return false;
        }
      }
      if (!this.combatants[lookingIndex].combatData.isDead) {
        this._setTurn(lookingIndex, roundDelta);
        stillLooking = false;
        return true;
      }
    }
  }

  prevCombatant() {
    let currentTurnIndex = this._findCurrentTurnIndex(),
      stillLooking = true,
      lookingIndex = currentTurnIndex,
      roundDelta = 0;

    if (currentTurnIndex === undefined) {
      return false;
    }

    while (stillLooking) {
      lookingIndex--;
      if (lookingIndex < 0) {
        lookingIndex = this.combatants.length - 1;
        roundDelta = -1;
        if (this.round + roundDelta < 1) {
          stillLooking = false;
          return false;
        }
      }
      if (lookingIndex === currentTurnIndex) {
        if (!this.combatants[lookingIndex].combatData.isDead) {
          this._setTurn(lookingIndex, roundDelta);
          stillLooking = false;
          return true;
        } else {
          stillLooking = false;
          return false;
        }
      }
      if (!this.combatants[lookingIndex].combatData.isDead) {
        this._setTurn(lookingIndex, roundDelta);
        stillLooking = false;
        return true;
      }
    }
  }

  _setTurn(turnIndex, roundDelta) {
    if (this._findCurrentTurnIndex() > -1) {
      this.dispatch({
        type: 'ADD_TIME',
        index: this._findCurrentTurnIndex(),
        time: this.timer - this.timeAtStartOfTurn,
      });
    }
    this.dispatch({
      type: 'SET_TURN',
      turnIndex: turnIndex,
      roundDelta: roundDelta,
    });

    this.timeAtStartOfTurn = this.timer;
  }

  _findStartingTurnIndex() {
    let startingTurnIndex;

    for (let index in this.combatants) {
      if (!this.combatants[index].combatData.isDead) {
        startingTurnIndex = index;
        break;
      }
    }

    return startingTurnIndex;
  }

  _findCurrentTurnIndex() {
    let currentTurnIndex = -1;

    for (let index in this.combatants) {
      if (this.combatants[index].combatData.isTurn) {
        currentTurnIndex = index;
        break;
      }
    }

    return currentTurnIndex;
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

  calcXp() {
    let totalXp = 0;

    for (let combatant of this.combatants) {
      if (combatant.creatureData.crString) {
        totalXp += xpMap[combatant.creatureData.crString];
      }
    }
    return totalXp;
  }

  _playPauseIcon() {
    return this.isPlaying ? 'pause' : 'play';
  }

  _shortenTitle(title, combat) {
    if (combat.title) {
      if (combat.title.indexOf(this.combatTitleSeparator) > -1) {
        return combat.title.substring(
          0,
          combat.title.indexOf(this.combatTitleSeparator)
        );
      } else {
        return combat.title;
      }
    } else {
      return '';
    }
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(CombatToolbar.is, CombatToolbar);
