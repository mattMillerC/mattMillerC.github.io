"use strict";
const JSON_URL = "data/races.json";
let tableDefault = "";

mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

window.onload = function load() {
	loadJSON(JSON_URL, onJsonLoad)
};

let raceList;
function onJsonLoad (data) {
	tableDefault = $(".stats-wrapper").html();

	raceList = data.race;

	const sourceFilter = getSourceFilter();
	const asiFilter = getAsiFilter();
	const sizeFilter = new Filter({header: "Size", displayFn: Parser.sizeAbvToFull});

	const filterBox = initFilterBox(
		sourceFilter,
		asiFilter,
		sizeFilter
	);

	const racesTable = $("table.races");
	let tempString = "";
	for (let i = 0; i < raceList.length; i++) {
		const race = raceList[i];

		const ability = utils_getAbilityData(race.ability);
		race._fAbility = ability.asCollection; // used for filtering

		const CLS_COL_1 = "table-cell table-cell--border name ";
		const CLS_COL_2 = "table-cell ability " + (ability.asText === STR_NONE ? "list-entry-none " : "");
		const CLS_COL_3 = "table-cell hidden-mobile-down size";
		const CLS_COL_4 = `table-cell hidden-mobile-down source source${race.source}`;

		tempString += `
			<tr class="table-row history-link" data-link="${encodeURI(race.name).toLowerCase()}" data-title="${race.name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='${CLS_COL_1}'>${race.name}</td>
				<td class='${CLS_COL_2}'>${ability.asTextShort}</td>
				<td class='${CLS_COL_3}'>${Parser.sizeAbvToFull(race.size)}</td>
				<td class='${CLS_COL_4}' title="${Parser.sourceJsonToFull(race.source)}">${Parser.sourceJsonToAbv(race.source)}</td>
			</tr>`;

		// populate filters
		sourceFilter.addIfAbsent(race.source);
		sizeFilter.addIfAbsent(race.size);
	}

	racesTable.append(tempString);

	// sort filters
	sourceFilter.items.sort(ascSort);
	sizeFilter.items.sort(ascSortSize);

	function ascSortSize(a, b) {
		return ascSort(toNum(a), toNum(b));

		function toNum(size) {
			switch (size) {
				case "M":
					return 0;
				case "S":
					return -1;
				case "V":
					return 1;
			}
		}
	}

	const list = search({
		valueNames: ['name', 'ability', 'size', 'source'],
		listClass: "races"
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
				const r = raceList[filterId];

				const rightSource = sourceFilter.toDisplay(f, r.source);
				const rightAsi = asiFilter.toDisplay(f, r._fAbility);
				const rightSize = sizeFilter.toDisplay(f, r.size);

				return rightSource && rightAsi && rightSize;
			} else {
				return true;
			}
		})
	}

	initHistory();
	handleFilterChange();
}

const renderer = new EntryRenderer();
function loadhash (id) {
	window.scrollTo(0,0,);
	$(".stats-wrapper").html(tableDefault);
	const race = raceList[id];

	$('.stats-wrapper .source')
		.addClass(`source${race.source}`)
		.attr('title', Parser.sourceJsonToFull(race.source))
		.html(`${Parser.sourceJsonToAbv(race.source)}`);

	const size = Parser.sizeAbvToFull(race.size);
	$(".stats-wrapper .size").html(size);
	if (size === "") {
		$(".stats-wrapper .size").hide();
	}

	const ability = utils_getAbilityData(race.ability);
	$(".stats-wrapper .ability").html(ability.asText);

	let speed;
	if (typeof race.speed === "string") {
		speed = race.speed + (race.speed === "Varies" ? "" : "ft. ");
	} else {
		speed = race.speed.walk + "ft.";
		if (race.speed.climb) speed += `, climb ${race.speed.climb}ft.`
	}
	$(".stats-wrapper .speed").html(speed);
	if (speed === "") {
		$(".stats-wrapper .speed").hide();
	}

	const traitlist = race.trait;
	if (traitlist) {
		let statsText = "<div class='stat-item'>";
		for (let n = 0; n < traitlist.length; ++n) {
			const trait = traitlist[n];

			const header = `<span class='stat-name'>${trait.name}.</span> `;
			statsText += utils_combineText(traitlist[n].text, "p", header)
		}
		statsText += "</div>";
		$('.stats-wrapper .stats').html(statsText);
	} else if (race.entries) {
		const renderStack = [];
		const faux = {"type": "entries", "entries": race.entries};

		// Grung to test with
		renderer.recursiveEntryRender(faux, renderStack, 1, "<div class='renderer-output'>", "</div>", true);

		$('.stats-wrapper .stats').html(renderStack.join(""));
	}
}
