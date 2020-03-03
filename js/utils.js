import Parser from '../util/Parser.js';
import {Filter, FilterBox} from '../util/Filter.js';
import {
  HASH_LIST_SEP,
  ID_SEARCH_BAR,
  ID_RESET_BUTTON,
  TYP_STRING,
  TYP_NUMBER,
  TYP_OBJECT,
  ATB_STYLE,
  STL_DISPLAY_INITIAL,
  STL_DISPLAY_NONE,
  STR_NONE,
  ABIL_CH_ANY,
  SRC_UA_PREFIX,
  SRC_PSA,
  SRC_PSK,
  SRC_EEPC,
  SRC_PSI,
  SRC_PSZ,
  SRC_PS_PREFIX,
  SRC_3PP_SUFFIX
} from "../util/consts.js";
import List from '../lib/list.js';

let throttle = (fn, wait) => {
	var time = Date.now();
	return function() {
		if (time + wait - Date.now() < 0) {
			fn();
			time = Date.now();
		}
	};
};

let debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// STRING ==============================================================================================================
// Appropriated from StackOverflow (literally, the site uses this code)
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
	let str = this.toString();
	if (arguments.length) {
		const t = typeof arguments[0];
		let key;
		const args = TYP_STRING === t || TYP_NUMBER === t ?
			Array.prototype.slice.call(arguments)
			: arguments[0];

		for (key in args) {
			str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
		}
	}

	return str;
};

function utils_joinPhraseArray(array, joiner, lastJoiner) {
	if (array.length === 0) return "";
	if (array.length === 1) return array[0];
	if (array.length === 2) return array.join(lastJoiner);
	else {
		let outStr = "";
		for (let i = 0; i < array.length; ++i) {
			outStr += array[i];
			if (i < array.length-2) outStr += joiner;
			else if (i === array.length-2) outStr += lastJoiner
		}
		return outStr;
	}
}

String.prototype.uppercaseFirst = String.prototype.uppercaseFirst ||
function () {
	const str = this.toString();
	if (str.length === 0) return str;
	if (str.length === 1) return str.charAt(0).toUpperCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
};

function uppercaseFirst(string) {
	return string.uppercaseFirst();
}

// TEXT COMBINING ======================================================================================================
function utils_combineText(textList, tagPerItem, textBlockInlineTitle) {
	tagPerItem = tagPerItem === undefined ? null : tagPerItem;
	textBlockInlineTitle = textBlockInlineTitle === undefined ? null : textBlockInlineTitle;
	let textStack = "";
	if (typeof textList === TYP_STRING) {
		return getString(textList, true)
	}
	for (let i = 0; i < textList.length; ++i) {
		if (typeof textList[i] === TYP_OBJECT) {
			if (textList[i].islist === "YES") {
				textStack += utils_makeOldList(textList[i]);
			}
			if (textList[i].type === "list") {
				textStack += utils_makeList(textList[i]);
			}
			if (textList[i].hassubtitle === "YES") {
				// if required, add inline header before we go deeper
				if (textBlockInlineTitle !== null && i === 0) {
					textStack += textBlockInlineTitle;
				}
				textStack += utils_combineText(textList[i].text, tagPerItem, utils_makeSubHeader(textList[i].title));
			}
			if (textList[i].istable === "YES") {
				textStack += utils_makeTable(textList[i]);
			}
			if (textList[i].hassavedc === "YES") {
				textStack += utils_makeAttDc(textList[i]);
			}
			if (textList[i].hasattackmod === "YES") {
				textStack += utils_makeAttAttackMod(textList[i]);
			}
		} else {
			textStack += getString(textList[i], textBlockInlineTitle !== null && i === 0)
		}
	}
	return textStack;

	function getString(text, addTitle) {
		const openTag = tagPerItem === null ? "" : "<" + tagPerItem + ">";
		const closeTag = tagPerItem === null ? "" : "</" + tagPerItem + ">";
		const inlineTitle = addTitle ? textBlockInlineTitle : "";
		return openTag + inlineTitle + text + closeTag;
	}
}

function utils_makeTable(tableObject) {
	let tableStack = "<table class='table'>";
	if (tableObject.caption !== undefined) {
		tableStack += "<caption>" + tableObject.caption + "</caption>";
	}
	tableStack += "<thead><tr class='table-row table-row--header'>";

	for (let i = 0; i < tableObject.thead.length; ++i) {
		tableStack += "<th" + makeTableThClassText(tableObject, i) + ">" + tableObject.thead[i] + "</th>"
	}

	tableStack += "</tr></thead><tbody>";
	for (let i = 0; i < tableObject.tbody.length; ++i) {
		tableStack += "<tr class='table-row'>";
		for (let j = 0; j < tableObject.tbody[i].length; ++j) {
			tableStack += "<td" + makeTableTdClassText(tableObject, j) + ">" + tableObject.tbody[i][j] + "</td>";
		}
		tableStack += "</tr>";
	}
	tableStack += "</tbody></table>";
	return tableStack;
}

function utils_makeAttDc(attDcObj) {
	return "<p class='spellabilitysubtext'><span>" + attDcObj.name
		+ " save DC</span> = 8 + your proficiency bonus + your "
		+ utils_makeAttChoose(attDcObj.attributes) + "</p>"
}
function utils_makeAttAttackMod(attAtkObj) {
	return "<p class='spellabilitysubtext'><span>" + attAtkObj.name
		+ " attack modifier</span> = your proficiency bonus + your "
		+ utils_makeAttChoose(attAtkObj.attributes) + "</p>"
}
function utils_makeLink(linkObj) {
	let href;
	if (linkObj.href.type === "internal") {
		href = `${linkObj.href.path}#`;
		if (linkObj.href.hash !== undefined) {
			if (linkObj.href.hash.type === "constant") {
				href += linkObj.href.hash.value;
			} else if (linkObj.href.hash.type === "multipart") {
				const partStack = [];
				for (let i = 0; i < linkObj.href.hash.parts.length; i++) {
					const part = linkObj.href.hash.parts[i];
					partStack.push(`${part.key}:${part.value}`)
				}
				href += partStack.join(",");
			}
		}
	} else if (linkObj.href.type === "external") {
		href = linkObj.href.url;
	}
	return `<a href='${href}'>${linkObj.text}</a>`;
}
function utils_makeOldList(listObj) { //to handle islist === "YES"
	let outStack = "<ul>";
	for (let i = 0; i < listObj.items.length; ++i) {
		const cur = listObj.items[i];
		outStack += "<li>";
		for (let j = 0; j < cur.entries.length; ++j) {
			if (cur.entries[j].hassubtitle === "YES") {
				outStack += "<br>" + utils_makeListSubHeader(cur.entries[j].title) + cur.entries[j].entries;
			} else {
				outStack += cur.entries[j];
			}
		}
		outStack += "</li>";
	}
	return outStack + "</ul>";
}
function utils_makeList(listObj) { //to handle type === "list"
	let listTag = "ul";
	const subtype = listObj.subtype;
	let suffix = "";
	if(subtype === "ordered") {
		listTag = "ol";
		if (listObj.ordering) suffix = " type=\""+listObj.ordering+"\"";
	}//NOTE: "description" lists are more complex - can handle those later if required
	let outStack = "<"+listTag+suffix+">";
	for (let i = 0; i < listObj.items.length; ++i) {
		const listItem = listObj.items[i];
		outStack += "<li>";
		for (let j = 0; j < listItem.length; ++j) {
			if (listItem[j].type === "link") {
				outStack += utils_makeLink(listItem[j]);
			} else {
				outStack += listItem[j];
			}
		}
		outStack += "</li>";
	}
	return outStack + "</"+listTag+">";
}
function utils_makeSubHeader(text) {
	return "<span class='stats-sub-header'>" + text + ".</span> "
}
function utils_makeListSubHeader(text) {
	return "<span class='stats-list-sub-header'>" + text + ".</span> "
}
function utils_makeAttChoose(attList) {
	if (attList.length === 1) {
		return Parser.attAbvToFull(attList[0]) + " modifier";
	} else {
		const attsTemp = [];
		for (let i = 0; i < attList.length; ++i) {
			attsTemp.push(Parser.attAbvToFull(attList[i]));
		}
		return attsTemp.join(" or ") + " modifier (your choice)";
	}
}

function utils_makeRoller(text) {
	const DICE_REGEX = /([1-9]\d*)?d([1-9]\d*)(\s?[+-]\s?\d+)?/g;
	return text.replace(DICE_REGEX, "<span class='roller' data-roll='$&'>$&</span>").replace(/(-|\+)?\d+(?= to hit)/g, "<span class='roller' data-roll='1d20$&'>$&</span>").replace(/(-|\+)?\d+(?= bonus to)/g, "<span class='roller' data-roll='1d20$&'>$&</span>").replace(/(bonus of )(=?-|\+\d+)/g, "$1<span class='roller' data-roll='1d20$2'>$2</span>");
}

function makeTableThClassText(tableObject, i) {
	return tableObject.thstyleclass === undefined || i >= tableObject.thstyleclass.length ? " class=\"table-cell\"" : " class=\"table-cell " + tableObject.thstyleclass[i] + "\"";
}
function makeTableTdClassText(tableObject, i) {
	if (tableObject.tdstyleclass !== undefined) {
		return tableObject.tdstyleclass === undefined || i >= tableObject.tdstyleclass.length ? " class=\"table-cell\"" : " class=\"table-cell " + tableObject.tdstyleclass[i] + "\"";
	} else {
		return makeTableThClassText(tableObject, i);
	}
}

function utils_makePrerequisite(prereqList, shorthand, makeAsArray) {
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
					outStack.push(raceName + (pre.race[j].subrace !== undefined ? " (" + pre.race[j].subrace + ")" : ""))
				} else {
					const raceName = j === 0 ? pre.race[j].name.uppercaseFirst() : pre.race[j].name;
					outStack.push(raceName + (pre.race[j].subrace !== undefined ? " (" + pre.race[j].subrace + ")" : ""))
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
						outStack.push(att.uppercaseFirst() + (attCount === pre.ability.length -1 ? " 13+" : ""));
					} else {
						outStack.push(Parser.attAbvToFull(att) + (attCount === pre.ability.length -1 ? " 13 or higher" : ""));
					}
					attCount++;
				}
			}
		}
		if (pre.proficiency !== undefined) {
			// only handles armor proficiency requirements,
			for (let j = 0; j < pre.proficiency.length; ++j) {
				for (const type in pre.proficiency[j]) { // type is armor/weapon/etc.
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

class AbilityData {
	constructor(asText, asTextShort, asCollection) {
		this.asText = asText;
		this.asTextShort = asTextShort;
		this.asCollection = asCollection;
	}
}
function utils_getAbilityData(abObj) {
	const ABILITIES = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
	const mainAbs = [];
	const allAbs = [];
	const abs = [];
	const shortAbs = [];
	if (abObj !== undefined) {
		handleAllAbilities(abObj);
		handleAbilitiesChoose();
		return new AbilityData(abs.join("; "), shortAbs.join("; "), allAbs);
	}
	return new AbilityData("", "", []);

	function handleAllAbilities(abilityList) {
		for (let a = 0; a < ABILITIES.length; ++a) {
			handleAbility(abilityList, ABILITIES[a])
		}
	}

	function handleAbility(parent, ab) {
		if (parent[ab.toLowerCase()] !== undefined) {
			const toAdd = `${ab} ${(parent[ab.toLowerCase()] < 0 ? "" : "+")}${parent[ab.toLowerCase()]}`;
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
								if (j === item.from.length-2) {
									suffix = " or ";
								} else if (j < item.from.length-2) {
									suffix = ", "
								}
							}
							let thsAmount = " " + amount;
							if (item.from.length > 1) {
								if (j !== item.from.length-1) {
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

// SOURCES =============================================================================================================
function hasBeenReprinted(shortName, source) {
	return (shortName !== undefined && shortName !== null && source !== undefined && source !== null) &&
		(shortName === "Sun Soul" && source === SRC_SCAG) ||
		(shortName === "Mastermind" && source === SRC_SCAG) ||
		(shortName === "Swashbuckler" && source === SRC_SCAG) ||
		(shortName === "Storm" && source === SRC_SCAG);
}

function isNonstandardSource(source) {
	return (source !== undefined && source !== null) && (source.startsWith(SRC_UA_PREFIX) || source === SRC_PSA || source === SRC_PSK || source === SRC_EEPC || source === SRC_PSI || source === SRC_PSZ);
}

// DATA LINKS ==========================================================================================================
function utils_nameToDataLink(name) {
	return encodeURIComponent(name.toLowerCase()).replace("'","%27");
}

// CONVENIENCE/ELEMENTS ================================================================================================
// TODO refactor/remove (switch to jQuery versions)
function toggleCheckBox(cb) {
	if (cb.checked === true) cb.checked = false;
	else cb.checked = true;
}
function stopEvent(event) {
	event.stopPropagation();
	event.preventDefault();
}
function toggleVisible(element) {
	if (isShowing(element)) hide(element);
	else show(element);
}
function isShowing(element) {
	return element.hasAttribute(ATB_STYLE) && element.getAttribute(ATB_STYLE).includes(STL_DISPLAY_INITIAL);
}
function show(element) {
	element.setAttribute(ATB_STYLE, STL_DISPLAY_INITIAL);
}
function hide(element) {
	element.setAttribute(ATB_STYLE, STL_DISPLAY_NONE);
}

function xor(a, b) {
	return !a !== !b;
}

/**
 * > implying
 */
function implies(a, b) {
	return (!a) || b;
}

// SEARCH AND FILTER ===================================================================================================
function search(options, rootEl) {
	const list = new List(rootEl.getElementById("listcontainer"), options);
	list.sort("name");
	rootEl.getElementById("reset").addEventListener('click', function() {
    rootEl.getElementById("search-field").value = "";
    list.search();
    list.sort("name");
    list.filter();
  });
	const listWrapper = rootEl.getElementById("listcontainer");
	if (listWrapper.lists) {
		listWrapper.lists.push(list);
	} else {
		listWrapper.lists = [list];
	}
	return list
}

/**
 * Generic source filter
 * deselected. If there are more items to be deselected than selected, it is advisable to set this to "true"
 * @param options overrides for the default filter options
 * @returns {*} a `Filter`
 */
function getSourceFilter(options) {
	const baseOptions = {
		header: "Source",
		displayFn: Parser.sourceJsonToFullCompactPrefix,
		selFn: defaultSourceSelFn
	};
	return getFilterWithMergedOptions(baseOptions, options);
}

function defaultSourceDeselFn(val) {
	return val.startsWith(SRC_UA_PREFIX) || val.startsWith(SRC_PS_PREFIX) || val.endsWith(SRC_3PP_SUFFIX);
}

function defaultSourceSelFn(val) {
	return !defaultSourceDeselFn(val);
}

function getAsiFilter(options) {
	const baseOptions = {
		header: "Ability Bonus",
		items: [
			"str",
			"dex",
			"con",
			"int",
			"wis",
			"cha"
		],
		displayFn: Parser.attAbvToFull
	};
	return getFilterWithMergedOptions(baseOptions, options);

	function filterAsiMatch(valGroup, parsedAsi) {
		return (valGroup[STR_NONE] && parsedAsi.asText === STR_NONE)
			|| (valGroup[ABIL_CH_ANY] && parsedAsi.asText.toLowerCase().includes("choose any"))
			|| parsedAsi.asCollection.filter(a => valGroup[Parser.attAbvToFull(a)]).length > 0;
	}
	function filterAsiMatchInverted(valGroup, parsedAsi) {
		return ( implies(parsedAsi.asText === STR_NONE, valGroup[STR_NONE]) )
			&& ( implies(parsedAsi.asText.toLowerCase().includes("choose any"), valGroup[ABIL_CH_ANY]) )
			&& (parsedAsi.asCollection.filter(a => !valGroup[Parser.attAbvToFull(a)]).length === 0);
	}
}

function getFilterWithMergedOptions(baseOptions, addOptions) {
	if (addOptions) Object.assign(baseOptions, addOptions); // merge in anything we get passed
	return new Filter(baseOptions);
}

function initFilterBox(rootEl, ...filterList) {
	return new FilterBox(rootEl, filterList);
}

// ENCODING/DECODING ===================================================================================================
function encodeForHash(toEncode) {
	if (toEncode instanceof Array) {
		return toEncode.map(i => encodeForHashHelper(i)).join(HASH_LIST_SEP);
	} else {
		return encodeForHashHelper(toEncode);
	}
	function encodeForHashHelper(part) {
		return encodeURIComponent(part).toLowerCase().replace("'","%27")
	}
}

// SORTING =============================================================================================================
// TODO refactor into a class
function ascSort(a, b) {
	if (b === a) return 0;
	return b < a ? 1 : -1;
}

function asc_sort(a, b){
	if ($(b).text() === $(a).text()) return 0;
	return $(b).text() < $(a).text() ? 1 : -1;
}

function asc_sort_cr(a, b) {
	const aNum = Parser.crToNumber($(a).text());
	const bNum = Parser.crToNumber($(b).text());
	if (aNum === bNum) return 0;
	return bNum < aNum ? 1 : -1;
}

function compareNames(a, b) {
	if (b._values.name.toLowerCase() === a._values.name.toLowerCase()) return 0;
	else if (b._values.name.toLowerCase() > a._values.name.toLowerCase()) return 1;
	else if (b._values.name.toLowerCase() < a._values.name.toLowerCase()) return -1;
}

// ARRAYS ==============================================================================================================
function joinConjunct(arr, joinWith, conjunctWith) {
	return arr.length === 1 ? String(arr[0]) : arr.length === 2 ? arr.join(conjunctWith) : arr.slice(0, -1).join(joinWith) + conjunctWith + arr.slice(-1);
}

// JSON LOADING ========================================================================================================
function loadJSON(url, onLoadFunction, ...otherData) {
	const request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.overrideMimeType("application/json");
	request.onload = function() {
		const data = JSON.parse(this.response);
		onLoadFunction(data, otherData);
	};
	request.send();
}

function parseHTML(str, isTable) {
	var tmp = document.implementation.createHTMLDocument();
	if (isTable) {
		tmp.body.innerHTML = "<table><tbody>" + str + "</tbody></table>";
		return tmp.body.children[0].children[0].children.length === 1
      ? tmp.body.children[0].children[0].children[0]
      : tmp.body.children[0].children[0];
	} else {
		tmp.body.innerHTML = str;
		return tmp.body.children.length === 1 ? tmp.body.children[0] : tmp.body.children;
	}
};

export {
  throttle,
  debounce,
  utils_joinPhraseArray,
  uppercaseFirst,
  utils_combineText,
  utils_makeTable,
  utils_makeAttDc,
  utils_makeAttAttackMod,
  utils_makeLink,
  utils_makeOldList,
  utils_makeList,
  utils_makeSubHeader,
  utils_makeListSubHeader,
  utils_makeAttChoose,
  utils_makeRoller,
  makeTableThClassText,
  makeTableTdClassText,
  utils_makePrerequisite,
  utils_getAbilityData,
  hasBeenReprinted,
  isNonstandardSource,
  utils_nameToDataLink,
  toggleCheckBox,
  stopEvent,
  toggleVisible,
  isShowing,
  show,
  hide,
  xor,
  implies,
  search,
  getSourceFilter,
  defaultSourceDeselFn,
  defaultSourceSelFn,
  getAsiFilter,
  getFilterWithMergedOptions,
  initFilterBox,
  encodeForHash,
  ascSort,
  asc_sort,
  asc_sort_cr,
  compareNames,
  joinConjunct,
  parseHTML
};