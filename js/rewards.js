"use strict";

const JSON_URL = "data/rewards.json";

let tableDefault;
let rewardList;

mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

window.onload = function load() {
	loadJSON(JSON_URL, onJsonLoad);
};

function onJsonLoad(data) {
	tableDefault = $(".stats-wrapper").html();
	rewardList = data.reward;

	const sourceFilter = getSourceFilter();
	const typeFilter = new Filter({
		header: "Type",
		items: [
			"Blessing",
			"Boon",
			"Charm",
			"Demonic Boon"
		]
	});

	const filterBox = initFilterBox(sourceFilter, typeFilter);

	let tempString = "";
	for (let i = 0; i < rewardList.length; i++) {
		const reward = rewardList[i];
		const displayName = reward.type === "Demonic Boon" ? "Demonic Boon: " + reward.name : reward.name;

		const CLS_COL_1 = "table-cell table-cell--border name ";
		const CLS_COL_2 = `table-cell source source${reward.source}`;

		tempString += `
			<tr class="table-row history-link" data-link="${encodeURIComponent(reward.name).toLowerCase().replace("'","%27")}" data-title="${reward.name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='${CLS_COL_1}'>${reward.name}</td>
				<td class='${CLS_COL_2}' style='width: 73px;' title="${Parser.sourceJsonToFull(reward.source)}">${Parser.sourceJsonToAbv(reward.source)}</td>
			</tr>`;

		// populate filters
		sourceFilter.addIfAbsent(reward.source);
	}
	$(".list.rewards").append(tempString);

	// sort filters
	sourceFilter.items.sort(ascSort);

	const list = search({
		valueNames: ["name", "source"],
		listClass: "rewards"
	});

	filterBox.render();

	// filtering function
	$(filterBox).on(
		FilterBox.EVNT_VALCHANGE,
		handleFilterChange
	);

	function handleFilterChange() {
		list.filter(function(item) {
			const f = filterBox.getValues();
			let filterId = $(item.elm).attr(FLTR_ID);

			if (filterId) {
				const r = rewardList[filterId];

				return sourceFilter.toDisplay(f, r.source) && typeFilter.toDisplay(f, r.type);
			} else {
				return true
			}
		});
	}

	initHistory();
	handleFilterChange();
}

function loadhash (id) {
	$(".stats-wrapper").html(tableDefault);
	const reward = rewardList[id];

	const name = reward.type === "Demonic Boon" ? "Demonic Boon: " + reward.name : reward.name;
	
	$('.stats-wrapper .source')
		.addClass(`source${reward.source}`)
		.attr('title', Parser.sourceJsonToFull(reward.source))
		.html(`${Parser.sourceJsonToAbv(reward.source)}`);

	const textlist = reward.text;
	let texthtml = "";

	if (reward.ability !== undefined) texthtml += utils_combineText(reward.ability.text, "p", "<span class='stat-name'>Ability Score Adjustment:</span> ");
	if (reward.signaturespells !== undefined) texthtml += utils_combineText(reward.signaturespells.text ? reward.signaturespells.text : "None", "p", "<span class='stat-name'>Signature Spells:</span> ");
	texthtml += utils_combineText(textlist, "p");

	$(".stats-wrapper .text").html("<tr class='text'><td colspan='6'>"+texthtml+"</td></tr>");
}
