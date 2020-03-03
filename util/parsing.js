import Parser from './Parser';

export function utils_getAbilityData(abObj) {
  const ABILITIES = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  const mainAbs = [];
  const allAbs = [];
  const abs = [];
  const shortAbs = [];
  if (abObj !== undefined) {
    handleAllAbilities(abObj);
    handleAbilitiesChoose();utils_makePrerequisite
    return new AbilityData(abs.join("; "), shortAbs.join("; "), allAbs);
  }
  return new AbilityData("", "", []);

  function handleAllAbilities(abilityList) {
    for (let a = 0; a < ABILITIES.length; ++a) {
      handleAbility(abilityList, ABILITIES[a]);
    }
  }

  function handleAbility(parent, ab) {
    if (parent[ab.toLowerCase()] !== undefined) {
      const toAdd = `${ab} ${parent[ab.toLowerCase()] < 0 ? "" : "+"}${parent[ab.toLowerCase()]}`;
      abs.push(toAdd);
      shortAbs.push(toAdd);
      mainAbs.push(ab);
      allAbs.push(ab.toLowerCase());
    }
  }

  function handleAbilitiesChoose() {
    if (abObj.choose !== undefined) {
      for (let i = 0; i < abObj.choose.length; ++i) {
        const item = abObj.choose[i];
        let outStack = "";
        if (item.predefined !== undefined) {
          for (let j = 0; j < item.predefined.length; ++j) {
            const subAbs = [];
            handleAllAbilities(subAbs, item.predefined[j]);
            outStack += subAbs.join(", ") + (j === item.predefined.length - 1 ? "" : " or ");
          }
        } else {
          const allAbilities = item.from.length === 6;
          const allAbilitiesWithParent = isAllAbilitiesWithParent(item);
          let amount = item.amount === undefined ? 1 : item.amount;
          amount = (amount < 0 ? "" : "+") + amount;
          if (allAbilities) {
            outStack += "Any ";
          } else if (allAbilitiesWithParent) {
            outStack += "Any other ";
          }
          if (item.count !== undefined && item.count > 1) {
            outStack += getNumberString(item.count) + " ";
          }
          if (allAbilities || allAbilitiesWithParent) {
            outStack += amount;
          } else {
            for (let j = 0; j < item.from.length; ++j) {
              let suffix = "";
              if (item.from.length > 1) {
                if (j === item.from.length - 2) {
                  suffix = " or ";
                } else if (j < item.from.length - 2) {
                  suffix = ", ";
                }
              }
              let thsAmount = " " + amount;
              if (item.from.length > 1) {
                if (j !== item.from.length - 1) {
                  thsAmount = "";
                }
              }
              outStack += item.from[j].uppercaseFirst() + thsAmount + suffix;
            }
          }
        }
        abs.push(outStack);
        shortAbs.push(outStack.uppercaseFirst());
      }
    }
  }

  function isAllAbilitiesWithParent(chooseAbs) {
    const tempAbilities = [];
    for (let i = 0; i < mainAbs.length; ++i) {
      tempAbilities.push(mainAbs[i].toLowerCase());
    }
    for (let i = 0; i < chooseAbs.from.length; ++i) {
      const ab = chooseAbs.from[i].toLowerCase();
      if (!tempAbilities.includes(ab)) tempAbilities.push(ab);
      if (!allAbs.includes(ab.toLowerCase)) allAbs.push(ab.toLowerCase());
    }
    return tempAbilities.length === 6;
  }
  function getNumberString(amount) {
    if (amount === 1) return "one";
    if (amount === 2) return "two";
    if (amount === 3) return "three";
    else return amount;
  }
}

class AbilityData {
  constructor(asText, asTextShort, asCollection) {
    this.asText = asText;
    this.asTextShort = asTextShort;
    this.asCollection = asCollection;
  }
}

export function utils_makePrerequisite(prereqList, shorthand, makeAsArray) {
  shorthand = shorthand === undefined || shorthand === null ? false : shorthand;
  makeAsArray = makeAsArray === undefined || makeAsArray === null ? false : makeAsArray;
  const outStack = [];
  if (prereqList === undefined || prereqList === null) return "";
  for (let i = 0; i < prereqList.length; ++i) {
    const pre = prereqList[i];
    if (pre.race !== undefined) {
      for (let j = 0; j < pre.race.length; ++j) {
        if (shorthand) {
          const DASH = "-";
          const raceNameParts = pre.race[j].name.split(DASH);
          let raceName = [];
          for (let k = 0; k < raceNameParts.length; ++k) {
            raceName.push(raceNameParts[k].uppercaseFirst());
          }
          raceName = raceName.join(DASH);
          outStack.push(raceName + (pre.race[j].subrace !== undefined ? " (" + pre.race[j].subrace + ")" : ""));
        } else {
          const raceName = j === 0 ? pre.race[j].name.uppercaseFirst() : pre.race[j].name;
          outStack.push(raceName + (pre.race[j].subrace !== undefined ? " (" + pre.race[j].subrace + ")" : ""));
        }
      }
    }
    if (pre.ability !== undefined) {
      // this assumes all ability requirements are the same (13), correct as of 2017-10-06
      let attCount = 0;
      for (let j = 0; j < pre.ability.length; ++j) {
        for (const att in pre.ability[j]) {
          if (!pre.ability[j].hasOwnProperty(att)) continue;
          if (shorthand) {
            outStack.push(att.uppercaseFirst() + (attCount === pre.ability.length - 1 ? " 13+" : ""));
          } else {
            outStack.push(Parser.attAbvToFull(att) + (attCount === pre.ability.length - 1 ? " 13 or higher" : ""));
          }
          attCount++;
        }
      }
    }
    if (pre.proficiency !== undefined) {
      // only handles armor proficiency requirements,
      for (let j = 0; j < pre.proficiency.length; ++j) {
        for (const type in pre.proficiency[j]) {
          // type is armor/weapon/etc.
          if (!pre.proficiency[j].hasOwnProperty(type)) continue;
          if (type === "armor") {
            if (shorthand) {
              outStack.push("prof " + Parser.armorFullToAbv(pre.proficiency[j][type]) + " armor");
            } else {
              outStack.push("Proficiency with " + pre.proficiency[j][type] + " armor");
            }
          }
        }
      }
    }
    if (pre.spellcasting === "YES") {
      if (shorthand) {
        outStack.push("Spellcasting");
      } else {
        outStack.push("The ability to cast at least one spell");
      }
    }
  }
  if (makeAsArray) {
    return outStack;
  } else {
    if (shorthand) return outStack.join("/");
    else return utils_joinPhraseArray(outStack, ", ", " or ");
  }
}

export function utils_joinPhraseArray(array, joiner, lastJoiner) {
  if (array.length === 0) return "";
  if (array.length === 1) return array[0];
  if (array.length === 2) return array.join(lastJoiner);
  else {
    let outStr = "";
    for (let i = 0; i < array.length; ++i) {
      outStr += array[i];
      if (i < array.length - 2) outStr += joiner;
      else if (i === array.length - 2) outStr += lastJoiner;
    }
    return outStr;
  }
}
