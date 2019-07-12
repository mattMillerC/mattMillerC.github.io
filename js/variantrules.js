"use strict";

(() => {
    const JSON_URL = "data/variantrules.json";

    mdc.textField.MDCTextField.attachTo(document.querySelector(".mdc-text-field"));
    mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector(".mdc-notched-outline"));

	loadJSON(JSON_URL, onJsonLoad);

    let rulesList;
    let tableDefault;

    const entryRenderer = new EntryRenderer();

    function getNames(nameStack, entry) {
        if (entry.name) nameStack.push(entry.name);
        if (entry.entries) {
            for (const eX of entry.entries) {
                getNames(nameStack, eX);
            }
        }
        if (entry.items) {
            for (const eX of entry.items) {
                getNames(nameStack, eX);
            }
        }
    }

    function onJsonLoad(data) {
        rulesList = data;
        tableDefault = $(".stats-wrapper").html();

        const sourceFilter = getSourceFilter();
        const filterBox = initFilterBox(sourceFilter);

        let tempString = "";
        for (let i = 0; i < rulesList.length; i++) {
            const curRule = rulesList[i];

            const searchStack = [];
            for (const e1 of curRule.entries) {
                getNames(searchStack, e1);
            }

            tempString += `
			<tr class="table-row history-link" data-link="${encodeForHash(curRule.name)}_${encodeForHash(
                curRule.source
            )}" data-title="${curRule.name}" ${FLTR_ID}="${i}" id='${i}'>
				<td class='table-cell table-cell--border name'>${curRule.name}</td>
				<td class='table-cell source source${Parser.sourceJsonToAbv(
                    curRule.source
                )}' style='width: 72px;' title='${Parser.sourceJsonToFull(curRule.source)}'>${Parser.sourceJsonToAbv(
                curRule.source
            )}</td>
				<td class='search' style='display:none;'>${searchStack.join(",")}</span>
			</tr>`;

            // populate filters
            sourceFilter.addIfAbsent(curRule.source);
        }
        $(".list.variantRules").append(tempString);

        const list = search({
            valueNames: ["name", "source", "search"],
            listClass: "variantRules"
        });

        sourceFilter.items.sort(ascSort);

        filterBox.render();

        // filtering function
        $(filterBox).on(FilterBox.EVNT_VALCHANGE, handleFilterChange);

        function handleFilterChange() {
            list.filter(function(item) {
                const f = filterBox.getValues();
                let filterId = $(item.elm).attr(FLTR_ID);

                if (filterId) {
                    const r = rulesList[filterId];
                    return sourceFilter.toDisplay(f, r.source);
                } else {
                    return true;
                }
            });
        }

        initHistory();
        handleFilterChange();
    }

    window.loadhash = function(id) {
        // reset details pane to initial HTML
        $(".stats-wrapper").html(tableDefault);

        const curRule = rulesList[id];

        // build text list and display
        const textStack = [];
        entryRenderer.recursiveEntryRender(curRule, textStack);
        $(".stats-wrapper .text").after(textStack.join(""));
    }
})();