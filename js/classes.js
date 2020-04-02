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

import {
  jqHeight,
  jqOffset,
  parseHTML,
  throttle,
  ascSort,
  encodeForHash,
  jqAfter,
  jqEmpty,
  isNonstandardSource,
  joinConjunct,
  hasBeenReprinted
} from "../js/utils.js";
import {
  HASH_LIST_SEP,
  HASH_PART_SEP,
  CLSS_SUBCLASS_FEATURE,
  ATB_DATA_SC,
  ATB_DATA_SRC,
  CLSS_NON_STANDARD_SOURCE,
  ATB_DATA_PART_SEP,
  ATB_DATA_LIST_SEP,
  HASH_START
} from "../util/consts.js";
import { resolveHash } from '../util/renderTable.js';
import EntryRenderer from '../util/entryrender.js';
import Parser from '../util/Parser.js';

const renderer = new EntryRenderer();
export { onLoad, onDataLoad, onHashChange, onSubChange };

function setSubclassFixation(rootEl) {
  if (jqOffset(rootEl.querySelector("#subclassHeight")).top - document.body.scrollTop < 34) {
    if (!rootEl.querySelector("#subclasses").classList.contains("fixed")) {
      rootEl.querySelector("#subclasses").classList.add("fixed");
      rootEl.querySelector("#subclassHeight").style.height =
        jqHeight(rootEl.querySelector("#subclasses")) + 40 + "px";
    }
  } else {
    rootEl.querySelector("#subclasses").classList.remove("fixed");
    rootEl.querySelector("#subclassHeight").style.height = "0";
  }
}

function onLoad(rootEl) {
  let backToTop = rootEl.querySelector(".back-to-top");
  backToTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (document.body.scrollTop > 850) {
        backToTop.classList.remove("hidden");
      } else {
        backToTop.classList.add("hidden");
      }
      setSubclassFixation(rootEl);
    }, 100)
  );
}

function onDataLoad(data, rootEl) {
	let classes = data.class;

	// alphabetically sort subclasses
	for (const c of classes) {
		c.subclasses = c.subclasses.sort((a, b) => ascSort(a.name, b.name));
	}

	window.classTableDefault = rootEl.querySelector("#classtable").innerHTML;

	//const classLinkList = rootEl.querySelector(".classes");
	//let tempString = "";
	let gridString = "";
	for (let i = 0; i < classes.length; i++) {
		const curClass = classes[i];
		// tempString +=
		// 	`<div id='${i}' class='class-item mdc-list-item mdc-theme--on-surface history-link' data-link='${getClassHash(curClass)}' data-title='${curClass.name}'>
		// 		${curClass.name}
		// 	</div>`;

		let svg = curClass.name.replace(/(\s|\(|\))/g, "");

		gridString += 
			`<div class='class-grid-item history-link class-grid-item__${curClass.name.replace(/(\s|\(|\))/g,'')}'
				data-link='${encodeForHash(curClass.name, curClass.source)}' data-title='${curClass.name}'>
				<span class='class-grid-item--text'>${curClass.name}</span>
				<dnd-svg id='${svg}' class='class-grid-item--image class-grid-item__${svg}'></dnd-svg>
			</div>`
	}
	//classLinkList.append(parseHTML(tempString));
	let newClasses = parseHTML(gridString);
	while (newClasses.length > 0) {
		newClasses[0].addEventListener('click', (e) => {
			let tar = e.target.closest('.class-grid-item');
			window.location.hash = tar.getAttribute('data-link');
			rootEl.dispatchEvent(new CustomEvent("selection-change", { bubbles: true, composed: true, detail: {title: tar.getAttribute("data-title")}}))
		});
		rootEl.querySelector(".class-list-container").appendChild(newClasses[0]);
	}
}

function onHashChange(classes, hash, rootEl) {
  rootEl.querySelector("#classtable").innerHTML = window.classTableDefault;
  rootEl.querySelector("#subclasses").classList.remove("fixed");
  rootEl.querySelector("#subclasses").classList.remove("closed");
  rootEl.querySelector(".mobile-clone-spells") && rootEl.querySelector(".mobile-clone-spells").remove();
  const curClass = resolveHash(classes.class, hash);

  let svgName = curClass.name.replace(/(\s|\(|\))/g, "");
  rootEl.querySelector(".class-icon.stand-alone-icon").id = svgName;

  const isUaClass = isNonstandardSource(curClass.source);

  // SUMMARY SIDEBAR =================================================================================================
  // hit dice and HP
  rootEl.querySelector("#hp div#hitdice span").innerHTML = EntryRenderer.getEntryDice(curClass.hd);
  rootEl.querySelector("#hp div#hp1stlevel span").innerHTML = curClass.hd.faces + " + your Constitution modifier";
  rootEl.querySelector("#hp div#hphigherlevels span").innerHTML =
    `${EntryRenderer.getEntryDice(curClass.hd)} (or ${curClass.hd.faces / 2 + 1}) + your Constitution modifier per ${
      curClass.name
    } level after 1st`;

  // save proficiency
  rootEl.querySelector("#prof div#saves span").innerHTML = curClass.proficiency.map(p => Parser.attAbvToFull(p)).join(", ");

  // starting proficiencies
  const sProfs = curClass.startingProficiencies;
  const profSel = rootEl.querySelector("#prof");
  rootEl.querySelector("div#armor span").innerHTML =
		sProfs.armor === undefined
			? STR_PROF_NONE
			: sProfs.armor.map(a => (a === "light" || a === "medium" || a === "heavy" ? a + " armor" : a)).join(", ");
  rootEl.querySelector("div#weapons span").innerHTML =
    sProfs.weapons === undefined
      ? STR_PROF_NONE
      : sProfs.weapons.map(w => (w === "simple" || w === "martial" ? w + " weapons" : w)).join(", ");
  rootEl.querySelector("div#tools span").innerHTML =
    sProfs.tools === undefined ? STR_PROF_NONE : sProfs.tools.join(", ");
  rootEl.querySelector("div#skills span").innerHTML =
    sProfs.skills === undefined ? STR_PROF_NONE : getSkillProfString(sProfs.skills);
  function getSkillProfString(skills) {
    const numString = Parser.numberToString(skills.choose);
    return skills.from.length === 18
      ? `Choose any ${numString}.`
      : `Choose ${numString} from ${joinConjunct(skills.from, ", ", ", and ")}.`;
  }

  // starting equipment
  const sEquip = curClass.startingEquipment;
  const fromBackground = sEquip.additionalFromBackground
    ? "<p>You start with the following items, plus anything provided by your background.</p>"
    : "";
  const defList = sEquip.default.length === 0 ? "" : `<ul><li>${sEquip.default.join("</li><li>")}</ul>`;
  const goldAlt =
    sEquip.goldAlternative === undefined
      ? ""
      : `<p>Alternatively, you may start with ${sEquip.goldAlternative} gp to buy your own equipment.</p>`;
  rootEl.querySelector("#equipment div").innerHTML = `${fromBackground}${defList}${goldAlt}`;

  // FEATURE TABLE ===================================================================================================
  const tData = curClass.classTableGroups;
  const groupHeaders = rootEl.querySelector("#groupHeaders");
  const colHeaders = rootEl.querySelector("#colHeaders");
  const levelTrs = [];
  let spellsFlag = false;
  for (let i = 0; i < tData.length; i++) {
    const tGroup = tData[i];

    const hasTitle = tGroup.title !== undefined;
    let subclassData = "";
    if (tGroup.subclasses !== undefined) {
      subclassData = `${ATB_DATA_SC_LIST}="${tGroup.subclasses
        .map(s => s.name+ATB_DATA_PART_SEP+s.source)
        .join(ATB_DATA_LIST_SEP)}"`;
    }
    groupHeaders.append(parseHTML(
      `<th ${hasTitle ? `class="colGroupTitle table-cell"` : ""} colspan="${tGroup.colLabels.length}" ${subclassData}>${
        hasTitle ? tGroup.title : ""
      }</th>`, true, true));

    for (let j = 0; j < tGroup.colLabels.length; j++) {
      const lbl = tGroup.colLabels[j];
      colHeaders.append(parseHTML(`<th class="centred-col table-cell" ${subclassData}>${lbl}</th>`, true, true));
    }

    for (let j = 0; j < 20; j++) {
      const tr = rootEl.querySelector(`#level${j + 1}`);
      levelTrs[j] = tr;
      for (let k = 0; k < tGroup.rows[j].length; k++) {
        let entry = tGroup.rows[j][k];
        if (entry === 0) entry = "\u2014";
        const stack = [];
        renderer.recursiveEntryRender(entry, stack, "", "");
        tr.append(parseHTML(`<td class="centred-col" ${subclassData}>${stack.join("")}</td>`, true, true));
      }
    }
    if (
      !spellsFlag &&
      (tGroup.colLabels.indexOf("Spells Known") > -1 ||
        tGroup.colLabels.indexOf("Cantrips Known") > -1 ||
        tGroup.colLabels.indexOf("1st") > -1 ||
        tGroup.colLabels.indexOf("Ki Points") > -1 ||
        tGroup.colLabels.indexOf("Rages") > -1 ||
        tGroup.colLabels.indexOf("Talents Known") > -1)
    ) {
      spellsFlag = true;
    }
  }

  rootEl.querySelector("#classtable").classList.remove("mobile-clone-features");
  if (spellsFlag) {
    rootEl.querySelector("#classtable").classList.add("mobile-clone-features");
		let mobileClone = parseHTML('<div class="mobile-clone-spells"></div>');
		mobileClone.append(rootEl.querySelector("#classtable").cloneNode(true));
    mobileClone.querySelector("#classtable").classList.remove("mobile-clone-features");
    mobileClone.querySelector("#groupHeaders th:not(.colGroupTitle)").remove();
    mobileClone.querySelector("#groupHeaders .colGroupTitle") &&
      mobileClone.querySelector("#groupHeaders .colGroupTitle").setAttribute("colspan", "12");
		let colHeaderEls = mobileClone.querySelectorAll("#colHeaders th");
		for (let colHeaderEl of colHeaderEls) {
      if (colHeaderEl.textContent.toLowerCase().indexOf("sneak attack") > -1) {
        colHeaderEl.innerHTML = '<span title="Sneak Attack">Snk Atk</span>';
      } else if (colHeaderEl.textContent.toLowerCase().indexOf("sorcery points") > -1) {
        colHeaderEl.innerHTML = '<span title="Sorcery Points">SP</span>';
      } else if (colHeaderEl.textContent.toLowerCase().indexOf("spells known") > -1) {
        colHeaderEl.innerHTML = '<span title="Spells Known">S</span>';
      } else if (colHeaderEl.textContent.toLowerCase().indexOf("cantrips known") > -1) {
        colHeaderEl.innerHTML = '<span title="Cantrips Known">C</span>';
      }
		}
    jqAfter(rootEl.querySelector("#classtable"), mobileClone);
  }

  // FEATURE DESCRIPTIONS ============================================================================================
  const renderStack = [];
  let subclassIndex = 0; // the subclass array is not 20 elements
  for (let i = 0; i < 20; i++) {
    // track class table feature names
    const tblLvlFeatures = levelTrs[i].querySelector(".features");
    const featureNames = [];

    // add class features to render stack
    const lvlFeatureList = curClass.classFeatures[i];
    for (let j = 0; j < lvlFeatureList.length; j++) {
      const feature = lvlFeatureList[j];
      const featureId = HASH_FEATURE + encodeForHash(feature.name) + "_" + i;

      const featureLinkPart = HASH_FEATURE + encodeForHash(feature.name) + i;
      const featureLink = parseHTML(
        `<a href="#${encodeForHash(curClass.name, curClass.source)}${HASH_PART_SEP}${featureLinkPart}"
          class="${CLSS_FEATURE_LINK}" 
          ${ATB_DATA_FEATURE_LINK}="${featureLinkPart}" 
          ${ATB_DATA_FEATURE_ID}="${featureId}">${feature.name}</a>`
      );
      featureLink.addEventListener("click", function(e) {
        e.preventDefault();
        rootEl.getElementById(featureId).scrollIntoView(true);
        let offset = -84 - jqHeight(rootEl.querySelector("#subclasses"));
        window.scrollBy(0, offset);
      });
      featureNames.push(featureLink);

      const styleClasses = [CLSS_CLASS_FEATURE];
      if (feature.gainSubclassFeature) styleClasses.push(CLSS_GAIN_SUBCLASS_FEATURE);

      renderer.recursiveEntryRender(
        feature,
        renderStack,
        0,
        `<div id="${featureId}" class="${styleClasses.join(" ")}">`,
        `</div>`,
        true
      );

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
                if (
                  childEntry.name !== undefined &&
                  !childEntry.name.startsWith(`<span class="${CLSS_SUBCLASS_PREFIX}">`)
                ) {
                  childEntry.name = `<span class="${CLSS_SUBCLASS_PREFIX}">${subClass.name}: </span>${childEntry.name}`;
                }
              }
            }

            const styleClasses = [CLSS_SUBCLASS_FEATURE];
            const hideSource =
              isNonstandardSource(subClass.source) || hasBeenReprinted(subClass.shortName, subClass.source);
            if (hideSource) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
            renderer.recursiveEntryRender(
              subFeature,
              renderStack,
              0,
              `<div class="${styleClasses.join(" ")}" ${ATB_DATA_SC}="${subClass.name}" ${ATB_DATA_SRC}="${
                subClass.source
              }">`,
              `</div>`,
              true
            );
          }
        }
        subclassIndex++;
      }
    }

    // render class table feature names
    if (featureNames.length === 0) tblLvlFeatures.innerHTML = "\u2014";
    else {
      for (let j = 0; j < featureNames.length; j++) {
        tblLvlFeatures.append(featureNames[j]);
        if (j < featureNames.length - 1) tblLvlFeatures.append(", ");
      }
    }
  }
  rootEl.querySelector("#stats").innerHTML = renderStack.join("");

  // hide UA/other sources by default
	let nonStandardPills = rootEl.querySelectorAll(`.${CLSS_NON_STANDARD_SOURCE}`);
	for (let nonStandardPill of nonStandardPills) {
		if (!nonStandardPill.classList.contains(CLSS_SUBCLASS_PILL)) {
			nonStandardPill.style.display = 'none';
		}
	}

  // CLASS FEATURE/UA/SUBCLASS PILL BUTTONS ==========================================================================
  const subclassPillWrapper = rootEl.querySelector("div#subclasses");
  // remove any from previous class
  jqEmpty(subclassPillWrapper);
  subclassPillWrapper.append(parseHTML(`<div class='title'>Subclasses</div>`));

  // show/hide UA/other sources
  const allSourcesToggle = makeGenericTogglePill(
    "All Sources",
    CLSS_OTHER_SOURCES_ACTIVE,
    ID_OTHER_SOURCES_TOGGLE,
    HASH_ALL_SOURCES,
    false
  );

  // show/hide class features pill
  makeGenericTogglePill(
    "Class Features",
    CLSS_CLASS_FEATURES_ACTIVE,
    ID_CLASS_FEATURES_TOGGLE,
    HASH_HIDE_FEATURES,
    true
  );

  // subclass pills
  const subClasses = curClass.subclasses
    .map(sc => ({ name: sc.name, source: sc.source, shortName: sc.shortName }))
    .sort(function(a, b) {
      return ascSort(a.shortName, b.shortName);
    });
  for (let i = 0; i < subClasses.length; i++) {
    const nonStandardSource =
      isNonstandardSource(subClasses[i].source) || hasBeenReprinted(subClasses[i].shortName, subClasses[i].source);
    const styleClasses = [CLSS_ACTIVE, CLSS_SUBCLASS_PILL];
    if (nonStandardSource) styleClasses.push(CLSS_NON_STANDARD_SOURCE);
    const pillText = hasBeenReprinted(subClasses[i].shortName, subClasses[i].source)
      ? `${subClasses[i].shortName} (${Parser.sourceJsonToAbv(subClasses[i].source)})`
      : subClasses[i].shortName;
    const pill = parseHTML(
      `<div class="${styleClasses.join(" ")}" ${ATB_DATA_SC}="${subClasses[i].name}" ${ATB_DATA_SRC}="${
        subClasses[i].source
      }" title="Source: ${Parser.sourceJsonToFull(
        subClasses[i].source
      )}"><span class='mdc-chip__text'>${pillText}</span></div>`
    );
    pill.addEventListener("click", function() {
      handleSubclassClick(pill.classList.contains(CLSS_ACTIVE), subClasses[i].name, subClasses[i].source);
    });
    if (nonStandardSource) pill.style.display = 'none';
    subclassPillWrapper.append(pill);
  }
  subclassPillWrapper.append(parseHTML(`<div class='tab material-icons'>expand_less</div>`));

  rootEl.querySelector("#subclasses .tab").addEventListener("click", () => {
    rootEl.querySelector("#subclasses").classList.toggle("closed");
  });

  // if this is a UA class, toggle the "All Sources" button
  if (isUaClass) allSourcesToggle.click();

  // helper functions
  function makeGenericTogglePill(pillText, pillActiveClass, pillId, hashKey, defaultActive) {
    const pill = parseHTML(`<div id="${pillId}" class="mdc-chip"><span class="mdc-chip__text">${pillText}</span></div>`);
    if (defaultActive) pill.classList.add(pillActiveClass);
    subclassPillWrapper.append(pill);
    pill.addEventListener("click", function() {
      let active = pill.classList.contains(pillActiveClass);
      if (!defaultActive) active = !active;
      handleToggleFeaturesClicks(active);
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
        outStack.push(hashKey + "true");
      } else {
        outStack.push(hashKey + "false");
      }

      window.location.hash = outStack.join(HASH_PART_SEP);
    }
  }

  function handleSubclassClick(isPillActive, subclassName, subclassSource) {
    const outStack = [];
    const split = window.location.hash.split(HASH_PART_SEP);

    const encodedSubClass = encodeForHash(subclassName, subclassSource);
    const subclassLink = HASH_SUBCLASS + encodedSubClass;

    if (isPillActive && window.location.hash.includes(HASH_SUBCLASS)) {
      for (let i = 0; i < split.length; i++) {
        const hashPart = split[i];
        if (!hashPart.startsWith(HASH_SUBCLASS)) {
					outStack.push(hashPart);
				} else {
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

    window.location.hash = outStack.join(HASH_PART_SEP);
  }
}

function onSubChange(sub, curHash, rootEl) {
  setSubclassFixation(rootEl);
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
		const activeNonStandardPillEls = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PILL}.${CLSS_NON_STANDARD_SOURCE}.${CLSS_ACTIVE}`);
		for (let activeNonStandardPillEl of activeNonStandardPillEls) {
			const $this = activeNonStandardPillEl;
			const thisSc = encodeForHash($this.getAttribute(ATB_DATA_SC), $this.getAttribute(ATB_DATA_SRC));
			if (subclasses.indexOf(thisSc) > -1) {
				toDeselect.push(thisSc)
			}
		}
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
		const $subClassSpanList = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PILL}`);
		for (let classSpan of $subClassSpanList) {
			const $this = classSpan;
			const thisSc = encodeForHash($this.getAttribute(ATB_DATA_SC), $this.getAttribute(ATB_DATA_SRC));
			let shown = false;

			for (let j = 0; j < subclasses.length; j++) {
				const sc = subclasses[j];
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

		if ($toShow.length === 0) {
			displayAllSubclasses();
		} else {
			const otherSrcSubFeats = rootEl.querySelectorAll(`p.${CLSS_NON_STANDARD_SOURCE}`);
			const shownInTable = [];

			for (let v of $toShow) {
				v.classList.add(CLSS_ACTIVE);
        let selectedSCFeatures = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_FEATURE}[${ATB_DATA_SC}="${v.getAttribute(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.getAttribute(ATB_DATA_SRC)}"]`);
				for (let selectedSCFeature of selectedSCFeatures) {
					selectedSCFeature.style.display = null;
				}
        if (hideOtherSources) {
					for (let otherSrcSubFeat of otherSrcSubFeats) {
						if (
              otherSrcSubFeat.getAttribute(ATB_DATA_SC) === v.getAttribute(ATB_DATA_SC) &&
              otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === v.getAttribute(ATB_DATA_SRC)
            ) {
              otherSrcSubFeat.style.display = "none";
            }
					}
				} else {
					for (let otherSrcSubFeat of otherSrcSubFeats) {
						if (
              otherSrcSubFeat.getAttribute(ATB_DATA_SC) === v.getAttribute(ATB_DATA_SC) &&
              otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === v.getAttribute(ATB_DATA_SRC)
            ) {
              otherSrcSubFeat.style.display = null;
            }
					}
				}

        const asInTable = v.getAttribute(ATB_DATA_SC) + ATB_DATA_PART_SEP + v.getAttribute(ATB_DATA_SRC);
        shownInTable.push(asInTable);
        handleTableGroups(shownInTable, asInTable, true);
			}

			for (let v of $toHide) {
				v.classList.remove(CLSS_ACTIVE);
				let selectedSCFeatures = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_FEATURE}[${ATB_DATA_SC}="${v.getAttribute(ATB_DATA_SC)}"][${ATB_DATA_SRC}="${v.getAttribute(ATB_DATA_SRC)}"]`);
				for (let selectedSCFeature of selectedSCFeatures) {
					selectedSCFeature.style.display = 'none';
				}
				for (let otherSrcSubFeat of otherSrcSubFeats) {
          if (
            otherSrcSubFeat.getAttribute(ATB_DATA_SC) === v.getAttribute(ATB_DATA_SC) &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === v.getAttribute(ATB_DATA_SRC)
          ) {
            otherSrcSubFeat.style.display = "none";
          }
        }
        v.getAttribute(ATB_DATA_SC);
				const asInTable = v.getAttribute(ATB_DATA_SC) + ATB_DATA_PART_SEP + v.getAttribute(ATB_DATA_SRC);
				handleTableGroups(shownInTable, asInTable, false);
			};

			if (hideOtherSources) {
				for (let otherSrcSubFeat of otherSrcSubFeats) {
					if (
            !otherSrcSubFeat.classList.contains(CLSS_SUBCLASS_FEATURE) &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SC) === EntryRenderer.DATA_NONE &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === EntryRenderer.DATA_NONE
          ) {
            otherSrcSubFeat.style.display = "none";
          }
				}
			} else {
				for (let otherSrcSubFeat of otherSrcSubFeats) {
					if (
            !otherSrcSubFeat.classList.contains(CLSS_SUBCLASS_FEATURE) &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SC) === EntryRenderer.DATA_NONE &&
            otherSrcSubFeat.getAttribute(ATB_DATA_SRC) === EntryRenderer.DATA_NONE
          ) {
            otherSrcSubFeat.style.display = null;
          }
				}
			}
		}

		// show subclass prefixes if we're displaying more than 1 subclass
		let subClassEls = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PREFIX}`);
		if ($toShow.length !== 1) {
			for (let subClassEl of subClassEls) {
				subClassEl.style.display = null;
			}
		} else {
			for (let subClassEl of subClassEls) {
				subClassEl.style.display = 'none';
			}
		}
	} else {
		displayAllSubclasses();
	}

	// hide class features as required
	const cfToggle = rootEl.querySelector(`#${ID_CLASS_FEATURES_TOGGLE}`);
	const toToggleCf= rootEl.querySelectorAll(`.${CLSS_CLASS_FEATURE}`);
	if (hideClassFeatures !== null && hideClassFeatures) {
		cfToggle.classList.remove(CLSS_CLASS_FEATURES_ACTIVE);
		for (let el of toToggleCf) {
			if (!el.classList.contains(CLSS_GAIN_SUBCLASS_FEATURE)) {
        el.style.display = "none";
      }
		}
	} else {
		cfToggle.classList.add(CLSS_CLASS_FEATURES_ACTIVE);
		for (let el of toToggleCf) {
			if (!el.classList.contains(CLSS_GAIN_SUBCLASS_FEATURE)) {
        el.style.display = null;
      }
		}
	}

	// show UA/etc content as required
	const srcToggle = rootEl.querySelector(`#${ID_OTHER_SOURCES_TOGGLE}`);
	const toToggleSrc = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PILL}.${CLSS_NON_STANDARD_SOURCE}`);
	if (hideOtherSources) {
		srcToggle.classList.remove(CLSS_OTHER_SOURCES_ACTIVE);
		for (let el of toToggleSrc) {
			el.style.display = "none";
		}
	} else {
		srcToggle.classList.add(CLSS_OTHER_SOURCES_ACTIVE);
		for (let el of toToggleSrc) {
			el.style.display = null;
		}
	}

	// scroll to the linked feature if required
	if (feature !== null && (window.prevFeature === undefined || window.prevFeature !== feature)) {
		rootEl.getElementById(rootEl.querySelectorAll(`[${ATB_DATA_FEATURE_LINK}="${feature}"]`).getAttribute(ATB_DATA_FEATURE_ID)).scrollIntoView();
		window.prevFeature = feature;
	}

	updateClassTableLinks();

	function handleTableGroups(shownInTable, tableDataTag, show) {
		let listEls = rootEl.querySelectorAll(`[data-subclass-list]`);
		for (let el of listEls) {
			const $this = el;
			const scs = $this.getAttribute(ATB_DATA_SC_LIST).split(ATB_DATA_LIST_SEP);

			// if another class has shown this item, don't hide it
			if (!show) {
				for (let i = 0; i < scs.length; i++) {
					const sc = scs[i];
					if (sc.indexOf(shownInTable) > -1) {
						return;
					}
				}
			}

			for (let i = 0; i < scs.length; i++) {
				const sc = scs[i];
				if (sc === tableDataTag) {
					if (show) $this.style.display = null;
					else $this.style.display = 'none';
					break;
				}
			}
		}
	}

	function updateClassTableLinks () {
		const hashParts = curHash.slice(1).split(HASH_PART_SEP);
		const outParts = [];
		for (let i = 0; i < hashParts.length; i++) {
			const part = hashParts[i];
			if (!part.startsWith(HASH_FEATURE)) outParts.push(part);
		}
		let els = rootEl.querySelectorAll(`.${CLSS_FEATURE_LINK}`);
		for (let el of els) {
			el.href = HASH_START+outParts.join(HASH_PART_SEP)+HASH_PART_SEP+el.getAttribute(ATB_DATA_FEATURE_LINK);
		}
	}

	function displayAllSubclasses() {
		updateClassTableLinks();
		let els = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PILL}`);
		for (let el of els) {
			el.classList.add(CLSS_ACTIVE);
		}
		let els1 = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_FEATURE}`);
		for (let el of els1) {
			el.style.display = null;
		}
		let els2 = rootEl.querySelectorAll(`.${CLSS_SUBCLASS_PREFIX}`);
		for (let el of els2) {
			el.style.display = null;
		}
		let els3 = rootEl.querySelectorAll(`div.${CLSS_NON_STANDARD_SOURCE}`);
		for (let el of els3) {
			el.style.display = null;
		}
		// if we're hiding features from some sources, make sure these stay hidden
		if (hideOtherSources) {
			let els4 = rootEl.querySelectorAll(`.${CLSS_NON_STANDARD_SOURCE}`)
			for (let el of els4) {
				if (!el.classList.contains(CLSS_SUBCLASS_PILL)) {
					el.style.display = "none";
				}
			}
		}
		// show all table col groups
		// TODO add handling for non-standard sources if UA non-caster->caster subclass are introduced
		let els5 = rootEl.querySelectorAll(`[data-subclass-list]`)
		for (let el of els5) {
			el.style.display = null;
		}
	}
}
