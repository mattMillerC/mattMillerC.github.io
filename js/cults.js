"use strict";

const JSON_URL = "data/cults.json";
let tableDefault, cultList;

mdc.textField.MDCTextField.attachTo(document.querySelector(".mdc-text-field"));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector(".mdc-notched-outline"));

window.onload = function load() {
	loadJSON(JSON_URL, onJsonLoad);
};

function onJsonLoad(data) {
	tableDefault = $(".stats-wrapper").html();
	cultList = data;

	let tempString = "";
	for (let i = 0; i < cultList.length; i++) {
		const name = cultList[i].name;

		tempString += `
			<tr class="table-row history-link" data-link="${encodeURI(name).toLowerCase()}" data-title="${name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='table-cell name'>${name}</td>
			</tr>`;
	}
	$(".list.cults").append(tempString);

	const list = search({
		valueNames: ['name'],
		listClass: "cults"
	});

	initHistory()
};

function loadhash (id) {
	$(".stats-wrapper").html(tableDefault);
	const curcult = cultList[id];

	const textlist = curcult.text;
	let texthtml = "";

	if (curcult.goal !== undefined) texthtml += utils_combineText(curcult.goal.text, "p", "<span class='stat-name'>Goals:</span> ");
	if (curcult.cultists !== undefined) texthtml += utils_combineText(curcult.cultists.text, "p", "<span class='stat-name'>Typical Cultist:</span> ");
	if (curcult.signaturespells !== undefined) texthtml += utils_combineText(curcult.signaturespells.text, "p", "<span class='stat-name'>Signature Spells:</span> ");
	texthtml += utils_combineText(textlist, "p");

	$(".stats-wrapper .text").html(texthtml);
}
