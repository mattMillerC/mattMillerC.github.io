import {
  getSourceFilter,
  getAsiFilter,
  initFilterBox,
  utils_getAbilityData,
  utils_makePrerequisite,
  search,
  debounce,
  ascSort,
  parseHTML
} from "../js/utils.js";
import { HASH_LIST_SEP, FLTR_ID, STR_NONE } from "./consts.js";
import Parser from "./Parser.js";
import { FilterBox } from "./Filter.js";

function renderTable(data, rootEl, columns) {
	const sourceFilter = getSourceFilter();
	const asiFilter = getAsiFilter();
	const filterBox = initFilterBox(
		rootEl,
		sourceFilter,
		asiFilter
	);

	const tableEl = rootEl.querySelector(".list");
	for (let i = 0; i < data.length; i++) {
		const curItem = data[i];
    const name = curItem.name;
		let columnsHtmlString = '';
		for (let col of columns) {
			switch (col.id) {
        case "ability":
          const ability = utils_getAbilityData(curItem.ability);
          if (!ability.asText) {
            ability.asText = STR_NONE;
          }
					curItem._fAbility = ability.asCollection; // used when filtering
					columnsHtmlString += `<td class='table-cell ability ${ability.asText === STR_NONE ? "list-entry-none " : ""} ${col.cssClass}'>${ability.asText}</td>`;
					break;

        case "name":
					columnsHtmlString += `<td class='table-cell table-cell--border name ${col.cssClass}'>${name}</td>`;
					break;

        case "source":
					columnsHtmlString += `<td class='table-cell source source${curItem.source} ${col.cssClass}' title='${Parser.sourceJsonToFull(curItem.source)}'>${Parser.sourceJsonToAbv(curItem.source)}</td>`;
					break;

        case "prerequisite":
					let prereqText = utils_makePrerequisite(curItem.prerequisite, true);
					if (!prereqText) {
						prereqText = STR_NONE;
					}
					columnsHtmlString += `<td class='table-cell prerequisite ${prereqText === STR_NONE ? "list-entry-none " : ""} ${col.cssClass}'>${prereqText}</td>`;
          break;
      }
		}
		let tempString = `
			<tr class='table-row history-link' data-link='${encodeURIComponent(name)+HASH_LIST_SEP+encodeURIComponent(curItem.source)}' 
			  data-title='${name}' ${FLTR_ID}='${i}' id='${i}'>
				${columnsHtmlString}
			</tr>`;

		// populate filters
		sourceFilter.addIfAbsent(curItem.source);
		const rowEl = parseHTML(tempString, true);
		tableEl.append(rowEl);
	}

	// sort filters
	sourceFilter.items.sort(ascSort);

	// init list
	const list = search({
		valueNames: columns.map(col => col.id),
		listClass: "list"
	}, rootEl);

	filterBox.render();
	
	let handleFilterChange = debounce(() => {
		list.filter(function(item) {
			const f = filterBox.getValues();
			let filterId = item.elm.getAttribute(FLTR_ID);
			if (filterId) {
				const ft = data[item.elm.getAttribute(FLTR_ID)];

				return sourceFilter.toDisplay(f, ft.source) && asiFilter.toDisplay(f, ft._fAbility);
			} else {
				return true;
			}
		});
	}, 200);

	// filtering function
	filterBox.addEventListener(FilterBox.EVNT_VALCHANGE, handleFilterChange);

	handleFilterChange();
}

function resolveHash(data, hash) {
  const hashParts = hash.substring(1).split(HASH_LIST_SEP);
  const name = decodeURIComponent(hashParts[0]);
  const source = decodeURIComponent(hashParts[1]);

  for (let item of data) {
    if (item.name === name && item.source === source) {
      return item;
    }
  }
  console.error('Hash link was not found in loaded data', hash, data);
  return undefined;
}

export {renderTable, resolveHash};