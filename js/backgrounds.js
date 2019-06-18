"use strict";
const JSON_URL = "data/backgrounds.json";
let tabledefault = "";
let bgList;

mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

window.onload = function load() {
	loadJSON(JSON_URL, onJsonLoad);
};

function onJsonLoad(data) {
	bgList = data.background;
	tabledefault = $(".stats-wrapper").html();

	const sourceFilter = getSourceFilter();
	const filterBox = initFilterBox(sourceFilter);

	const bgTable = $("table.backgrounds");
	let tempString = "";
	for (let i = 0; i < bgList.length; i++) {
		const bg = bgList[i];
		const proficiencies = bg.trait.filter((i) => {
			return i.name === "Skill Proficiencies";
		});
		const prof = proficiencies.length > 0 ? proficiencies[0].text[0] : '--';

		const CLS_COL_1 = "table-cell table-cell--border name ";
		const CLS_COL_2 = `table-cell hidden-mobile-down source source${bg.source}`;
		const CLS_COL_3 = "table-cell proficiencies ";

		tempString += `
			<tr class="table-row history-link" data-link="${encodeURI(bg.name).toLowerCase()}" data-title="${bg.name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='${CLS_COL_1}'>${bg.name.replace("Variant ","")}</span>
				<td class='${CLS_COL_2}' title="${Parser.sourceJsonToFull(bg.source)}">${Parser.sourceJsonToAbv(bg.source)}</span>
				<td class='${CLS_COL_3}'>${prof}</span>
			</tr>`;

		// populate filters
		sourceFilter.addIfAbsent(bg.source);
	}
	bgTable.append(tempString);

	const list = search({
		valueNames: ['name', 'source', 'proficiencies'],
		listClass: "backgrounds"
	});

	filterBox.render();

	// sort filters
	sourceFilter.items.sort(ascSort);

	$(filterBox).on(
		FilterBox.EVNT_VALCHANGE,
		handleFilterChange
	);

	function handleFilterChange() {
		list.filter(function(item) {
			const f = filterBox.getValues();
			let filterId = $(item.elm).attr(FLTR_ID);
			if (filterId) {
				const bg = bgList[filterId];
				return sourceFilter.toDisplay(f, bg.source);
			} else {
				return true;
			}
		});
	}

	initHistory();
	handleFilterChange();
}

function loadhash (id) {
	$(".stats-wrapper").html(tabledefault);
	const curbg = bgList[id];
	const source = curbg.source;
	const sourceAbv = Parser.sourceJsonToAbv(source);
	const sourceFull = Parser.sourceJsonToFull(source);
	
	$('.stats-wrapper .source')
		.addClass(`source${sourceAbv}`)
		.attr('title', sourceFull)
		.html(sourceAbv);

	const traitlist = curbg.trait;

	for (let n = traitlist.length-1; n >= 0; n--) {
		let texthtml = "";
		texthtml += utils_combineText(traitlist[n].text, "p", "<span class='stat-name'>"+traitlist[n].name+".</span> ");

		const subtraitlist = traitlist[n].subtrait;
		if (subtraitlist !== undefined) {
			for (let j = 0; j < subtraitlist.length; j++) {
				texthtml = texthtml + "<p class='subtrait'>";
				const subtrait = subtraitlist[j];
				texthtml = texthtml + "<span class='stat-name'>"+subtrait.name+".</span> ";
				for (let k = 0; k < subtrait.text.length; k++) {
					if (!subtrait.text[k]) continue;
					if (k === 0) {
						texthtml = texthtml + "<span>" + subtrait.text[k] + "</span>";
					} else {
						texthtml = texthtml + "<p class='subtrait'>" + subtrait.text[k] + "</p>";
					}
				}
				texthtml = texthtml + "</p>";
			}
		}
		if (texthtml.indexOf('<table') === 0) {
			$('.stats-wrapper .table-container').removeClass('disabled');
			$('.stats-wrapper .table-container .collapse-list').prepend(texthtml);
		} else {
			$(".stats-wrapper .stats").prepend(texthtml);	
		}
	}

	window.setTimeout(() => {
		let list = $(".stats-wrapper .table-container .collapse-list");
		list.css("margin-top", "-" + list.height() + "px");
	}, 0);
}
