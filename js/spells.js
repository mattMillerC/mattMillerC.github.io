import EntryRenderer from "../util/entryrender.js";
import Parser from "../util/Parser.js";

const renderer = new EntryRenderer();
const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
	</div>`;

function renderSelection(spell, rootEl) {
	rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;

	const renderStack = [];
	renderStack.push(`<div class="margin-bottom_med"><span class="stats-source source${spell.source}" title="${Parser.sourceJsonToFull(spell.source)}">${Parser.sourceJsonToAbv(spell.source)}</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span>${Parser.spLevelSchoolMetaToFull(spell.level, spell.school, spell.meta)}</span></div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${Parser.spTimeListToFull(spell.time)}</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${Parser.spRangeToFull(spell.range)}</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${Parser.spComponentsToFull(spell.components)}</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${Parser.spDurationToFull(spell.duration)}</div>`);
	renderStack.push(`<div class='text'>`);

	renderer.recursiveEntryRender({type: "entries", entries: spell.entries}, renderStack, 1);

	if (spell.entriesHigherLevel) {
		const higherLevelsEntryList = {type: "entries", entries: spell.entriesHigherLevel};
		renderer.recursiveEntryRender(higherLevelsEntryList, renderStack, 2);
	}

	renderStack.push(`</div>`);
	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Classes: </span>${Parser.spMainClassesToFull(spell.classes)}</div>`);

	if (spell.classes.fromSubclass) {
		const currentAndLegacy = Parser.spSubclassesToCurrentAndLegacyFull(spell.classes);
		renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Subclasses: </span>${currentAndLegacy[0]}</div>`);
		if (currentAndLegacy[1]) {
			renderStack.push(`<div class="mdc-theme--text-disabled-on-background margin-bottom_med"><span class="stat-name">Subclasses (legacy): </span>${currentAndLegacy[1]}</div>`);
		}
	}

	if (spell.scrollNote) {
		renderStack.push(`<div class="mdc-theme--text-disabled-on-background">`);
		renderer.recursiveEntryRender(
			`{@italic Note: Both the {@class ${"Fighter"} (${"Eldritch Knight"})} and the {@class ${"Rogue"} (${"Arcane Trickster"})} spell lists include all {@class ${"Wizard"}} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}`
			, renderStack, 2);
		renderStack.push(`</div>`);
	}

	rootEl.querySelector(".stats-wrapper").innerHTML = renderStack.join("");
}

export { renderSelection };


// Stuff I didnt refactor out in the first pass
// function onJsonLoad(data) {
// 	for (let i = 0; i < spellList.length; i++) {
// 		const spell = spellList[i];

// 		let levelText = Parser.spLevelToFull(spell.level);
// 		if (spell.meta && spell.meta.ritual) levelText += " (rit.)";
// 		if (spell.meta && spell.meta.technomagic) levelText += " (tec.)";

// 		// add eldritch knight and arcane trickster
// 		if (spell.classes.fromClassList.filter(c => c.name === "Wizard" && c.source === SRC_PHB).length) {
// 			if (!spell.classes.fromSubclass) spell.classes.fromSubclass = [];
// 			spell.classes.fromSubclass.push({
// 				class: {name: "Fighter", source: SRC_PHB},
// 				subclass: {name: "Eldritch Knight", source: SRC_PHB}
// 			});
// 			spell.classes.fromSubclass.push({
// 				class: {name: "Rogue", source: SRC_PHB},
// 				subclass: {name: "Arcane Trickster", source: SRC_PHB}
// 			});
// 			if (spell.level > 4) {
// 				spell.scrollNote = true;
// 			}
// 		}

// 		// add divine soul, favored soul v2, favored soul v3
// 		if (spell.classes.fromClassList.filter(c => c.name === "Cleric" && c.source === SRC_PHB).length) {
// 			if (!spell.classes.fromSubclass) spell.classes.fromSubclass = [];
// 			spell.classes.fromSubclass.push({
// 				class: {name: "Sorcerer", source: SRC_PHB},
// 				subclass: {name: "Divine Soul", source: SRC_XGE}
// 			});
// 			spell.classes.fromSubclass.push({
// 				class: {name: "Sorcerer", source: SRC_PHB},
// 				subclass: {name: "Favored Soul v2 (UA)", source: SRC_UAS}
// 			});
// 			spell.classes.fromSubclass.push({
// 				class: {name: "Sorcerer", source: SRC_PHB},
// 				subclass: {name: "Favored Soul v3 (UA)", source: SRC_UARSC}
// 			});
// 		}

// 		// used for sorting
// 		spell["normalisedTime"] = getNormalisedTime(spell.time);
// 		spell["normalisedRange"] = getNormalisedRange(spell.range);
// 	}

// 	// sort filters
// 	sourceFilter.items.sort(ascSort);
// 	levelFilter.items.sort(ascSortSpellLevel);
// 	schoolFilter.items.sort(ascSort);
// 	classFilter.items.sort(ascSort);
// 	subclassFilter.items.sort(ascSort);

// 	function ascSortSpellLevel(a, b) {
// 		if (a === b) return 0;
// 		if (a === STR_CANTRIP) return -1;
// 		if (b === STR_CANTRIP) return 1;
// 		return ascSort(a, b);
// 	}

// 	$("#listcontainer").find(".sort").on(EVNT_CLICK, function() {
// 		const $this = $(this);
// 		if ($this.attr("sortby") === "asc") {
// 			$this.attr("sortby", "desc");
// 		} else $this.attr("sortby", "asc");
// 		list.sort($this.data("sort"), { order: $this.attr("sortby"), sortFunction: sortSpells });
// 	});
// }

// function sortSpells(a, b, o) {
// 	a = spellList[a.elm.getAttribute(FLTR_ID)];
// 	b = spellList[b.elm.getAttribute(FLTR_ID)];

// 	if (o.valueName === "name") {
// 		return fallback();
// 	}

// 	if (o.valueName === "source") {
// 		const bySrc = ascSort(a.source, b.source);
// 		return bySrc !== 0 ? bySrc : ascSort(a.name, b.name);
// 	}

// 	if (o.valueName === "level") {
// 		return orFallback(ascSort, "level");
// 	}

// 	if (o.valueName === "time") {
// 		return orFallback(ascSort, "normalisedTime");
// 	}

// 	if (o.valueName === "school") {
// 		return orFallback(ascSort, "school");
// 	}

// 	if (o.valueName === "range") {
// 		return orFallback(ascSort, "normalisedRange");
// 	}

// 	return 0;

// 	function byName() {
// 		return ascSort(a.name, b.name);
// 	}
// 	function bySource() {
// 		return ascSort(a.source, b.source);
// 	}
// 	function fallback() {
// 		const onName = byName();
// 		return onName !== 0 ? onName : bySource();
// 	}
// 	function orFallback(func, prop) {
// 		const initial = func(a[prop], b[prop]);
// 		return initial !== 0 ? initial : fallback();
// 	}
// }