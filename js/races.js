import { utils_combineText, utils_getAbilityData } from "../js/utils.js";
import EntryRenderer from "../util/entryrender.js";
import Parser from "../util/Parser.js";

const stats_wrapper = `
	<div class="stats-wrapper margin-bottom_large">
		<div class="source margin-bottom_small"></div>
		<div class="size margin-bottom_small"></div>
		<div class="ability margin-bottom_small"></div>
		<div class="speed margin-bottom_small"></div>
		<div class="stats"></div>
	</div>`;

function renderSelection(race, rootEl) {
  rootEl.querySelector(".selection-wrapper").innerHTML = stats_wrapper;
  const sourceEl = rootEl.querySelector(".stats-wrapper .source");
  sourceEl.classList.add(`source${race.source}`);
  sourceEl.setAttribute("title", Parser.sourceJsonToFull(race.source));
  sourceEl.innerHTML = `${Parser.sourceJsonToAbv(race.source)}`;

  const size = Parser.sizeAbvToFull(race.size);
  rootEl.querySelector(".stats-wrapper .size").innerHTML = size;
  if (size === "") {
    rootEl.querySelector(".stats-wrapper .size").style.display = "none";
  }

  const ability = utils_getAbilityData(race.ability);
  rootEl.querySelector(".stats-wrapper .ability").innerHTML = ability.asText;

  let speed;
  if (typeof race.speed === "string") {
    speed = race.speed + (race.speed === "Varies" ? "" : "ft. ");
  } else {
    speed = race.speed.walk + "ft.";
    if (race.speed.climb) speed += `, climb ${race.speed.climb}ft.`;
  }
  rootEl.querySelector(".stats-wrapper .speed").innerHTML = speed;
  if (speed === "") {
    rootEl.querySelector(".stats-wrapper .speed").style.display = "none";
  }

  const traitlist = race.trait;
  if (traitlist) {
    let statsText = "<div class='stat-item'>";
    for (let n = 0; n < traitlist.length; ++n) {
      const trait = traitlist[n];

      const header = `<span class='stat-name'>${trait.name}.</span> `;
      statsText += utils_combineText(traitlist[n].text, "p", header);
    }
    statsText += "</div>";
    rootEl.querySelector(".stats-wrapper .stats").innerHTML = statsText;
  } else if (race.entries) {
    const renderStack = [];
    const faux = { type: "entries", entries: race.entries };

    // Grung to test with
    new EntryRenderer().recursiveEntryRender(faux, renderStack, 1, "<div class='renderer-output'>", "</div>", true);

    rootEl.querySelector(".stats-wrapper .stats").innerHTML = renderStack.join("");
  }
}

export { renderSelection };
