"use strict";
const JSON_URL = "../data/conditions.json";
let tableDefault;
let conditionList;

mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

window.onload = function load() {
	loadJSON(JSON_URL, onJsonLoad);
};

function onJsonLoad(data) {
	conditionList = data.condition;

	tableDefault = $(".stats-wrapper").html();

	let tempString = "";
	for (let i = 0; i < conditionList.length; i++) {
		const name = conditionList[i].name;
		tempString += `
			<tr class="table-row history-link" data-link="${encodeURI(name).toLowerCase()}" data-title="${name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='table-cell name'>${name}</td>
			</tr>`;
	}
	$(".list.conditions").append(tempString);

	const list = search({
		valueNames: ['name'],
		listClass: "conditions"
	});

	initHistory()
}

function loadhash (id) {
	$(".stats-wrapper").html(tableDefault);
	const curcondition = conditionList[id];
	$(".stats-wrapper .text").html(utils_combineText(curcondition.entries, "p"));
}
