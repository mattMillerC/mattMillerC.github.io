"use strict";
/**
 * The API is as follows:
 * - render()
 * - getValues()
 * - addEventListener(type, listener, useCapture)
 * - reset()
 * - deselectIf(func, Filter.header)
 *
 * See the docs for each function for full explanations.
 */
class FilterBox {
	/**
	 * A FilterBox which sits in the search bar. See the Spells or Psionics page for a live example. Allows selection
	 * of multiple sources/spell schools/item types/etc.
	 *
	 * @param inputGroup the search bar DOM element to add the button to
	 * @param resetButton element to bind a reset-on-click to
	 * @param filterList a list of `Filter` objects to build the menus from
	 */
	constructor(inputGroup, resetButton, filterList) {
		this.inputGroup = inputGroup;
		this.resetButton = resetButton;
		this.filterList = filterList;

		this.headers = {};
	}

	/**
	 * Render the "Filters" button in the inputGroup
	 */
	render() {
		this.$list = $(`#listcontainer`).find(`.list`);

		const $filterButton = getFilterButton();
		this.$miniView = getMiniView();
		const $inputGroup = $(this.inputGroup);
		const $dropdownMenu = $('.mdc-menu', $filterButton);
		for (let i = 0; i < this.filterList.length; ++i) {
			$dropdownMenu.append(makeDropdownRow(i, this, this.filterList[i], this.$miniView));
			if (i < this.filterList.length - 1) {
				$dropdownMenu.append($(`<div class="filter-menu-divider"/>`));
			}
		}
		$inputGroup.find('.filter-group--buttons').prepend($filterButton);
		$inputGroup.after(this.$miniView);
		let materialMenu = mdc.menu.MDCMenu.attachTo($dropdownMenu.get(0));

		this.addDropdownHandlers($filterButton, materialMenu);
		addResetHandler(this);

		function getFilterButton() {
			return $(`
				<div class="filter-menu mdc-menu-surface--anchor">
					<button class="mdc-button mdc-button--raised dropdown-toggle" data-toggle="dropdown">
						<i class="material-icons mdc-button__icon" aria-hidden="true">filter_list</i>
						<span class="mdc-button__label">Filter</span>
					</button>
					<div class="mdc-menu mdc-menu-surface"></div>
				</div>`);
		}

		function getMiniView() {
			return $(`<div class="mini-view btn-group hidden-mobile-down"/>`);
		}

		function makeDropdownRow(i, self, filter, $miniView) {
			const $outI = $(`<div class="filter-menu-row">`);

			const $grid = makePillGrid();
			const $innerListHeader = makeHeaderLine();

			$outI.append($innerListHeader);
			$outI.append($grid);

			const newHeader = {index: i, size: filter.items.length, ele: $grid,outer: $outI, filter: filter};
			self.headers[filter.header] = newHeader;

			return $outI;

			function makeHeaderLine() {
				const $line = $(
					`<div class="filter-menu-row__heading">
						<div class="filter-menu-row__heading-label mdc-typography--headline5">${filter.header}</div>
					</div>`);

				const $quickBtns = $(`<div class="filter-menu-row__heading-buttons"/>`);
				const $all = $(`<button class="mdc-button">All</button>`);
				$quickBtns.append($all);
				const $clear = $(`<button class="mdc-button">Clear</button>`);
				$quickBtns.append($clear);
				const $none = $(`<button class="mdc-button">None</button>`);
				$quickBtns.append($none);
				const $default = $(`<button class="mdc-button">Default</button>`);
				$quickBtns.append($default);
				$line.append($quickBtns);

				const $summary = $(`<span class="summary"/>`);
				const $summaryInclude = $(`<span class="include" title="Hiding includes"/>`);
				const $summarySpacer = $(`<span class="spacer"/>`);
				const $summaryExclude = $(`<span class="exclude" title="Hidden excludes"/>`);
				$summary.append($summaryInclude);
				$summary.append($summarySpacer);
				$summary.append($summaryExclude);
				$summary.hide();
				$line.append($summary);

				const $showHide = $(`<button class="mdc-button">Hide</button>`);
				$line.append($showHide);

				$showHide.on(EVNT_CLICK, function(e) {
					e.preventDefault();
					e.stopPropagation();
					if ($grid.is(":hidden")) {
						$showHide.text("Hide");
						$grid.show();
						$quickBtns.show();
						$summary.hide();
					} else {
						$showHide.text("Show");
						$grid.hide();
						$quickBtns.hide();
						const counts = $grid.data("getCounts")();
						if (counts.yes > 0 || counts.no > 0) {
							if (counts.yes > 0) {
								$summaryInclude.prop("title", `${counts.yes} hidden 'required' tag${counts.yes > 1 ? "s" : ""}`);
								$summaryInclude.text(counts.yes);
								$summaryInclude.show();
							} else {
								$summaryInclude.hide();
							}
							if (counts.yes > 0 && counts.no > 0) {
								$summarySpacer.show();
							} else {
								$summarySpacer.hide();
							}
							if (counts.no > 0) {
								$summaryExclude.prop("title", `${counts.no} hidden 'excluded' tag${counts.no > 1 ? "s" : ""}`);
								$summaryExclude.text(counts.no);
								$summaryExclude.show();
							} else {
								$summaryExclude.hide();
							}
							$summary.show();
						}
					}
				});

				$none.on(EVNT_CLICK, function() {
					$grid.find(".filter-pill").each(function() {
						$(this).data("setter")(FilterBox._PILL_STATES[2]);
					});
				});

				$all.on(EVNT_CLICK, function() {
					$grid.find(".filter-pill").each(function() {
						$(this).data("setter")(FilterBox._PILL_STATES[1]);
					});
				});

				$clear.on(EVNT_CLICK, function() {
					$grid.find(".filter-pill").each(function() {
						$(this).data("setter")(FilterBox._PILL_STATES[0]);
					});
				});

				$default.on(EVNT_CLICK, function() {
					self._reset(filter.header);
				});

				return $line;
			}

			function makePillGrid() {
				const $pills = [];
				const $grid = $(`<div class="filter-menu-grid"/>`);

				function cycleState($pill, $miniPill, forward) {
					const curIndex = FilterBox._PILL_STATES.indexOf($pill.attr("state"));

					let newIndex = forward ? curIndex+1 : curIndex-1;
					if (newIndex >= FilterBox._PILL_STATES.length) newIndex = 0;
					else if (newIndex < 0) newIndex = FilterBox._PILL_STATES.length-1;
					$pill.attr("state", FilterBox._PILL_STATES[newIndex]);
					$miniPill.attr("state", FilterBox._PILL_STATES[newIndex]);
					if ($miniPill.attr("state") === 'ignore') {
						$miniPill.css('display', 'none');
					} else {
						$miniPill.css('display', 'inline-block')
					}
				}

				for (const item of filter.items) {
					const $pill = $(`<div class="filter-pill mdc-fab mdc-fab--extended"/>`);
					const $miniPill = $(`<div class="mini-pill  mdc-fab mdc-fab--extended group${i}"/>`);

					const display = filter.displayFn ? filter.displayFn(item) : item;

					$pill.val(item);
					$pill.append($(`<span class="mdc-fab__label">${display}</span>`));
					$miniPill.append($(`<span class="mdc-fab__label">${display}</span>`));

					$pill.attr("state", FilterBox._PILL_STATES[0]);
					$miniPill.attr("state", FilterBox._PILL_STATES[0]);


					$miniPill.on(EVNT_CLICK, function() {
						$pill.attr("state", FilterBox._PILL_STATES[0]);
						$miniPill.attr("state", FilterBox._PILL_STATES[0]);
						setTimeout(() => {
							$miniPill.css('display', 'none');
						}, 200)
						self._fireValChangeEvent();
					});

					$pill.on(EVNT_CLICK, function() {
						cycleState($pill, $miniPill, true);
					});

					$pill.on("contextmenu",function(e){
						e.preventDefault();
						cycleState($pill, $miniPill, false);
					});

					$pill.data(
						"setter",
						(function(toVal) {
							$pill.attr("state", toVal);
							$miniPill.attr("state", toVal);
							if ($miniPill.attr("state") === 'ignore') {
								$miniPill.css('display', 'none');
							} else {
								$miniPill.css('display', 'inline-block')
							}
						})
					);
					$pill.data("resetter",
						(function() {
							if (filter.deselFn && filter.deselFn(item)) {
								$pill.attr("state", "no");
								$miniPill.attr("state", "no");
							} else if (filter.selFn && filter.selFn(item)) {
								$pill.attr("state", "yes");
								$miniPill.attr("state", "yes");
							} else {
								$pill.attr("state", "ignore");
								$miniPill.attr("state", "ignore");
							}
							if ($miniPill.attr("state") === 'ignore') {
								$miniPill.css('display', 'none');
							} else {
								$miniPill.css('display', 'inline-block')
							}
						})
					);
					$pill.data("resetter")();

					$grid.append($pill);
					$miniView.append($miniPill);
					$pills.push($pill);
				}

				$grid.data(
					"getValues",
					function() {
						const out = {};
						const _totals = {yes: 0, no: 0, ignored: 0};
						$pills.forEach(function(p) {
							const state = p.attr("state");
							out[p.val()] = state === "yes" ? 1 : state === "no" ? -1 : 0;
							const countName = state === "yes" ? "yes" : state === "no" ? "no" : "ignored";
							_totals[countName] = _totals[countName]+1;
						});
						out._totals = _totals;
						return out;
					}
				);

				$grid.data(
					"getCounts",
					function() {
						const out = {"yes": 0, "no": 0};
						$pills.forEach(function(p) {
							const state = p.attr("state");
							if (out[state] !== undefined) out[state] = out[state] + 1;
						});
						return out;
					}
				);

				return $grid;
			}
		}

		function addResetHandler(self) {
			if (self.resetButton !== null && self.resetButton !== undefined) {
				self.resetButton.addEventListener(EVNT_CLICK, function () {
					self.reset();
				}, false);
			}
		}
	}

	addDropdownHandlers(filterWrap, materialMenu) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				if (!filterWrap.hasClass('open')) {
					this._fireValChangeEvent();
				}
			});
		});
		observer.observe(filterWrap[0], {attributes : true, attributeFilter: ["class"]});

		$('.mdc-button', filterWrap).on('click', () => {
			materialMenu.open = !materialMenu.open;
		});

		$('.mdc-menu', filterWrap).on('open', (e) => {
			e.stopPropagation();
		});
	}

	/**
	 * Get a map of {Filter.header: {map of Filter.items: <1/0/-1> representing the state
	 * to each pill}}
	 * Additionally, include an element per filter which gives the total of 1/0/-1 entries
	 * Note that 1 represents a "required" pill, 0 represents an "ignored" pill, and -1 respresents an "excluded"
	 * pill.
	 *
	 * @returns the map described above e.g.
	 *
	 * {
	 *  "Source": { "PHB": 1, "DMG": 0, "_totals": { "yes": 1, "no": 0, "ignored": 1 } },
	 *  "School": { "A": 0, "EV": -1, "_totals": { "yes": 0, "no": 1, "ignored": 1 } }
     * }
	 *
	 */
	getValues() {
		const outObj = {};
		for (const header in this.headers) {
			if (!this.headers.hasOwnProperty(header)) continue;
			outObj[header] = this.headers[header].ele.data("getValues")();
		}
		return outObj;
	}

	/**
	 * Convenience function to cleanly add event listeners
	 *
	 * @param type should probably always be `FilterBox.EVNT_VALCHANGE` which is fired when the values available
	 * from getValues() change
	 *
	 * @param listener A function to call when the event is fired. See JS addEventListener docs for more.
	 * @param useCapture See JS addEventListener docs.
	 */
	addEventListener (type, listener, useCapture) {
		this.inputGroup.addEventListener(type, listener, useCapture)
	}

	/**
	 * Reset the selected filters to default, applying any `selFn` and `deselFn` functions from the filters
	 */
	reset() {
		for (const header in this.headers) {
			if (!this.headers.hasOwnProperty(header)) continue;
			this._reset(header);
		}
		this._fireValChangeEvent();
	}

	/**
	 * Helper which resets an section of the filter
	 * @param header the name of the section to reset
	 * @private
	 */
	_reset(header) {
		const cur = this.headers[header];
		cur.ele.find(".filter-pill").each(function() {
			$(this).data("resetter")();
		});
	}

	/**
	 * @private
	 * Helper which dispatched the event when the filter needs to fire a "changed" event
	 */
	_fireValChangeEvent() {
		const eventOut = new Event(FilterBox.EVNT_VALCHANGE);
		this.inputGroup.dispatchEvent(eventOut);
	}
}
FilterBox.CLS_INPUT_GROUP_BUTTON = "input-group-btn";
FilterBox.CLS_DROPDOWN_MENU = "dropdown-menu";
FilterBox.CLS_DROPDOWN_MENU_FILTER = "dropdown-menu-filter";
FilterBox.EVNT_VALCHANGE = "valchange";
FilterBox._PILL_STATES = ["ignore", "yes", "no"];

class Filter {
	/**
	 * A single filter category
	 *
	 * @param options an object with the following properties:
	 *
	 *   header: the category header e.g. "Source"
	 *
	 *   (OPTIONAL)
	 *   items: a list of items to display (after applying the displayFn) in the FilterBox once `render()`
	 *     has been called e.g. ["PHB", "DMG"]
	 *     Note that you can pass a pointer to a list, and add items afterwards. Or pass nothing, which is equivalent to
	 *     passing an empty list. The contents are only evaluated once `render()` is called.
	 *
	 *   (OPTIONAL)
	 *   displayFn: A function to apply to each item in items when displaying the FilterBox on the page
	 *     e.g. Parser.sourceJsonToFull
	 *
	 *   (OPTIONAL)
	 *   selFn: a function, defaults items as "match this" if `selFn(item)` is true
	 *
	 *   (OPTIONAL)
	 *   deselFn: a function, defaults items as "do not match this" if `deselFn(item)` is true
	 *
	 */
	constructor(options) {
		this.header = options.header;
		this.items = options.items ? options.items : [];
		this.displayFn = options.displayFn;
		this.selFn = options.selFn;
		this.deselFn = options.deselFn;
	}

	/**
	 * Add an item if it doesn't already exist in the filter
	 * @param item the item to add
	 */
	addIfAbsent(item) {
		if ($.inArray(item, this.items) === -1) this.items.push(item);
	}

	/**
	 * Takes the output of `FilterBox.getValues()` and an item to check or array of items to check, and matches the
	 * filter against it/them.
	 *
	 * @param valObj `FilterBox.getValues()` returned object
	 * @param toCheck item or array of items to match against
	 * @returns {*} true if this item should be displayed, false otherwise
	 */
	toDisplay(valObj, toCheck) {
		const map = valObj[this.header];
		const totals = map._totals;
		if (toCheck instanceof Array) {

			let display = false;
			// default to displaying
			if (totals.yes === 0) {
				display = true;
			}
			let hide = false;
			for (let i = 0; i < toCheck.length; i++) {
				const item = toCheck[i];

				// if any are 1 (green) include if they match
				if (map[item] === 1) {
					display = true;
				}
				// if any are -1 (red) exclude if they match
				if (map[item] === -1) {
					hide = true;
				}
			}

			return display && !hide;
		} else {
			return doCheck(toCheck);
		}

		function doCheck() {
			if (totals.yes > 0) {
				return map[toCheck] === 1;
			} else {
				return map[toCheck] >= 0;
			}
		}
	}
}

/**
 * An extremely simple deselect function. Simply deselects everything.
 * Useful for creating filter boxes where the default is "everything deselected"
 */
Filter.deselAll = function(val) {
	return true;
};