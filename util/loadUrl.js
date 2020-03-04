import {cloneDeep} from "../js/utils.js";
import Parser from "../util/Parser.js";

export default function loadUrl(url, skipCheck = false) {
  if (url.indexOf("/items.json") > -1 && !skipCheck) {
    return loadAllItemData(url);
  }
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (url.indexOf("bestiary.json") > -1) {
        return parseLegendaryMonsters(data);
      } else {
        return data;
      }
    });
};

function parseLegendaryMonsters(monsterData) {
  const legendaryGroupList = {};

  for (let legendaryGroup of monsterData.legendaryGroup) {
    legendaryGroupList[legendaryGroup.name] = {
      lairActions: legendaryGroup.lairActions,
      regionalEffects: legendaryGroup.regionalEffects
    };
  }

  for (let monster of monsterData.monster) {
    if (monster.legendaryGroup) {
      const legendaryGroup = monster.legendaryGroup;
      if (legendaryGroup) {
        const thisGroup = legendaryGroupList[legendaryGroup];
        if (thisGroup.lairActions) monster.lairaction = cloneDeep(thisGroup.lairActions);
        if (thisGroup.regionalEffects) monster.regionaleffect = cloneDeep(thisGroup.regionalEffects);
      }
    }
  }
  delete monsterData.legendaryGroup;
  return monsterData;
}

function loadAllItemData(itemData) {
  const ITEMS_JSON_URL = "/data/items.json";
  const BASIC_ITEMS_JSON_URL = "/data/basicitems.json";
  const MAGIC_VARIANTS_JSON_URL = "/data/magicvariants.json";
  const promises = [];
  promises.push(loadUrl(ITEMS_JSON_URL, true));
  promises.push(loadUrl(BASIC_ITEMS_JSON_URL, true));
  promises.push(loadUrl(MAGIC_VARIANTS_JSON_URL, true));
  return Promise.all(promises).then((data) => {
    return mergeItems(data[0], data[1], data[2]);
  });
}

function mergeItems(itemData, basicItemData, variantData) {
  const propertyList = {};
  const typeList = {};
  let itemList = itemData.item;

	let basicItemList = basicItemData.basicitem;
	const itemPropertyList = basicItemData.itemProperty;
	const itemTypeList = basicItemData.itemType;
	// Convert the property and type list JSONs into look-ups, i.e. use the abbreviation as a JSON property name
	for (let i = 0; i < itemPropertyList.length; i++) propertyList[itemPropertyList[i].abbreviation] = itemPropertyList[i].name ? JSON.parse(JSON.stringify(itemPropertyList[i])) : {"name": itemPropertyList[i].entries[0].name.toLowerCase(), "entries": itemPropertyList[i].entries};
	for (let i = 0; i < itemTypeList.length; i++) typeList[itemTypeList[i].abbreviation] = itemTypeList[i].name ? JSON.parse(JSON.stringify(itemTypeList[i])): {"name": itemTypeList[i].entries[0].name.toLowerCase(), "entries": itemTypeList[i].entries};

	let variantList = variantData.variant;
	itemList = itemList.concat(basicItemList);
	for (let i = 0; i < variantList.length; i++) {
		variantList[i].tier = variantList[i].inherits.tier;
		variantList[i].rarity = variantList[i].inherits.rarity;
		variantList[i].source = variantList[i].inherits.source;
		variantList[i].page = variantList[i].inherits.page;
		if(!variantList[i].entries && variantList[i].inherits.entries) variantList[i].entries=JSON.parse(JSON.stringify(variantList[i].inherits.entries));
		if(variantList[i].requires.armor) variantList[i].armor = variantList[i].requires.armor
	}
	itemList = itemList.concat(variantList);
	for (let i = 0; i < basicItemList.length; i++) {
		const curBasicItem = basicItemList[i];
		basicItemList[i].category = "Basic";
		if(curBasicItem.entries === undefined) curBasicItem.entries=[];
		const curBasicItemName = curBasicItem.name.toLowerCase();
		for (let j = 0; j < variantList.length; j++) {
			const curVariant = variantList[j];
			const curRequires = curVariant.requires;
			let hasRequired = curBasicItemName.indexOf(" (") === -1;
			for (const requiredProperty in curRequires) if (curRequires.hasOwnProperty(requiredProperty) && curBasicItem[requiredProperty] !== curRequires[requiredProperty]) hasRequired=false;
			if (curVariant.excludes) {
				const curExcludes = curVariant.excludes;
				for (const excludedProperty in curExcludes) if (curExcludes.hasOwnProperty(excludedProperty) && curBasicItem[excludedProperty] === curExcludes[excludedProperty]) hasRequired=false;
			}
			if (hasRequired) {
				const curInherits = curVariant.inherits;
				const tmpBasicItem = JSON.parse(JSON.stringify(curBasicItem));
				delete tmpBasicItem.value; // Magic items do not inherit the value of the non-magical item
				tmpBasicItem.category = "Specific Variant";
				for (const inheritedProperty in curInherits) {
					if (curInherits.hasOwnProperty(inheritedProperty)) {
						if (inheritedProperty === "namePrefix") {
							tmpBasicItem.name = curInherits.namePrefix+tmpBasicItem.name;
						} else if (inheritedProperty === "nameSuffix") {
							tmpBasicItem.name += curInherits.nameSuffix;
						} else if (inheritedProperty === "entries") {
							for (let k = curInherits.entries.length-1; k > -1; k--) {
								let tmpText = curInherits.entries[k];
								if (typeof tmpText === "string") {
									if (tmpBasicItem.dmgType) tmpText = tmpText.replace("{@dmgType}", Parser.dmgTypeToFull(tmpBasicItem.dmgType));
									if (curInherits.genericBonus) tmpText = tmpText.replace("{@genericBonus}", curInherits.genericBonus);
									if (tmpText.indexOf("{@lowerName}") !== -1) tmpText = tmpText.split("{@lowerName}").join(curBasicItemName);
								}
								tmpBasicItem.entries.unshift(tmpText);
							}
						} else
							tmpBasicItem[inheritedProperty] = curInherits[inheritedProperty];
					}
				}
				itemList.push(tmpBasicItem);
			}
		}
	}
	
	for (let i = 0; i < itemList.length; i++) {
		const item = itemList[i];
		if (item.noDisplay) continue;
		if (itemList[i].type === "GV") itemList[i].category = "Generic Variant";
		if (itemList[i].category === undefined) itemList[i].category = "Other";
		if (item.entries === undefined) itemList[i].entries=[];
		if (item.type && typeList[item.type]) for (let j = 0; j < typeList[item.type].entries.length; j++) itemList[i].entries = pushObject(itemList[i].entries,typeList[item.type].entries[j]);
		if (item.property) {
			const properties = item.property.split(",");
			for (let j = 0; j < properties.length; j++) if (propertyList[properties[j]].entries) for (let k = 0; k < propertyList[properties[j]].entries.length; k++) itemList[i].entries = pushObject(itemList[i].entries,propertyList[properties[j]].entries[k]);
		}
		//The following could be encoded in JSON, but they depend on more than one JSON property; maybe fix if really bored later
		if (item.armor) {
			if (item.resist) itemList[i].entries = pushObject(itemList[i].entries,"You have resistance to "+item.resist+" damage while you wear this armor.");
			if (item.armor && item.stealth) itemList[i].entries = pushObject(itemList[i].entries,"The wearer has disadvantage on Stealth (Dexterity) checks.");
			if (item.type === "HA" && item.strength) itemList[i].entries = pushObject(itemList[i].entries,"If the wearer has a Strength score lower than " + item.strength + ", their speed is reduced by 10 feet.");
		} else if (item.resist) {
			if (item.type === "P") itemList[i].entries = pushObject(itemList[i].entries,"When you drink this potion, you gain resistance to "+item.resist+" damage for 1 hour.");
			if (item.type === "RG") itemList[i].entries = pushObject(itemList[i].entries,"You have resistance to "+item.resist+" damage while wearing this ring.");
		}
		if (item.type === "SCF") {
			if (item.scfType === "arcane") itemList[i].entries = pushObject(itemList[i].entries,"An arcane focus is a special item designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus, using it in place of any material component which does not list a cost.");
			if (item.scfType === "druid") itemList[i].entries = pushObject(itemList[i].entries,"A druid can use such a druidic focus as a spellcasting focus, using it in place of any material component that does not have a cost.");
			if (item.scfType === "holy") {
				itemList[i].entries = pushObject(itemList[i].entries,"A holy symbol is a representation of a god or pantheon.");
				itemList[i].entries = pushObject(itemList[i].entries,"A cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.");
			}
		}
	}
	for (let i = 0; i < itemList.length; i++) {
		const item = itemList[i];
		if (item.noDisplay) continue;
		if (itemList[i].type === "GV") itemList[i].category = "Generic Variant";
		if (itemList[i].category === undefined) itemList[i].category = "Other";
		if (item.entries === undefined) itemList[i].entries=[];
		if (item.type && typeList[item.type]) for (let j = 0; j < typeList[item.type].entries.length; j++) itemList[i].entries = pushObject(itemList[i].entries,typeList[item.type].entries[j]);
		if (item.property) {
			const properties = item.property.split(",");
			for (let j = 0; j < properties.length; j++) if (propertyList[properties[j]].entries) for (let k = 0; k < propertyList[properties[j]].entries.length; k++) itemList[i].entries = pushObject(itemList[i].entries,propertyList[properties[j]].entries[k]);
		}
		//The following could be encoded in JSON, but they depend on more than one JSON property; maybe fix if really bored later
		if (item.armor) {
			if (item.resist) itemList[i].entries = pushObject(itemList[i].entries,"You have resistance to "+item.resist+" damage while you wear this armor.");
			if (item.armor && item.stealth) itemList[i].entries = pushObject(itemList[i].entries,"The wearer has disadvantage on Stealth (Dexterity) checks.");
			if (item.type === "HA" && item.strength) itemList[i].entries = pushObject(itemList[i].entries,"If the wearer has a Strength score lower than " + item.strength + ", their speed is reduced by 10 feet.");
		} else if (item.resist) {
			if (item.type === "P") itemList[i].entries = pushObject(itemList[i].entries,"When you drink this potion, you gain resistance to "+item.resist+" damage for 1 hour.");
			if (item.type === "RG") itemList[i].entries = pushObject(itemList[i].entries,"You have resistance to "+item.resist+" damage while wearing this ring.");
		}
		if (item.type === "SCF") {
			if (item.scfType === "arcane") itemList[i].entries = pushObject(itemList[i].entries,"An arcane focus is a special item designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus, using it in place of any material component which does not list a cost.");
			if (item.scfType === "druid") itemList[i].entries = pushObject(itemList[i].entries,"A druid can use such a druidic focus as a spellcasting focus, using it in place of any material component that does not have a cost.");
			if (item.scfType === "holy") {
				itemList[i].entries = pushObject(itemList[i].entries,"A holy symbol is a representation of a god or pantheon.");
				itemList[i].entries = pushObject(itemList[i].entries,"A cleric or paladin can use a holy symbol as a spellcasting focus, using it in place of any material components which do not list a cost. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.");
			}
		}
  }
  return itemList;
}

function pushObject(targetObject, objectToBePushed) {
	const copiedObject = JSON.parse(JSON.stringify(targetObject));
	copiedObject.push(objectToBePushed);
	return copiedObject;
}