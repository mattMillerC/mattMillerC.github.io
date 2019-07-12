"use strict";

(() => {
    let rulesList;
    const RULES_URL = "data/rules.json";

    loadJSON(RULES_URL, onJsonLoad);

    function onJsonLoad(data) {
        rulesList = data.compendium.rules;

        for (let i = 0; i < rulesList.length; i++) {
            const rule = rulesList[i];
            $(".rules." + rule.parentlist).append(
                `<div class='mdc-list-item mdc-theme--on-surface history-link' id='${i}' data-link='${encodeURI(
                    rule.name
                ).toLowerCase()}' data-title='${rule.name}'>
				<span class='name col-xs-12'>${rule.name}</span> 
				<span class='id' style='display: none;'>${rule.id.toString()}</span>
			</div>`
            );
        }

        const listNames = [];
        for (let i = 0; i < rulesList.length; i++) {
            const toAdd = rulesList[i].parentlist;
            if ($.inArray(toAdd, listNames) === -1) listNames.push(toAdd);
        }

        $(".list.rules").each(function() {
            $(this)
                .children("a")
                .sort(function(a, b) {
                    const sorta = $(a)
                        .children("span.id")
                        .text();
                    const sortb = $(b)
                        .children("span.id")
                        .text();
                    return sorta > sortb ? 1 : -1;
                })
                .appendTo(this);
        });

        let rulesCloned = $(".rules-wrapper").clone();
        rulesCloned.find(".collapse").addClass("collapse--left-arrow");
        $("#rulescontent").before(rulesCloned);

        initHistory();
    }

    window.loadhash = function(id) {
        const contentArea = $("#rulescontent");
        const currules = rulesList[id];

        contentArea.html(currules.htmlcontent);
    }
})();