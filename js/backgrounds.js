import { utils_combineText, parseHTML, jqHeight, jqPrepend } from "../js/utils.js";
import Parser from "../util/Parser.js";

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="stats margin-bottom_small"></div>
		<div class="table-container collapse collapse--left-arrow disabled">
			<div class="collapse-toggle">
				<div class="mdc-list-item">Trait Roll Tables</div>
			</div>
			<div class="collapse-wrapper">
				<div class="collapse-list"></div>
			</div>
		</div>
	</div>`;

function renderSelection(curbg, rootEl) {
  rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
  const source = curbg.source;
  const sourceAbv = Parser.sourceJsonToAbv(source);
  const sourceFull = Parser.sourceJsonToFull(source);

  const sourceEl = rootEl.querySelector(".stats-wrapper .source");
  sourceEl.classList.add(`source${sourceAbv}`);
	sourceEl.setAttribute("title", sourceFull);
	sourceEl.innerHTML = sourceAbv;

  const traitlist = curbg.trait;

  for (let n = traitlist.length - 1; n >= 0; n--) {
    let texthtml = "";
    texthtml += utils_combineText(traitlist[n].text, "p", "<span class='stat-name'>" + traitlist[n].name + ".</span> ");

    const subtraitlist = traitlist[n].subtrait;
    if (subtraitlist !== undefined) {
      for (let j = 0; j < subtraitlist.length; j++) {
        texthtml = texthtml + "<p class='subtrait'>";
        const subtrait = subtraitlist[j];
        texthtml = texthtml + "<span class='stat-name'>" + subtrait.name + ".</span> ";
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
    if (texthtml.indexOf("<table") === 0) {
			rootEl.querySelector(".stats-wrapper .table-container").classList.remove("disabled");
			const collapseList = rootEl.querySelector(".stats-wrapper .table-container .collapse-list");
			jqPrepend(collapseList, parseHTML(texthtml));
    } else {
			const statsEl = rootEl.querySelector(".stats-wrapper .stats");
			jqPrepend(statsEl, parseHTML(texthtml));
    }
  }

  window.setTimeout(() => {
    let list = rootEl.querySelector(".stats-wrapper .table-container .collapse-list");
    list.style["margin-top"] = "-" + jqHeight(list) + "px";
  }, 0);
}

export { renderSelection };
