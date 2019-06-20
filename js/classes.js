"use strict";
const HASH_SUBCLASS = "sub:";
const HASH_FEATURE = "f:";
const HASH_HIDE_FEATURES = "hideclassfs:";
const HASH_ALL_SOURCES = "allsrc:";
const HASH_SUB_LIST_SEP = "~";

const CLSS_FEATURE_LINK = "feature-link";
const CLSS_ACTIVE = "mdc-chip--selected";
const CLSS_SUBCLASS_PILL = "mdc-chip";
const CLSS_CLASS_FEATURES_ACTIVE = "cf-active";
const CLSS_OTHER_SOURCES_ACTIVE = "os-active";
const CLSS_SUBCLASS_PREFIX = "subclass-prefix";
const CLSS_CLASS_FEATURE = "class-feature";
const CLSS_GAIN_SUBCLASS_FEATURE = "gain-subclass-feature";
const ID_CLASS_FEATURES_TOGGLE = "cf-toggle";
const ID_OTHER_SOURCES_TOGGLE = "os-toggle";

const STR_PROF_NONE = "none";

const ATB_DATA_FEATURE_LINK = "data-flink";
const ATB_DATA_FEATURE_ID = "data-flink-id";
const ATB_DATA_SC_LIST = "data-subclass-list";

let tableDefault;
let statsProfDefault;
let classTableDefault;

let classes;

const jsonURL = "data/classes.json";

const renderer = new EntryRenderer();

window.onload = function load() {
	loadJSON(jsonURL, onJsonLoad);

	$('.back-to-top').on('click', () => {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});
	$(window).on(
        "scroll",
        window.throttle(() => {
            if ($(window).scrollTop() > 850) {
                $(".back-to-top").removeClass("hidden");
            } else {
                $(".back-to-top").addClass("hidden");
            }
			if ($("#subclassHeight").offset().top - $(window).scrollTop() < 40) {
                $("#subclasses").addClass("fixed");
				$("#subclassHeight").css("height", $("#subclasses").height() + 35 + 'px');
            } else {
                $("#subclasses").removeClass("fixed");
                $("#subclasses").removeClass("closed");
				$("#subclassHeight").css("height", '0');
            }
        }, 100)
    );
	$('#subclasses').on('click', '.tab', (e) => {
		$('#subclasses').toggleClass('closed');
	});
};

function getClassHash(aClass) {
	return `${encodeForHash(aClass.name)}${HASH_LIST_SEP}${encodeForHash(aClass.source)}`;
}

function getEncodedSubclass(name, source) {
	return `${encodeForHash(name)}${HASH_SUB_LIST_SEP}${encodeForHash(source)}`;
}

function getTableDataScData(scName, scSource) {
	return scName+ATB_DATA_PART_SEP+scSource;
}

function onJsonLoad(data) {
	classes = data.class;

	// alphabetically sort subclasses
	for (const c of classes) {
		c.subclasses = c.subclasses.sort((a, b) => ascSort(a.name, b.name));
	}

	classTableDefault = $("#classtable").html();

	const classTable = $("ul.classes");
	let tempString = "";
	let gridString = "";
	for (let i = 0; i < classes.length; i++) {
		const curClass = classes[i];
		tempString +=
			`<div id='${i}' class='class-item mdc-list-item mdc-theme--on-surface history-link' data-link='${getClassHash(curClass)}' data-title='${curClass.name}'>
				${curClass.name}
			</div>`;

		let svg = curClass.name.replace(/(\s|\(|\))/g, "");

		gridString += 
			`<div class='class-grid-item history-link class-grid-item__${curClass.name.replace(/(\s|\(|\))/g,'')}'
				data-link='${getClassHash(curClass)}' data-title='${curClass.name}'>
				<span class='class-grid-item--text'>${curClass.name}</span>
				<svg class='class-grid-item--image class-grid-item__${svg}'><use xlink:href='#${svg}'></use></svg>
			</div>`
	}
	classTable.append(tempString);
	$(".class-list-container").append(gridString);

	initHistory()
}

function loadhash (id) {
	$("#classtable").html(classTableDefault);
	$('#subclasses').removeClass('fixed closed');
	$(".mobile-clone-spells").remove();
	const curClass = classes[id];
	window.className = curClass.name;

	const isUaClass = isNonstandardSource(curClass.source);

	// SUMMARY SIDEBAR =================================================================================================
	// hit dice and HP
	$("#hp div#hitdice span").html(EntryRenderer.getEntryDice(curClass.hd));
	$("#hp div#hp1stlevel span").html(curClass.hd.faces+" + your Constitution modifier");
	$("#hp div#hphigherlevels span").html(`${EntryRenderer.getEntryDice(curClass.hd)} (or ${(curClass.hd.faces/2+1)}) + your Constitution modifier per ${curClass.name} level after 1st`);

	// save proficiency
	$("#prof div#saves span").html(curClass.proficiency.map(p => Parser.attAbvToFull(p)).join(", "));

	// starting proficiencies
	const sProfs = curClass.startingProficiencies;
	const profSel = $("#prof");
	profSel.find("div#armor span").html(sProfs.armor === undefined ? STR_PROF_NONE : sProfs.armor.map(a => a === "light" || a === "medium" || a === "heavy" ? a+" armor": a).join(", "));
	profSel.find("div#weapons span").html(sProfs.weapons === undefined ? STR_PROF_NONE : sProfs.weapons.map(w => w === "simple" || w === "martial" ? w+" weapons" : w).join(", "));
	profSel.find("div#tools span").html(sProfs.tools === undefined ? STR_PROF_NONE : sProfs.tools.join(", "));
	profSel.find("div#skills span").html(sProfs.skills === undefined ? STR_PROF_NONE : getSkillProfString(sProfs.skills));
	function getSkillProfString(skills) {
		const numString = Parser.numberToString(skills.choose);
		return skills.from.length === 18 ? `Choose any ${numString}.` :`Choose ${numString} from ${joinConjunct(skills.from,", ", ", and ")}.`
	}

	// starting equipment
	const sEquip = curClass.startingEquipment;
	const fromBackground = sEquip.additionalFromBackground ? "<p>You start with the following items, plus anything provided by your background.</p>" : "";
	const defList = sEquip.default.length === 0 ? "" : `<ul><li>${sEquip.default.join("</li><li>")}</ul>`;
	const goldAlt = sEquip.goldAlternative === undefined ? "" : `<p>Alternatively, you may start with ${sEquip.goldAlternative} gp to buy your own equipment.</p>`;
	$("#equipment").find("div").html(`${fromBackground}${defList}${goldAlt}`);


	// FEATURE TABLE ===================================================================================================
	const tData = curClass.classTableGroups;
	const groupHeaders = $("#groupHeaders");
	const colHeaders = $("#colHeaders");
	const levelTrs = [];
	let spellsFlag = false;
	for (let i = 0; i < tData.length; i++) {
		const tGroup = tData[i];

		const hasTitle = tGroup.title !== undefined;
		let subclassData = "";
		if (tGroup.subclasses !== undefined) {
			subclassData = `${ATB_DATA_SC_LIST}="${tGroup.subclasses.map(s => getTableDataScData(s.name, s.source)).join(ATB_DATA_LIST_SEP)}"`;
		}
		groupHeaders.append(`<th ${hasTitle ? `class="colGroupTitle table-cell"` : ""} colspan="${tGroup.colLabels.length}" ${subclassData}>${hasTitle ? tGroup.title : ""}</th>`);

		for (let j = 0; j < tGroup.colLabels.length; j++) {
			const lbl = tGroup.colLabels[j];
			colHeaders.append(`<th class="centred-col table-cell" ${subclassData}>${lbl}</th>`);
		}

		for (let j = 0; j < 20; j++) {
			const tr = $(`#level${j+1}`);
			levelTrs[j] = tr;
			for (let k = 0; k < tGroup.rows[j].length; k++) {
				let entry = tGroup.rows[j][k];
				if (entry === 0) entry = "\u2014";
				const stack = [];
				renderer.recursiveEntryRender(entry, stack, "", "");
				tr.append(`<td class="centred-col" ${subclassData}>${stack.join("")}</td>`)
			}
		}
		if (!spellsFlag && (tGroup.colLabels.indexOf("Spells Known") > -1 || tGroup.colLabels.indexOf('Cantrips Known') > -1 || tGroup.colLabels.indexOf('1st') > -1 || tGroup.colLabels.indexOf('Ki Points') > -1 || tGroup.colLabels.indexOf('Rages') > -1 || tGroup.colLabels.indexOf('Talents Known') > -1)) {
			spellsFlag = true
        }
	}

	$("#classtable").removeClass("mobile-clone-features");
	if (spellsFlag) {
        $("#classtable").addClass("mobile-clone-features");
        let mobileClone = $('<div class="mobile-clone-spells"></div>').append($("#classtable").clone());

		mobileClone.find("#classtable").removeClass("mobile-clone-features");
        mobileClone.find("#groupHeaders th:not(.colGroupTitle)").remove();
        mobileClone.find("#groupHeaders .colGroupTitle").attr("colspan", "12");
        mobileClone.find("#colHeaders th").each((i, e) => {
			if (e.textContent.toLowerCase().indexOf("sneak attack") > -1) {
                $(e).html('<span title="Sneak Attack">Snk Atk</span>');
            } else if (e.textContent.toLowerCase().indexOf("sorcery points") > -1) {
                $(e).html('<span title="Sorcery Points">SP</span>');
            } else if (e.textContent.toLowerCase().indexOf("spells known") > -1) {
                $(e).html('<span title="Spells Known">S</span>');
            } else if (e.textContent.toLowerCase().indexOf("cantrips known") > -1) {
                $(e).html('<span title="Cantrips Known">C</span>');
            }
		});
        $("#classtable").after(mobileClone);
    }

	// FEATURE DESCRIPTIONS ============================================================================================
	const renderStack = [];
	let subclassIndex = 0; // the subclass array is not 20 elements
	for (let i = 0; i < 20; i++) {
		// track class table feature names
		const tblLvlFeatures = levelTrs[i].find(".features");
		const featureNames = [];

		// add class features to render stack
		const lvlFeatureList = curClass.classFeatures[i];
		for (let j = 0; j < lvlFeatureList.length; j++) {
			const feature = lvlFeatureList[j];
			const featureId = HASH_FEATURE+encodeForHash(feature.name)+"_"+i;

			const featureLinkPart = HASH_FEATURE+encodeForHash(feature.name)+i;
			const featureLink = $(`<a href="#${getClassHash(curClass)}${HASH_PART_SEP}${featureLinkPart}" class="${CLSS_FEATURE_LINK}" ${ATB_DATA_FEATURE_LINK}="${featureLinkPart}" ${ATB_DATA_FEATURE_ID}="${featureId}">${feature.name}</a>`);
			featureLink.click(function(e) {
				e.preventDefault();
				document.getElementById(featureId).scrollIntoView(true);
				window.scrollBy(0, -64);
			});
			featureNames.push(featureLink);

			const styleClasses = [CLSS_CLASS_FEATURE];
			if (feature.gainSubclassFeature) styleClasses.push(CLSS_GAIN_SUBCLASS_FEATURE);

			renderer.recursiveEntryRender(feature, renderStack, 0, `<div id="${featureId}" class="${styleClasses.join(" ")}">`, `</div>`, true);

			// add subclass features to render stack if appropriate
			if (feature.gainSubclassFeature) {
				for (let k = 0; k < curClass.subclasses.length; k++) {
					const subClass = curClass.subclasses[k];
					for (let l = 0; l < subClass.subclassFeatures[subclassIndex].length; l++) {
						const subFeature = subClass.subclassFeatures[subclassIndex][l];

						// if this is not the subclass intro, add the subclass to the feature name
						// this will only be shown if there are multiple subclasses displayed
						if (subFeature.name === undefined) {
							for (let m = 0; m < subFeature.entries.length; m++) {
								const childEntry = subFeature.entries[m];
								if (childEntry.name !== undefined && !childEntry.name.startsWith(`<span class="${CLSS_SUBCLASS_PREFIX}">`)) {
									childEntry.name = `<span class="${CLSS_SUBCLASS_PREFIX}">${subClass.name}: </span>${childEntry.name}`;
								}
							}
						}

						const styleClasses = [CLSS_SUBCLASS_FEATURE];
						const hideSource = isNonstandardSource(subClass.source) || hasBeenReprinted(subClass.shortName, subClass.source);
						if (hideSource) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
						renderer.recursiveEntryRender(subFeature, renderStack, 0, `<div class="${styleClasses.join(" ")}" ${ATB_DATA_SC}="${subClass.name}" ${ATB_DATA_SRC}="${subClass.source}">`, `</div>`, true);
					}
				}
				subclassIndex++;
			}
		}

		// render class table feature names
		if (featureNames.length === 0) tblLvlFeatures.html("\u2014");
		else {
			for (let j = 0; j < featureNames.length; j++) {
				tblLvlFeatures.append(featureNames[j]);
				if (j < featureNames.length-1) tblLvlFeatures.append(", ");
			}
		}
	}
	$("#stats").html(renderStack.join(""));

	// hide UA/other sources by default
	$(`.${CLSS_NON_STANDARD_SOURCE}`).not(`.${CLSS_SUBCLASS_PILL}`).hide();

	// CLASS FEATURE/UA/SUBCLASS PILL BUTTONS ==========================================================================
	const subclassPillWrapper = $("div#subclasses");
	// remove any from previous class
	subclassPillWrapper.empty();

	// show/hide class features pill
	makeGenericTogglePill("Class Features", CLSS_CLASS_FEATURES_ACTIVE, ID_CLASS_FEATURES_TOGGLE, HASH_HIDE_FEATURES, true);

	// show/hide UA/other sources
	const allSourcesToggle = makeGenericTogglePill("All Sources", CLSS_OTHER_SOURCES_ACTIVE, ID_OTHER_SOURCES_TOGGLE, HASH_ALL_SOURCES, false);

	// subclass pills
	const subClasses = curClass.subclasses
		.map(sc => ({"name": sc.name, "source": sc.source, "shortName": sc.shortName}))
		.sort(function(a, b){return ascSort(a.shortName, b.shortName)});
	for (let i = 0; i < subClasses.length; i++) {
		const nonStandardSource = isNonstandardSource(subClasses[i].source) || hasBeenReprinted(subClasses[i].shortName, subClasses[i].source);
		const styleClasses = [CLSS_ACTIVE, CLSS_SUBCLASS_PILL];
		if (nonStandardSource) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
		const pillText = hasBeenReprinted(subClasses[i].shortName, subClasses[i].source) ? `${subClasses[i].shortName} (${Parser.sourceJsonToAbv(subClasses[i].source)})` : subClasses[i].shortName;
		const pill = $(`<div class="${styleClasses.join(" ")}" ${ATB_DATA_SC}="${subClasses[i].name}" ${ATB_DATA_SRC}="${subClasses[i].source}" title="Source: ${Parser.sourceJsonToFull(subClasses[i].source)}"><span class='mdc-chip__text'>${pillText}</span></div>`);
		pill.click(function() {
			handleSubclassClick($(this).hasClass(CLSS_ACTIVE), subClasses[i].name, subClasses[i].source);
		});
		if (nonStandardSource) pill.hide();
		subclassPillWrapper.append(pill);
	}
	subclassPillWrapper.append(`<div class='tab material-icons'>expand_less</div>`);

	// if this is a UA class, toggle the "All Sources" button
	if (isUaClass) allSourcesToggle.click();

	// helper functions
	function makeGenericTogglePill(pillText, pillActiveClass, pillId, hashKey, defaultActive) {
		const pill = $(`<div id="${pillId}" class="mdc-chip"><span class="mdc-chip__text">${pillText}</span></div>`);
		if (defaultActive) pill.addClass(pillActiveClass);
		subclassPillWrapper.append(pill);
		pill.click(function() {
			let active = $(this).hasClass(pillActiveClass);
			if (!defaultActive) active = !active;
			handleToggleFeaturesClicks(active)
		});
		return pill;

		function handleToggleFeaturesClicks(isPillActive) {
			const outStack = [];
			const split = window.location.hash.split(HASH_PART_SEP);

			for (let i = 0; i < split.length; i++) {
				const hashPart = split[i];
				if (!hashPart.startsWith(hashKey)) outStack.push(hashPart);
			}
			if (isPillActive) {
				outStack.push(hashKey + "true")
			} else {
				outStack.push(hashKey + "false")
			}

			window.location.hash = outStack.join(HASH_PART_SEP).toLowerCase();
		}
	}

	function handleSubclassClick(isPillActive, subclassName, subclassSource) {
		const outStack = [];
		const split = window.location.hash.split(HASH_PART_SEP);

		const encodedSubClass = getEncodedSubclass(subclassName, subclassSource);
		const subclassLink = HASH_SUBCLASS + encodedSubClass;

		if (isPillActive && window.location.hash.includes(HASH_SUBCLASS)) {
			for (let i = 0; i < split.length; i++) {
				const hashPart = split[i];
				if (!hashPart.startsWith(HASH_SUBCLASS)) outStack.push(hashPart);
				else {
					const subClassStack = [];
					const subClasses = hashPart.substr(HASH_SUBCLASS.length).split(HASH_LIST_SEP);
					for (let j = 0; j < subClasses.length; j++) {
						const subClass = subClasses[j];
						if (subClass !== encodedSubClass) subClassStack.push(subClass);
					}
					if (subClassStack.length > 0) outStack.push(HASH_SUBCLASS + subClassStack.join(HASH_LIST_SEP));
				}
			}
		} else {
			let hasSubclassHash = false;

			for (let i = 0; i < split.length; i++) {
				const hashPart = split[i];
				if (!hashPart.startsWith(HASH_SUBCLASS)) outStack.push(hashPart);
				else {
					const subClassStack = [];
					const subClasses = hashPart.substr(HASH_SUBCLASS.length).split(HASH_LIST_SEP);
					for (let j = 0; j < subClasses.length; j++) {
						const subClass = subClasses[j];
						if (subClass !== encodedSubClass) subClassStack.push(subClass);
					}
					subClassStack.push(encodedSubClass);
					if (subClassStack.length > 0) outStack.push(HASH_SUBCLASS + subClassStack.join(HASH_LIST_SEP));

					hasSubclassHash = true;
				}
			}

			if (!hasSubclassHash) outStack.push(subclassLink);
		}

		window.location.hash = outStack.join(HASH_PART_SEP).toLowerCase();
	}
}

let prevFeature = null;
function loadsub(sub) {
	const curHash = window.location.hash;

	let newTitle = window.className;
	$(".main").addClass("item-opened");
	$('.breadcrumbs__no_caret').removeClass('breadcrumbs__no_caret').addClass('breadcrumbs__caret-removed');
	$('.breadcrumbs__last').text(newTitle);
	$('.main .page-title').first().text(newTitle);
	$('.main').addClass('item-opened');
	document.title = newTitle + " - 5E Tools";

	let subclasses = null;
	let feature = null;
	let hideClassFeatures = null;
	let showAllSources = null;

	for (let i = 0; i < sub.length; i++) {
		const hashPart = sub[i];

		if (hashPart.startsWith(HASH_SUBCLASS)) subclasses = hashPart.slice(HASH_SUBCLASS.length).split(HASH_LIST_SEP);
		if (hashPart.startsWith(HASH_FEATURE)) feature = hashPart;
		if (hashPart.startsWith(HASH_HIDE_FEATURES)) hideClassFeatures = hashPart.slice(HASH_HIDE_FEATURES.length) === "true";
		if (hashPart.startsWith(HASH_ALL_SOURCES)) showAllSources = hashPart.slice(HASH_ALL_SOURCES.length) === "true";
	}

	const hideOtherSources = showAllSources === null || showAllSources === false;

	// deselect any pills that would be hidden
	if (subclasses !== null && hideOtherSources) {
		const toDeselect = [];
		$(`.${CLSS_SUBCLASS_PILL}.${CLSS_NON_STANDARD_SOURCE}.${CLSS_ACTIVE}`).each(function(){
			const $this = $(this);
			const thisSc = getEncodedSubclass($this.attr(ATB_DATA_SC), $this.attr(ATB_DATA_SRC));
			if ($.inArray(subclasses, thisSc)) {
				toDeselect.push(thisSc)
			}
		});
		const toKeep = subclasses.filter(sc => toDeselect.indexOf(sc) < 0);
		if (toKeep.length !== subclasses.length) {
			const newHashStack = [];
			for (let i = 0; i < sub.length; i++) {
				const hashPart = sub[i];

				if (!hashPart.startsWith(HASH_SUBCLASS)) newHashStack.push(hashPart);
				else if (toKeep.length > 0) newHashStack.push(HASH_SUBCLASS + toKeep.join(HASH_LIST_SEP))
			}
			const curParts = _getHashParts();
			if (curParts.length > 1) {
				const newParts = [curParts[0]].concat(newHashStack);
				window.location.hash = HASH_START + newParts.join(HASH_PART_SEP);
			}
			return;
		}
	}

	if (subclasses !== null) {
		updateClassTableLinks();

		const $toShow = [];
		const $toHide = [];
		const $subClassSpanList = $(`.${CLSS_SUBCLASS_PILL}`);
		$subClassSpanList.each(
			function() {
				const $this = $(this);
				const thisSc = getEncodedSubclass($this.attr(ATB_DATA_SC), $this.attr(ATB_DATA_SRC));
				let shown = false;

				for (let j = 0; j < subclasses.length; j++) {
					const sc = subclasses[j].toLowerCase();
					if (sc.trim() === thisSc) {
						shown = true;
						break;
					}
				}
				if (shown) {
					$toShow.push($this);
				} else {
					$toHide.push($this);
				}
			}
		);

		if ($toShow.length === 0) {
			displayAllSubclasses();
		} else {
			const otherSrcSubFeat = $(`p.${CLSS_NON_STANDARD_SOURCE}`);
			const shownInTable = [];

			$.each($toShow, function(i, v) {
				v.addClass(CLSS_ACTIVE);
				$(`.${CLSS_SUBCLASS_FEATURE}[${ATB_DATA_SC}="${v.attr(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.attr(ATB_DATA_SRC)}"]`).show();
				if (hideOtherSources) otherSrcSubFeat.filter(`[${ATB_DATA_SC}="${v.attr(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.attr(ATB_DATA_SRC)}"]`).hide();
				else otherSrcSubFeat.filter(`[${ATB_DATA_SC}="${v.attr(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.attr(ATB_DATA_SRC)}"]`).show();

				const asInTable = getTableDataScData(v.attr(ATB_DATA_SC), v.attr(ATB_DATA_SRC));
				shownInTable.push(asInTable);
				handleTableGroups(shownInTable, asInTable, true);
			});

			$.each($toHide, function(i, v) {
				v.removeClass(CLSS_ACTIVE);
				$(`.${CLSS_SUBCLASS_FEATURE}[${ATB_DATA_SC}="${v.attr(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.attr(ATB_DATA_SRC)}"]`).hide();
				otherSrcSubFeat.filter(`[${ATB_DATA_SC}="${v.attr(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.attr(ATB_DATA_SRC)}"]`).hide();

				const asInTable = getTableDataScData(v.attr(ATB_DATA_SC), v.attr(ATB_DATA_SRC));
				handleTableGroups(shownInTable, asInTable, false);
			});

			if (hideOtherSources) {
				otherSrcSubFeat.not(`.${CLSS_SUBCLASS_FEATURE}`).filter(`[${ATB_DATA_SC}="${EntryRenderer.DATA_NONE}"][${ATB_DATA_SRC}="${EntryRenderer.DATA_NONE}"]`).hide();
			} else {
				otherSrcSubFeat.not(`.${CLSS_SUBCLASS_FEATURE}`).filter(`[${ATB_DATA_SC}="${EntryRenderer.DATA_NONE}"][${ATB_DATA_SRC}="${EntryRenderer.DATA_NONE}"]`).show();
			}
		}

		// show subclass prefixes if we're displaying more than 1 subclass
		if ($toShow.length !== 1) {
			$(`.${CLSS_SUBCLASS_PREFIX}`).show();
		} else {
			$(`.${CLSS_SUBCLASS_PREFIX}`).hide();
		}
	} else {
		displayAllSubclasses();
	}

	// hide class features as required
	const cfToggle = $(`#${ID_CLASS_FEATURES_TOGGLE}`);
	const toToggleCf= $(`.${CLSS_CLASS_FEATURE}`).not(`.${CLSS_GAIN_SUBCLASS_FEATURE}`);
	if (hideClassFeatures !== null && hideClassFeatures) {
		cfToggle.removeClass(CLSS_CLASS_FEATURES_ACTIVE);
		toToggleCf.hide();
	} else {
		cfToggle.addClass(CLSS_CLASS_FEATURES_ACTIVE);
		toToggleCf.show();
	}

	// show UA/etc content as required
	const srcToggle = $(`#${ID_OTHER_SOURCES_TOGGLE}`);
	const toToggleSrc = $(`.${CLSS_SUBCLASS_PILL}.${CLSS_NON_STANDARD_SOURCE}`);
	if (hideOtherSources) {
		srcToggle.removeClass(CLSS_OTHER_SOURCES_ACTIVE);
		toToggleSrc.hide();
	} else {
		srcToggle.addClass(CLSS_OTHER_SOURCES_ACTIVE);
		toToggleSrc.show();
	}

	// scroll to the linked feature if required
	if (feature !== null && (prevFeature === null || prevFeature !== feature)) {
		document.getElementById($(`[${ATB_DATA_FEATURE_LINK}="${feature}"]`)[0].getAttribute(ATB_DATA_FEATURE_ID)).scrollIntoView();
		prevFeature = feature;
	}

	updateClassTableLinks();

	function handleTableGroups(shownInTable, tableDataTag, show) {
		$(`[data-subclass-list]`).each(
			function() {
				const $this = $(this);
				const scs = $this.attr(ATB_DATA_SC_LIST).split(ATB_DATA_LIST_SEP);

				// if another class has shown this item, don't hide it
				if (!show) {
					for (let i = 0; i < scs.length; i++) {
						const sc = scs[i];
						if ($.inArray(sc, shownInTable) !== -1) {
							return;
						}
					}
				}

				for (let i = 0; i < scs.length; i++) {
					const sc = scs[i];
					if (sc === tableDataTag) {
						if (show) $this.show();
						else $this.hide();
						break;
					}
				}
			}
		);
	}

	function updateClassTableLinks () {
		const hashParts = curHash.slice(1).split(HASH_PART_SEP);
		const outParts = [];
		for (let i = 0; i < hashParts.length; i++) {
			const part = hashParts[i];
			if (!part.startsWith(HASH_FEATURE)) outParts.push(part);
		}
		$(`.${CLSS_FEATURE_LINK}`).each(
			function() {
				const $this = $(this);
				this.href = HASH_START+outParts.join(HASH_PART_SEP)+HASH_PART_SEP+$this.attr(ATB_DATA_FEATURE_LINK);
			}
		)
	}

	function displayAllSubclasses() {
		updateClassTableLinks();
		$(`.${CLSS_SUBCLASS_PILL}`).addClass(CLSS_ACTIVE);
		$(`.${CLSS_SUBCLASS_FEATURE}`).show();
		$(`.${CLSS_SUBCLASS_PREFIX}`).show();
		$(`div.${CLSS_NON_STANDARD_SOURCE}`).show();
		// if we're hiding features from some sources, make sure these stay hidden
		if (hideOtherSources) {
			$(`.${CLSS_NON_STANDARD_SOURCE}`).not(`.${CLSS_SUBCLASS_PILL}`).hide();
		}
		// show all table col groups
		// TODO add handling for non-standard sources if UA non-caster->caster subclass are introduced
		$(`[data-subclass-list]`).each(
			function() {
				$(this).show();
			}
		);
	}
}
