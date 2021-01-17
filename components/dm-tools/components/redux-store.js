
import { deepMerge } from '../js/deepMerge';
import { Models } from '../../data/models'
import 'polymer-redux';
const xpMap = {
  0: 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

const initialState = {
  loading: false,
  saving: false,
  error: '',
  spellLink: '',
  selection: {
    mode: 'view',
    creature: null,
    model: null,
  },
  cursor: {
    filter: {},
    model: 'monsters',
    creatures: [],
  },
  combat: {
    round: 1,
    timer: 0,
    selection: null,
    combatants: [],
    title: '',
  },
  selectData: {
    cr: [
      { value: 0, label: '0' },
      { value: 0.0125, label: '1/8' },
      { value: 0.25, label: '1/4' },
      { value: 0.5, label: '1/2' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12' },
      { value: 13, label: '13' },
      { value: 14, label: '14' },
      { value: 15, label: '15' },
      { value: 16, label: '16' },
      { value: 17, label: '17' },
      { value: 18, label: '18' },
      { value: 19, label: '19' },
      { value: 20, label: '20' },
      { value: 21, label: '21' },
      { value: 22, label: '22' },
      { value: 23, label: '23' },
      { value: 24, label: '24' },
      { value: 25, label: '25' },
      { value: 26, label: '26' },
      { value: 27, label: '27' },
      { value: 28, label: '28' },
      { value: 29, label: '29' },
      { value: 30, label: '30' },
    ],
    size: [
      { value: 'tiny', label: 'Tiny' },
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'huge', label: 'Huge' },
      { value: 'gargantuan', label: 'Gargantuan' },
    ],
    type: [
      { value: 'aberration', label: 'Aberration' },
      { value: 'beast', label: 'Beast' },
      { value: 'celestial', label: 'Celestial' },
      { value: 'construct', label: 'Construct' },
      { value: 'dragon', label: 'Dragon' },
      { value: 'elemental', label: 'Elemental' },
      { value: 'fey', label: 'Fey' },
      { value: 'fiend', label: 'Fiend' },
      { value: 'giant', label: 'Giant' },
      { value: 'humanoid', label: 'Humanoid' },
      { value: 'monstrosity', label: 'Monstrosity' },
      { value: 'ooze', label: 'Ooze' },
      { value: 'plant', label: 'Plant' },
      { value: 'undead', label: 'Undead' },
    ],
    tag: [
      { value: 'demon', label: 'Demon' },
      { value: 'devil', label: 'Devil' },
      { value: 'goblinoid', label: 'Goblinoid' },
      { value: 'shapechanger', label: 'Shapechanger' },
      { value: 'titan', label: 'Titan' },
      { value: 'yugoloth', label: 'Yugoloth' },
    ],
    alignment: [
      { value: 'lawful good', label: 'Lawful Good' },
      { value: 'neutral good', label: 'Neutral Good' },
      { value: 'chaotic good', label: 'Chaotic Good' },
      { value: 'lawful neutral', label: 'Lawful Neutral' },
      { value: '(true) neutral', label: '(True) Neutral' },
      { value: 'chaotic neutral', label: 'Chaotic Neutral' },
      { value: 'lawful evil', label: 'Lawful Evil' },
      { value: 'neutral evil', label: 'Neutral Evil' },
      { value: 'chaotic evil', label: 'Chaotic Evil' },
    ],
    source: [
      { value: 'MA', label: 'Manually Added' },
      { value: 'MM', label: 'Monsters Manual' },
      { value: 'VGM', label: 'Volo\'s Guide to Monsters' },
      { value: 'PotA', label: 'Princes of the Apocalypse' },
      { value: 'SKT', label: 'Storm King\'s Thunder' },
      { value: 'ToD', label: 'Tyranny of Dragons' },
      { value: 'OotA', label: 'Out of the Abyss' },
      { value: 'CoS', label: 'Curse of Strahd' },
      { value: 'LMoP', label: 'Lost Mine of Phandelver' },
      { value: 'MaD', label: 'Monster-A-Day' },
    ],
    clazz: [
      { value: 'barbarian', label: 'Barbarian' },
      { value: 'bard', label: 'Bard' },
      { value: 'cleric', label: 'Cleric' },
      { value: 'druid', label: 'Druid' },
      { value: 'fighter', label: 'Fighter' },
      { value: 'monk', label: 'Monk' },
      { value: 'paladin', label: 'Paladin' },
      { value: 'ranger', label: 'Ranger' },
      { value: 'rogue', label: 'Rogue' },
      { value: 'sorcerer', label: 'Sorcerer' },
      { value: 'warlock', label: 'Warlock' },
      { value: 'wizard', label: 'Wizard' },
      { value: 'blood hunter', label: 'Blood Hunter' },
    ],
    race: [
      { value: 'aasimar', label: 'Aasimar' },
      { value: 'bugbear', label: 'Bugbear' },
      { value: 'dragonborn', label: 'Dragonborn' },
      { value: 'dwarf', label: 'Dwarf' },
      { value: 'elf', label: 'Elf' },
      { value: 'firbolg', label: 'Firbolg' },
      { value: 'genasi', label: 'Genasi' },
      { value: 'gnome', label: 'Gnome' },
      { value: 'goblin', label: 'Goblin' },
      { value: 'goliath', label: 'Goliath' },
      { value: 'half-elf', label: 'Half-Elf' },
      { value: 'half-orc', label: 'Half-Orc' },
      { value: 'halfling', label: 'Halfling' },
      { value: 'hobgoblin', label: 'Hobgoblin' },
      { value: 'human', label: 'Human' },
      { value: 'kenku', label: 'Kenku' },
      { value: 'kobold', label: 'Kobold' },
      { value: 'lizardfolk', label: 'Lizardfolk' },
      { value: 'orc', label: 'Orc' },
      { value: 'tabaxi', label: 'Tabaxi' },
      { value: 'tiefling', label: 'Tiefling' },
      { value: 'tortle', label: 'Tortle' },
      { value: 'triton', label: 'Triton' },
      { value: 'yuan-ti pureblood', label: 'Yuan-Ti Pureblood' },
    ],
    level: [
      { value: 1, label: 'Level 1' },
      { value: 2, label: 'Level 2' },
      { value: 3, label: 'Level 3' },
      { value: 4, label: 'Level 4' },
      { value: 5, label: 'Level 5' },
      { value: 6, label: 'Level 6' },
      { value: 7, label: 'Level 7' },
      { value: 8, label: 'Level 8' },
      { value: 9, label: 'Level 9' },
      { value: 10, label: 'Level 10' },
      { value: 11, label: 'Level 11' },
      { value: 12, label: 'Level 12' },
      { value: 13, label: 'Level 13' },
      { value: 14, label: 'Level 14' },
      { value: 15, label: 'Level 15' },
      { value: 16, label: 'Level 16' },
      { value: 17, label: 'Level 17' },
      { value: 18, label: 'Level 18' },
      { value: 19, label: 'Level 19' },
      { value: 20, label: 'Level 20' },
    ],
    damageType: [
      { value: 'acid', label: 'Acid' },
      { value: 'bludgeoning', label: 'Bludgeoning' },
      { value: 'cold', label: 'Cold' },
      { value: 'fire', label: 'Fire' },
      { value: 'force', label: 'Force' },
      { value: 'lightning', label: 'Lightning' },
      { value: 'necrotic', label: 'Necrotic' },
      { value: 'piercing', label: 'Piercing' },
      { value: 'poison', label: 'Poison' },
      { value: 'psychic', label: 'Psychic' },
      { value: 'radiant', label: 'Radiant' },
      { value: 'slashing', label: 'Slashing' },
      { value: 'thunder', label: 'Thunder' },
    ],
  },
};

const isSelectedCombatant = function (combatant) {
  let selectedCombatant = store.getState().combat.selection;

  return (
    combatant &&
    selectedCombatant &&
    combatant.model === selectedCombatant.model &&
    combatant.creatureId === selectedCombatant.creatureId &&
    combatant.index !== undefined &&
    combatant.index === selectedCombatant.index
  );
};

const reducer = (state, action) => {
  let newState;
  let newCombatants;
  let newCombatSelection;

  if (!state) {
    return initialState;
  }

  switch (action.type) {
  case 'START_LOADING':
    return Object.assign({}, state, { loading: true });

  case 'STOP_LOADING':
    return Object.assign({}, state, { loading: false });

  case 'START_SAVING':
    return Object.assign({}, state, { saving: true });

  case 'STOP_SAVING':
    return Object.assign({}, state, { saving: false });

  case 'SET_ERROR':
    console.error(action.error);
    return Object.assign({}, state, { error: action.error });

  case 'SET_SELECTION_MODE':
    return deepMerge(state, { selection: { mode: action.mode } });

  case 'SET_SELECTION':
    newState = deepMerge(state, { selection: action.selection });
    newState.selection.creature = action.selection.creature;

    console.log('Selection:');
    console.log(newState.selection);
    return newState;

  case 'SET_CURSOR_CREATURES':
    return deepMerge(state, { cursor: { creatures: action.creatures } });

  case 'SET_CURSOR_MODEL':
    return deepMerge(state, { cursor: { model: action.model } });

  case 'SET_CURSOR_FILTER':
    return deepMerge(state, { cursor: { filter: action.filter } });

  case 'ADD_COMBATANT':
    newCombatants = [];

    for (let combatant of state.combat.combatants) {
      newCombatants.push(combatant);
    }
    newCombatants.push(action.combatant);
    newCombatants.sort((a, b) => {
      return b.combatData.initiative - a.combatData.initiative;
    });
    return deepMerge(state, { combat: { combatants: newCombatants } });

  case 'REMOVE_COMBATANT':
    newCombatants = [];

    for (let combatant of state.combat.combatants) {
      if (combatant !== action.combatant) {
        newCombatants.push(deepMerge({}, combatant));
      }
    }
    newCombatants.sort((a, b) => {
      return b.combatData.initiative - a.combatData.initiative;
    });

    return deepMerge(state, { combat: { combatants: newCombatants } });

  case 'CLEAR_COMBATANTS':
    return deepMerge(state, { combat: initialState.combat });

  case 'SET_TURN':
    newCombatants = [];
    let newRound = state.combat.round + action.roundDelta;

    for (let index in state.combat.combatants) {
      newCombatants.push(deepMerge({}, state.combat.combatants[index]));
      newCombatants[index].combatData.isTurn = false;
    }
    newCombatants.sort((a, b) => {
      return b.combatData.initiative - a.combatData.initiative;
    });
    newCombatants[action.turnIndex].combatData.isTurn = true;

    return deepMerge(state, {
      combat: { round: newRound, combatants: newCombatants },
    });

  case 'SET_TIME':
    return deepMerge(state, { combat: { timer: action.time } });

  case 'ADD_TIME':
    newCombatants = [];

    for (let index in state.combat.combatants) {
      let newCombatant = deepMerge({}, state.combat.combatants[index]);
      if (index === action.index) {
        newCombatant.combatData.timer =
            newCombatant.combatData.timer + action.time;
      }
      newCombatants.push(newCombatant);
    }

    return deepMerge(state, { combat: { combatants: newCombatants } });

  case 'SET_INITIATIVE':
    newCombatants = [];

    for (let combatant of state.combat.combatants) {
      let newCombatant = deepMerge({}, combatant);
      if (isSelectedCombatant(combatant)) {
        newCombatant.combatData.initiative = action.initiative;
      }
      newCombatants.push(newCombatant);
      // Refresh Combat Selection
      if (isSelectedCombatant(newCombatant)) {
        newCombatSelection = newCombatant;
      }
    }
    newCombatants.sort((a, b) => {
      return b.combatData.initiative - a.combatData.initiative;
    });

    return deepMerge(state, {
      combat: { combatants: newCombatants, selection: newCombatSelection },
    });

  case 'SET_HEALTH_DELTA':
    newCombatants = [];

    for (let combatant of state.combat.combatants) {
      let newCombatant = deepMerge({}, combatant);

      if (isSelectedCombatant(combatant)) {
        newCombatant.combatData.healthDelta = action.healthDelta;
        if (
          newCombatant.creatureData.hp +
              newCombatant.combatData.healthDelta <=
            0
        ) {
          newCombatant.combatData.isDead = true;
        } else {
          newCombatant.combatData.isDead = false;
        }
      }
      newCombatants.push(newCombatant);
      // Refresh Combat Selection
      if (isSelectedCombatant(newCombatant)) {
        newCombatSelection = newCombatant;
      }
    }
    newCombatants.sort((a, b) => {
      return b.combatData.initiative - a.combatData.initiative;
    });

    return deepMerge(state, {
      combat: { combatants: newCombatants, selection: newCombatSelection },
    });

  case 'SET_COMBAT_SELECTION':
    newState = Object.assign({}, state);

    newState.combat.selection = action.selectedCombatant;
    return newState;

  case 'SET_COMBAT_TITLE':
    newState = Object.assign({}, state);

    newState.combat.title = action.title;
    return newState;

  case 'SET_COMBAT':
    return Object.assign({}, state, { combat: action.combat });

  case 'SET_SELECT_SOURCE':
    newState = Object.assign({}, state);

    newState.selectData[action.model] = action.options;
    return newState;

  case 'SET_COMBATANTS':
    newCombatants = [];

    for (let combatant of state.combat.combatants) {
      let newCombatant = deepMerge({}, combatant);
      newCombatants.push(newCombatant);
      // Refresh Combat Selection
      if (isSelectedCombatant(newCombatant)) {
        newCombatSelection = newCombatant;
      }
    }
    newCombatants.sort((a, b) => {
      return b.combatData.initiative - a.combatData.initiative;
    });

    return deepMerge(state, {
      combat: { combatants: newCombatants, selection: newCombatSelection },
    });

  case 'SET_SPELL_LINK':
    return Object.assign({}, state, { spellLink: action.spellLink });
  }
};

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(ReduxThunk.default)
);

const ReduxMixin = PolymerRedux(store);

const AsyncActionsMixin = (superclass) =>
  class extends superclass {
    static get actions() {
      return {
        addCombatant: function (model, creature, creatureId) {
          let findIndex = (inModel, inCreatureId) => {
            let highestIndex = -1;
            let matchingCombatants = store
              .getState()
              .combat.combatants.filter(
                (combatant) =>
                  combatant.model === inModel &&
                  combatant.creatureId === inCreatureId
              );

            for (let match of matchingCombatants) {
              if (match.index > highestIndex) {
                highestIndex = match.index;
              }
            }
            highestIndex++;
            return highestIndex;
          };

          return function (dispatch) {
            if (model) {
              dispatch({ type: 'START_SAVING' });

              if (creature) {
                dispatch({
                  type: 'ADD_COMBATANT',
                  combatant: {
                    model: model,
                    creatureId: creature._id,
                    index: findIndex(model, creature._id),
                    creatureData: creature,
                    combatData: {
                      healthDelta: 0,
                      initiative:
                        Math.random() * 20 + 1 + creature.initiativeModifier,
                      status: '',
                      usedSlots: {},
                      isTurn: false,
                      isDead: false,
                      timer: 0,
                    },
                  },
                });
                dispatch({ type: 'STOP_SAVING' });
              } else {
                Models[model].find(
                  { _id: creatureId },
                  function (err, creaturefound) {
                    if (err) {
                      dispatch({ type: 'SET_ERROR', error: err });
                    } else {
                      dispatch({
                        type: 'ADD_COMBATANT',
                        combatant: {
                          model: model,
                          creatureId: creatureId,
                          index: findIndex(model, creatureId),
                          creatureData: creaturefound,
                          combatData: {
                            healthDelta: 0,
                            initiative:
                              Math.random() * 20 +
                              1 +
                              creaturefound.initiativeModifier,
                            status: '',
                            usedSlots: {},
                            isTurn: false,
                            isDead: false,
                            timer: 0,
                          },
                        },
                      });
                    }
                    dispatch({ type: 'STOP_SAVING' });
                  }
                );
              }
            }
          };
        },

        refreshCombatants: function () {
          return function (dispatch) {
            let combatants = store.getState().combat.combatants;
            let promises = [];

            for (let index in combatants) {
              let combatant = combatants[index];

              promises.push(
                new Promise(function (resolve, reject) {
                  dispatch(
                    'load',
                    combatant.model,
                    combatant.creatureId,
                    function (creature) {
                      combatant.creatureData = creature;
                      resolve();
                    }
                  );
                })
              );
            }
            Promise.all(promises).then(() => {
              dispatch({ type: 'SET_COMBATANTS', combatants: combatants });
            });
          };
        },

        loadCursor: function (callback) {
          return function (dispatch) {
            let cursor = store.getState().cursor;

            if (
              cursor.filter.name &&
              cursor.filter.name['$regex'] &&
              !(cursor.filter.name['$regex'] instanceof RegExp)
            ) {
              delete cursor.filter.name;
            }

            dispatch({ type: 'START_LOADING' });

            Models[cursor.model]
              .find(cursor.filter)
              .sort({ name: 1 })
              .exec(function (err1, creatures) {
                if (err1) {
                  dispatch({ type: 'SET_ERROR', error: err1 });
                } else {
                  dispatch({
                    type: 'SET_CURSOR_CREATURES',
                    creatures: creatures,
                  });

                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                }
                dispatch({ type: 'STOP_LOADING' });
              });
          };
        },

        loadSelectSource: function (model, callback) {
          return function (dispatch) {
            if (model) {
              dispatch({ type: 'START_LOADING' });
              Models[model]
                .find({}, { label: 1, value: 1, title: 1 })
                .sort({ sort: 1 })
                .exec(function (err, docs) {
                  if (err) {
                    dispatch({ type: 'SET_ERROR', error: err });
                  } else {
                    dispatch({
                      type: 'SET_SELECT_SOURCE',
                      model: model,
                      options: docs,
                    });
                    if (callback && typeof callback === 'function') {
                      callback();
                    }
                  }
                  dispatch({ type: 'STOP_LOADING' });
                });
            }
          };
        },

        load: function (model, idOrFind, callback) {
          return function (dispatch) {
            let findObj = {};

            if (idOrFind instanceof Object) {
              findObj = idOrFind;
            } else {
              findObj = { _id: idOrFind };
            }

            if (model) {
              dispatch({ type: 'START_LOADING' });

              Models[model].find(findObj, function (err, docs) {
                if (err) {
                  dispatch({ type: 'SET_ERROR', error: err });
                } else {
                  if (callback && typeof callback === 'function') {
                    if (docs.length === 1) {
                      callback(docs[0]);
                    } else {
                      callback(docs);
                    }
                  }
                }
                dispatch({ type: 'STOP_LOADING' });
              });
            }
          };
        },

        save: function (model, doc, callback) {
          return function (dispatch) {
            dispatch({ type: 'START_SAVING' });

            if (doc._id) {
              Models[model].update(
                { _id: doc._id },
                doc,
                {},
                function (err1, numReplaced) {
                  if (err1) {
                    dispatch({ type: 'SET_ERROR', error: err1 });
                  }
                  dispatch({ type: 'STOP_SAVING' });
                }
              );
            } else {
              Models[model].insert(doc, function (err1) {
                if (err1) {
                  dispatch({ type: 'SET_ERROR', error: err1 });
                } else {
                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                }
                dispatch({ type: 'STOP_SAVING' });
              });
            }
          };
        },

        remove: function (model, id, callback) {
          return function (dispatch) {
            if (id && model) {
              dispatch({ type: 'START_SAVING' });

              Models[model].remove(
                { _id: id },
                {},
                function (err1, numRemoved) {
                  if (err1) {
                    dispatch({ type: 'SET_ERROR', error: err1 });
                  } else {
                    if (callback && typeof callback === 'function') {
                      callback(numRemoved);
                    }
                  }
                  dispatch({ type: 'STOP_SAVING' });
                }
              );
            }
          };
        },
      };
    }
  };
