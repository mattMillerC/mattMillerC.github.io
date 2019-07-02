"use strict";

const JSON_URL = "data/spells.json";

mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

// toss these into the "Tags" section to save screen space
const META_ADD_CONC = "Concentration";
const META_ADD_V = "Verbal";
const META_ADD_S = "Somatic";
const META_ADD_M = "Material";
// real meta tags
const META_RITUAL = "Ritual";
const META_TECHNOMAGIC = "Technomagic";

const P_LEVEL = "level";
const P_NORMALISED_TIME= "normalisedTime";
const P_SCHOOL = "school";
const P_NORMALISED_RANGE = "normalisedRange";

const STR_WIZARD = "Wizard";
const STR_FIGHTER = "Fighter";
const STR_ROGUE = "Rogue";
const STR_CLERIC = "Cleric";
const STR_SORCERER = "Sorcerer";
const STR_ELD_KNIGHT = "Eldritch Knight";
const STR_ARC_TCKER = "Arcane Trickster";
const STR_DIV_SOUL = "Divine Soul";
const STR_FAV_SOUL_V2 = "Favored Soul v2 (UA)";
const STR_FAV_SOUL_V3 = "Favored Soul v3 (UA)";

const TM_ACTION = "action";
const TM_B_ACTION = "bonus action";
const TM_REACTION = "reaction";
const TM_ROUND = "round";
const TM_MINS = "minute";
const TM_HRS = "hour";
const TO_HIDE_SINGLETON_TIMES = [TM_ACTION, TM_B_ACTION, TM_REACTION, TM_ROUND];
const TIME_UNITS_TO_FULL = {};
TIME_UNITS_TO_FULL[TM_ACTION] = "Action";
TIME_UNITS_TO_FULL[TM_B_ACTION] = "Bonus Action";
TIME_UNITS_TO_FULL[TM_REACTION] = "Reaction";
TIME_UNITS_TO_FULL[TM_ROUND] = "Rounds";
TIME_UNITS_TO_FULL[TM_MINS] = "Minutes";
TIME_UNITS_TO_FULL[TM_HRS] = "Hours";

const F_RNG_POINT = "Point";
const F_RNG_AREA = "Area";
const F_RNG_SELF = "Self";
const F_RNG_TOUCH = "Touch";
const F_RNG_SPECIAL = "Special";

let tableDefault;

function getFltrSpellLevelStr(level) {
	return level === 0 ? Parser.spLevelToFull(level) : Parser.spLevelToFull(level) + " level";
}

function getNormalisedTime(time) {
	const firstTime = time[0];
	let multiplier = 1;
	let offset = 0;
	switch (firstTime.unit) {
		case TM_B_ACTION:
			offset = 1;
			break;
		case TM_REACTION:
			offset = 2;
			break;
		case TM_ROUND:
			multiplier = 6;
			break;
		case TM_MINS:
			multiplier = 60;
			break;
		case TM_HRS:
			multiplier = 3600;
			break;
	}
	if (time.length > 1) offset += 1;
	return (multiplier * firstTime.number) + offset;
}

const INCHES_PER_FOOT = 12;
const FEET_PER_MILE = 5280;
function getNormalisedRange(range) {
	let multiplier = 1;
	let distance = 0;
	let offset = 0;

	switch(range.type) {
		case RNG_SPECIAL:
			return 1000000000;
		case RNG_POINT:
			adjustForDistance();
			break;
		case RNG_LINE:
			offset = 1;
			adjustForDistance();
			break;
		case RNG_CONE:
			offset = 2;
			adjustForDistance();
			break;
		case RNG_RADIUS:
			offset = 3;
			adjustForDistance();
			break;
		case RNG_HEMISPHERE:
			offset = 4;
			adjustForDistance();
			break;
		case RNG_SPHERE:
			offset = 5;
			adjustForDistance();
			break;
		case RNG_CUBE:
			offset = 6;
			adjustForDistance();
			break;
	}

	// value in inches, to allow greater granularity
	return (multiplier * distance) + offset;

	function adjustForDistance() {
		const dist = range.distance;
		switch (dist.type) {
			case UNT_FEET:
				multiplier = INCHES_PER_FOOT;
				distance = dist.amount;
				break;
			case UNT_MILES:
				multiplier = INCHES_PER_FOOT*FEET_PER_MILE;
				distance = dist.amount;
				break;
			case RNG_SELF:
				distance = 0;
				break;
			case RNG_TOUCH:
				distance = 1;
				break;
			case RNG_SIGHT:
				multiplier = FEET_PER_MILE*FEET_PER_MILE;
				distance = 12; // assume sight range of person ~100 ft. above the ground
				break;
			case RNG_UNLIMITED_SAME_PLANE: // from BolS, if/when it gets restored
				distance = 900000000;
				break;
			case RNG_UNLIMITED:
				distance = 900000001;
				break;
		}
	}
}

function getRangeType(range) {
	switch(range.type) {
		case RNG_SPECIAL:
			return F_RNG_SPECIAL;
		case RNG_POINT:
			switch (range.distance.type) {
				case RNG_SELF:
					return F_RNG_SELF;
				case RNG_TOUCH:
					return F_RNG_TOUCH;
				default:
					return F_RNG_POINT;
			}
		case RNG_LINE:
		case RNG_CONE:
		case RNG_RADIUS:
		case RNG_HEMISPHERE:
		case RNG_SPHERE:
		case RNG_CUBE:
			return F_RNG_AREA
	}
}

function getTblTimeStr(time) {
	if (time.number === 1 && TO_HIDE_SINGLETON_TIMES.includes(time.unit)) {
		return time.unit.uppercaseFirst();
	} else {
		return Parser.getTimeToFull(time);
	}
}

function getTimeDisplay(timeUnit) {
	return TIME_UNITS_TO_FULL[timeUnit];
}

function getClassFilterStr(c) {
	const nm = c.name.split("(")[0].trim();
	return `${nm}${c.source !== SRC_PHB ? ` (${Parser.sourceJsonToAbv(c.source)})` : ""}`;
}

function selNotUaEepc(val) {
	return val !== SRC_EEPC && !val.startsWith(SRC_UA_PREFIX);
}

function getMetaFilterObj(s) {
	const out = [];
	if (s.meta && s.meta.ritual) out.push(META_RITUAL);
	if (s.meta && s.meta.technomagic) out.push(META_TECHNOMAGIC);
	if (s.duration.filter(d => d.concentration).length) out.push(META_ADD_CONC);
	if (s.components.v) out.push(META_ADD_V);
	if (s.components.s) out.push(META_ADD_S);
	if (s.components.m) out.push(META_ADD_M);
	return out;
}

window.onload = function load() {
	performance.mark("spell load start");
	loadJSON(JSON_URL, onJsonLoad);
};

let spellList;
function onJsonLoad(data) {
	performance.mark("spell load end");
	performance.measure("spell load", "spell load start", "spell load end");
	performance.mark("spell parse start");
	tableDefault = $(".stats-wrapper").html();

	spellList = data.spell;

	const sourceFilter = getSourceFilter({selFn: selNotUaEepc});
	const levelFilter = new Filter({header: "Level", displayFn: getFltrSpellLevelStr});
	const classFilter = new Filter({header: "Class"});
	const subclassFilter = new Filter({header: "Subclass"});
	const metaFilter = new Filter({
		header: "Tag",
		items: [META_ADD_CONC, META_ADD_V, META_ADD_S, META_ADD_M, META_RITUAL, META_TECHNOMAGIC]
	});
	const schoolFilter = new Filter({header: "School", displayFn: Parser.spSchoolAbvToFull});
	const timeFilter = new Filter({
		header: "Cast Time",
		items: [
			TM_ACTION,
			TM_B_ACTION,
			TM_REACTION,
			TM_ROUND,
			TM_MINS,
			TM_HRS
		],
		displayFn: getTimeDisplay
	});
	const rangeFilter = new Filter({
		header: "Range",
		items: [
			F_RNG_SELF,
			F_RNG_TOUCH,
			F_RNG_POINT,
			F_RNG_AREA,
			F_RNG_SPECIAL
		]
	});

	const filterBox = initFilterBox(
		sourceFilter,
		levelFilter,
		classFilter,
		subclassFilter,
		metaFilter,
		schoolFilter,
		timeFilter,
		rangeFilter
	);

	const spellTable = $(".list.spells");
	let tempString = "";
	for (let i = 0; i < spellList.length; i++) {
		const spell = spellList[i];

		let levelText = Parser.spLevelToFull(spell.level);
		if (spell.meta && spell.meta.ritual) levelText += " (rit.)";
		if (spell.meta && spell.meta.technomagic) levelText += " (tec.)";

		// add eldritch knight and arcane trickster
		if (spell.classes.fromClassList.filter(c => c.name === STR_WIZARD && c.source === SRC_PHB).length) {
			if (!spell.classes.fromSubclass) spell.classes.fromSubclass = [];
			spell.classes.fromSubclass.push({
				class: {name: STR_FIGHTER, source: SRC_PHB},
				subclass: {name: STR_ELD_KNIGHT, source: SRC_PHB}
			});
			spell.classes.fromSubclass.push({
				class: {name: STR_ROGUE, source: SRC_PHB},
				subclass: {name: STR_ARC_TCKER, source: SRC_PHB}
			});
			if (spell.level > 4) {
				spell.scrollNote = true;
			}
		}

		// add divine soul, favored soul v2, favored soul v3
		if (spell.classes.fromClassList.filter(c => c.name === STR_CLERIC && c.source === SRC_PHB).length) {
			if (!spell.classes.fromSubclass) spell.classes.fromSubclass = [];
			spell.classes.fromSubclass.push({
				class: {name: STR_SORCERER, source: SRC_PHB},
				subclass: {name: STR_DIV_SOUL, source: SRC_XGE}
			});
			spell.classes.fromSubclass.push({
				class: {name: STR_SORCERER, source: SRC_PHB},
				subclass: {name: STR_FAV_SOUL_V2, source: SRC_UAS}
			});
			spell.classes.fromSubclass.push({
				class: {name: STR_SORCERER, source: SRC_PHB},
				subclass: {name: STR_FAV_SOUL_V3, source: SRC_UARSC}
			});
		}

		// used for sorting
		spell[P_NORMALISED_TIME] = getNormalisedTime(spell.time);
		spell[P_NORMALISED_RANGE] = getNormalisedRange(spell.range);

		// used for filtering
		spell._fMeta = getMetaFilterObj(spell);
		spell._fClasses = spell.classes.fromClassList.map(c => getClassFilterStr(c));
		spell._fSubclasses = spell.classes.fromSubclass ? spell.classes.fromSubclass.map(c => getClassFilterStr(c.subclass)) : [];
		spell._fTimeType = spell.time.map(t => t.unit);
		spell._fRangeType = getRangeType(spell.range);


		const CLS_COL_1 = "table-cell table-cell--border name ";
		const CLS_COL_2 = `table-cell source source${spell.source}`;
		const CLS_COL_3 = "table-cell level";
		const CLS_COL_4 = "table-cell hidden-mobile-down  time";
		const CLS_COL_5 = `table-cell hidden-mobile-down  school school_${spell.school}`;
		const CLS_COL_6 = "table-cell hidden-mobile-down  range";
		const CLS_COL_7 = "table-cell hidden-mobile-down classes";

		tempString += `
			<tr class="table-row history-link" data-link="${encodeForHash([spell.name, spell.source])}" data-title="${spell.name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='${CLS_COL_1}'>${spell.name}</td>
				<td class='${CLS_COL_2}' title="${Parser.sourceJsonToFull(spell.source)}">${Parser.sourceJsonToAbv(spell.source)}</td>
				<td class='${CLS_COL_3}'>${levelText}</td>
				<td class='${CLS_COL_4}' title="${Parser.spTimeListToFull(spell.time)}">${getTblTimeStr(spell.time[0])}</td>
				<td class='${CLS_COL_5}' title="${Parser.spSchoolAbvToFull(spell.school)}">${Parser.spSchoolAbvToFull(spell.school)}</td>
				<td class='${CLS_COL_6}'>${Parser.spRangeToFull(spell.range)}</td>
				<td class='${CLS_COL_7}' style="display: none;">${Parser.spClassesToFull(spell.classes)}</td>
			</tr>`;

		// populate filters
		sourceFilter.addIfAbsent(spell.source);
		levelFilter.addIfAbsent(spell.level);
		schoolFilter.addIfAbsent(spell.school);
		spell._fClasses.forEach(c => classFilter.addIfAbsent(c));
		spell._fSubclasses.forEach(sc => subclassFilter.addIfAbsent(sc));
	}

	spellTable.append(tempString);

	// sort filters
	sourceFilter.items.sort(ascSort);
	levelFilter.items.sort(ascSortSpellLevel);
	schoolFilter.items.sort(ascSort);
	classFilter.items.sort(ascSort);
	subclassFilter.items.sort(ascSort);

	function ascSortSpellLevel(a, b) {
		if (a === b) return 0;
		if (a === STR_CANTRIP) return -1;
		if (b === STR_CANTRIP) return 1;
		return ascSort(a, b);
	}

	const list = search({
		valueNames: ["name"],
		listClass: "spells"
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
				const s = spellList[filterId];
				return sourceFilter.toDisplay(f, s.source) && levelFilter.toDisplay(f, s.level) && metaFilter.toDisplay(f, s._fMeta) && schoolFilter.toDisplay(f, s.school) && timeFilter.toDisplay(f, s._fTimeType) && rangeFilter.toDisplay(f, s._fRangeType) && classFilter.toDisplay(f, s._fClasses) && subclassFilter.toDisplay(f, s._fSubclasses);
			} else {
				return true;
			}
		});
	}

	$("#filtertools").find("button.sort").on(EVNT_CLICK, function() {
		const $this = $(this);
		if ($this.attr("sortby") === "asc") {
			$this.attr("sortby", "desc");
		} else $this.attr("sortby", "asc");
		list.sort($this.data("sort"), { order: $this.attr("sortby"), sortFunction: sortSpells });
	});

	initHistory();
	handleFilterChange();
	
	performance.mark("spell parse end");
	performance.measure("spell parse", "spell parse start", "spell parse end");
}

function sortSpells(a, b, o) {
	a = spellList[a.elm.getAttribute(FLTR_ID)];
	b = spellList[b.elm.getAttribute(FLTR_ID)];

	if (o.valueName === "name") {
		return fallback();
	}

	if (o.valueName === "source") {
		const bySrc = ascSort(a.source, b.source);
		return bySrc !== 0 ? bySrc : ascSort(a.name, b.name);
	}

	if (o.valueName === "level") {
		return orFallback(ascSort, P_LEVEL);
	}

	if (o.valueName === "time") {
		return orFallback(ascSort, P_NORMALISED_TIME);
	}

	if (o.valueName === "school") {
		return orFallback(ascSort, P_SCHOOL);
	}

	if (o.valueName === "range") {
		return orFallback(ascSort, P_NORMALISED_RANGE);
	}

	return 0;

	function byName() {
		return ascSort(a.name, b.name);
	}
	function bySource() {
		return ascSort(a.source, b.source);
	}
	function fallback() {
		const onName = byName();
		return onName !== 0 ? onName : bySource();
	}
	function orFallback(func, prop) {
		const initial = func(a[prop], b[prop]);
		return initial !== 0 ? initial : fallback();
	}
}

const renderer = new EntryRenderer();
function loadhash (id) {
	$("#stats").html(tableDefault);
	const spell = spellList[id];

	const renderStack = [];

	renderStack.push(`<div class="margin-bottom_med"><span class="stats-source source${spell.source}" title="${Parser.sourceJsonToFull(spell.source)}">${Parser.sourceJsonToAbv(spell.source)}</div>`);

	renderStack.push(`<div class="margin-bottom_med"><span>${Parser.spLevelSchoolMetaToFull(spell.level, spell.school, spell.meta)}</span></div>`);

	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Casting Time: </span>${Parser.spTimeListToFull(spell.time)}</div>`);

	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Range: </span>${Parser.spRangeToFull(spell.range)}</div>`);

	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Components: </span>${Parser.spComponentsToFull(spell.components)}</div>`);

	renderStack.push(`<div class="margin-bottom_med"><span class="stat-name">Duration: </span>${Parser.spDurationToFull(spell.duration)}</div>`);

	const entryList = {type: "entries", entries: spell.entries};

	renderStack.push(`<div class='text'>`);
	renderer.recursiveEntryRender(entryList, renderStack, 1);

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
			`{@italic Note: Both the {@class ${STR_FIGHTER} (${STR_ELD_KNIGHT})} and the {@class ${STR_ROGUE} (${STR_ARC_TCKER})} spell lists include all {@class ${STR_WIZARD}} spells. Spells of 5th level or higher may be cast with the aid of a spell scroll or similar.}`
			, renderStack, 2);
		renderStack.push(`</div>`);
	}

	$(".stats-wrapper").html(renderStack.join(""));
}
