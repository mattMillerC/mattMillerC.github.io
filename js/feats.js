import {
  utils_makePrerequisite,
  utils_combineText,
  utils_joinPhraseArray,
} from "../js/utils.js";
import Parser from '../util/Parser.js'

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="prerequisite margin-bottom_small"></div>
		<div class="text"></div>
	</div>`;

function renderSelection(feat, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;

	let sourceEl = rootEl.querySelector('.stats-wrapper .source');
	sourceEl.classList.add(`source${feat.source}`);
	sourceEl.setAttribute("title", Parser.sourceJsonToFull(feat.source));
	sourceEl.innerHTML = `${Parser.sourceJsonToAbv(feat.source)}`;

	const prerequisite = utils_makePrerequisite(feat.prerequisite);
	rootEl.querySelector('.stats-wrapper .prerequisite').innerHTML = (prerequisite ? "Prerequisite: " + prerequisite : "");
	addAttributeItem(feat.ability, feat.entries);
	rootEl.querySelector('.stats-wrapper .text').innerHTML = utils_combineText(feat.entries, "p");

	function addAttributeItem(abilityObj, textArray) {
		if (abilityObj === undefined) return;
		for (let i = 0; i < textArray.length; ++i) { 
			// insert the new list item at the head of the first list we find list; flag with "hasabilityitem" so we don't do it more than once
			if (textArray[i].type === "list" && textArray[i].hasabilityitem !== "YES") {
				textArray[i].hasabilityitem = "YES";
				textArray[i].items.unshift(abilityObjToListItem())
			}
		}

		function abilityObjToListItem() {
			const TO_MAX_OF_TWENTY = ", to a maximum of 20.";
			const abbArr = [];
			if (abilityObj.choose === undefined) {
				for (const att in abilityObj) {
					if (!abilityObj.hasOwnProperty(att)) continue;
					abbArr.push("Increase your " + Parser.attAbvToFull(att) + " score by " + abilityObj[att] + TO_MAX_OF_TWENTY);
				}
			} else {
				const choose = abilityObj.choose;
				for (let i = 0; i < choose.length; ++i) {
					if (choose[i].from.length === 6) {
						if (choose[i].textreference === "YES") { // only used in "Resilient"
							abbArr.push("Increase the chosen ability score by " + choose[i].amount + TO_MAX_OF_TWENTY);
						} else {
							abbArr.push("Increase one ability score of your choice by " + choose[i].amount + TO_MAX_OF_TWENTY);
						}
					} else {
						const from = choose[i].from;
						const amount = choose[i].amount;
						const abbChoices = [];
						for (let j = 0; j < from.length; ++j) {
							abbChoices.push(Parser.attAbvToFull(from[j]));
						}
						const abbChoicesText = utils_joinPhraseArray(abbChoices, ", ", " or ");
						abbArr.push("Increase your " + abbChoicesText + " by " + amount + TO_MAX_OF_TWENTY);
					}
				}
			}
			return abbArr.join(" ");
		}
	}
}

export {renderSelection};