"use strict";
const JSON_URL = "data/feats.json";
let tabledefault = "";
let featlist;

mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

function deselUa(val) {
	return val.startsWith(SRC_UA_PREFIX);
}

window.onload = function load() {
	loadJSON(JSON_URL, onJsonLoad);
};

function onJsonLoad(data) {
	tabledefault = $(".stats-wrapper").html();
	featlist = data.feat;

	// TODO prerequisite filter?
	const sourceFilter = getSourceFilter();
	const asiFilter = getAsiFilter();
	const filterBox = initFilterBox(
		sourceFilter,
		asiFilter
	);

	const featTable = $("table.feats");
	let tempString = "";
	for (let i = 0; i < featlist.length; i++) {
		const curfeat = featlist[i];
		const name = curfeat.name;
		const ability = utils_getAbilityData(curfeat.ability);
		if (!ability.asText) {
			ability.asText = STR_NONE;
		}
		curfeat._fAbility = ability.asCollection; // used when filtering
		let prereqText = utils_makePrerequisite(curfeat.prerequisite, true);
		if (!prereqText) {
			prereqText = STR_NONE;
		}
		const CLS_COL_1 = "table-cell table-cell--border name ";
		const CLS_COL_2 = `table-cell source source${curfeat.source}`;
		const CLS_COL_3 = "table-cell ability " + (ability.asText === STR_NONE ? "list-entry-none " : "");
		const CLS_COL_4 = "table-cell prerequisite hidden-mobile-down " + (prereqText === STR_NONE ? "list-entry-none " : "");

		tempString += `
			<tr class="table-row history-link" data-link="${encodeForHash(name)+HASH_LIST_SEP+encodeForHash(curfeat.source)}" data-title="${name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='${CLS_COL_1}'>${name}</span>
				<td class='${CLS_COL_2}' title='${Parser.sourceJsonToFull(curfeat.source)}'>${Parser.sourceJsonToAbv(curfeat.source)}</span>
				<td class='${CLS_COL_3}'>${ability.asText}</span>
				<td class='${CLS_COL_4}'>${prereqText}</span>
			</tr>`;

		// populate filters
		sourceFilter.addIfAbsent(curfeat.source);
	}
	featTable.append(tempString);

	// sort filters
	sourceFilter.items.sort(ascSort);

	// init list
	const list = search({
		valueNames: ['name', 'source', 'ability', 'prerequisite'],
		listClass: "feats"
	});

	filterBox.render();

	// filtering function
	$(filterBox).on(
		FilterBox.EVNT_VALCHANGE,
		handleFilterChange
	);

	// filtering function
	function handleFilterChange() {
		list.filter(function(item) {
			const f = filterBox.getValues();
			let filterId = $(item.elm).attr(FLTR_ID);
			if (filterId) {
				const ft = featlist[$(item.elm).attr(FLTR_ID)];

				return sourceFilter.toDisplay(f, ft.source) && asiFilter.toDisplay(f, ft._fAbility);
			} else {
				return true;
			}
		});
	}

	initHistory();
	handleFilterChange();
}

function loadhash(id) {
	$('.stats-wrapper').html(tabledefault);
	const feat = featlist[id];

	$('.stats-wrapper .source')
		.addClass(`source${feat.source}`)
		.attr('title', Parser.sourceJsonToFull(feat.source))
		.html(`${Parser.sourceJsonToAbv(feat.source)}`);

	const prerequisite = utils_makePrerequisite(feat.prerequisite);
	$('.stats-wrapper .prerequisite').html(prerequisite ? "Prerequisite: " + prerequisite : "");
	addAttributeItem(feat.ability, feat.entries);
	$('.stats-wrapper .text').html(utils_combineText(feat.entries, "p"));

	function addAttributeItem(abilityObj, textArray) {
		if (abilityObj === undefined) return;
		for (let i = 0; i < textArray.length; ++i) { // insert the new list item at the head of the first list we find list; flag with "hasabilityitem" so we don't do it more than once
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
				const choose=abilityObj.choose;
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
