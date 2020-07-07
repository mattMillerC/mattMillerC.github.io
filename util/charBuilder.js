import { readRouteView, readRouteSelection } from "./routing";
import loadModel from "./data";
import { resolveHash } from './renderTable.js';


let schema = {
  name: '',
  race: {
    id: '',
    source: '',
    name: 'Half-elf',
    choices: []
  },
  background: {
    id: '',
    source: '',
    name: 'Folk Hero',
    choices: []
  },
  levels: [
    {
      id: 'rogue',
      name: 'Rogue',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'rogue',
      name: 'Rogue',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'rogue',
      name: 'Rogue',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'rogue',
      name: 'Rogue',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'rogue',
      name: 'Rogue',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'rogue',
      name: 'Rogue',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'wizard',
      name: 'Wizard',
      hpRoll: 6,
      choices: [{}]
    },
    {
      id: 'wizard',
      name: 'Wizard',
      hpRoll: 6,
      choices: [{}]
    },
    {
      id: 'wizard',
      name: 'Wizard',
      hpRoll: 6,
      choices: [{}]
    }
  ]
}
let schema2 = {
  name: 'Woody',
  race: {
    id: '',
    source: '',
    name: 'Human',
    choices: []
  },
  background: {
    id: '',
    source: '',
    name: 'Action Figure',
    choices: []
  },
  levels: [
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
    {
      id: 'fighter',
      name: 'Fighter',
      hpRoll: 8,
      choices: [{
        
      }]
    },
  ]
}

const channel = document.createElement('div');
let selectedCharacter;

function getSelectedCharacter() {
  return selectedCharacter;
}

function getCharacterChannel() {
  return channel;
}

function emitChangeEvent(character = getSelectedCharacter(), characters = getCharacters()) {
  channel.dispatchEvent(new CustomEvent("character-selected", {
    bubbles: true,
    composed: true,
    detail: {
      character,
      characters
    }
  }));
}

function getCharacters() {
  return JSON.parse(window.sessionStorage.getItem("characters")) || [];
}

function saveCharacters(characters) {
  window.sessionStorage.setItem("characters", JSON.stringify(characters));
}

function initCharacter() {
  let characters = getCharacters();

  if (characters && characters.length) {
    let defaultCharIndex;
    for (let i = 0; i <= characters.length; i ++) {
      if (characters[i].isDefault) {
        defaultCharIndex = i;
        break;
      }
    }
    if (defaultCharIndex !== undefined) {
      selectCharacterFromIndex(defaultCharIndex);
    } else {
      selectCharacterFromIndex(0);
    }
  } else {
    addCharacter();
    window.setTimeout(() => {
      
    addCharacter("Woody", true)
    }, 10)
  }
}

function addCharacter(name, test) {
  let characters = getCharacters(),
    newChar = newCharacter(name, test);

  characters.push(newChar);
  saveCharacters(characters);
  selectCharacterFromIndex(characters.length - 1);
}

function newCharacter(name = "New Character", test) {
  let newCharacter = test ? JSON.parse(JSON.stringify(schema2)) : JSON.parse(JSON.stringify(schema));
  newCharacter.name = name;
  newCharacter.isDefault = true;
  newCharacter.id = Date.now();
  return newCharacter;
}

function findCharacterIndex(char) {
  let characters = getCharacters(),
    foundChar = characters.find(c => c.id === char.id),
    charIndex = characters.indexOf(foundChar);

  return charIndex;
}

function selectCharacter(char) {
  let charIndex = findCharacterIndex(char);

  if (charIndex > -1) {
    selectCharacterFromIndex(charIndex);
  } else {
    console.error("Selected character not found in character options");
  }
}

function selectCharacterFromIndex(index) {
  let characters = getCharacters();

  if (characters[index]) {
    selectedCharacter = characters[index];
    makeDefault(selectedCharacter);
    emitChangeEvent(selectedCharacter, characters);
  } else {
    console.error("Selected character index not found");
  }
}

function makeDefault(char) {
  let characters = getCharacters();
  for (let character of characters) {
    if (character === char) {
      character.isDefault = true
    } else {
      character.isDefault = false;
    }
  }
}

function addFeature(type, feature, character = selectedCharacter) {
  if (feature && character) {
    mergeFeature(character, feature, type);
    emitChangeEvent();
  }
}

async function addFeatureById(type = readRouteView(), id = readRouteSelection(), character = selectedCharacter) {
  if (character) {
    let data = await loadModel(type),
      selectedItem = resolveHash(data, id);

    if (selectedItem) {
      mergeFeature(character, selectedItem, type);
      emitChangeEvent();
    } else {
      console.error("Cannont find feature to add");
    }
  }
}

function mergeFeature(character, selectedItem, type) {
  if (type === "class") {
    mergeClass(character, selectedItem);
  } else {
    // backgrounds, feats, and races, currently just have to remove the 's'
    let featureKey = type.substring(0, type.length - 1);

    if (character[featureKey] === undefined) {
      character[featureKey] = {};
    }
    character[featureKey].name = selectedItem.name;
    character[featureKey].source = selectedItem.source;
    character[featureKey].id = selectedItem.name + '_' + selectedItem.source;
    character[featureKey].choices = findChoices(selectedItem);
  }
  let characterIndex = findCharacterIndex(character),
    characters = getCharacters();

  characters[characterIndex] = character;
  saveCharacters(characters);
}

function mergeClass(character, selectedItem) {
  // todo
  if (character.levels === undefined) {
    character.levels = [];
  }
  character.levels.push({
    name: selectedItem.name,
    id: selectedItem.name + '_' + selectedItem.source
  });
}

function findChoices(feature) {
  // todo search for 'choice' entries and build option object;
  return {};
}

function getClassString(selectedCharacter) {
  if (selectedCharacter && selectedCharacter.levels) {
    // Group all levels by class
    let classLevels = selectedCharacter.levels.reduce((obj, level) => {
      if (level.name) {
        if (!obj.hasOwnProperty(level.name)) {
          obj[level.name] = 1;
        } else {
          obj[level.name] ++;
        }
      }
      return obj;
    }, {});

    let resultStr = "",
      joinStr = " / ";

    for (const [classStr, level] of Object.entries(classLevels)) {
      resultStr += `${classStr} ${level}${joinStr}`
    }
    // Trim the last joinString from the end
    resultStr = resultStr.substring(0, resultStr.length - joinStr.length);
    return resultStr;
  }
}

function getFeatureString(featureId, selectedCharacter) {
  if (featureId && selectedCharacter) {
    let featureName = "",
      featureVal = "";

    switch(featureId) {
      case "feats":
        featureName = "Feat";
        featureVal = selectedCharacter.feat ? selectedCharacter.feat.name : "None";
        break;
      case "classes":
        return "";
      case "backgrounds":
        featureName = "Background";
        featureVal = selectedCharacter.background ? selectedCharacter.background.name : "None";
        break;
      case "races":
        featureName = "Race";
        featureVal = selectedCharacter.race ? selectedCharacter.race.name : "None";
        break;
      default:
        return "";
    }
    return featureName + ": " + featureVal;
  }
}

export {
  addFeature,
  addFeatureById,
  selectCharacter,
  selectCharacterFromIndex,
  getCharacterChannel,
  getSelectedCharacter,
  initCharacter,
  getClassString,
  getFeatureString,
  findCharacterIndex
};