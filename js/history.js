"use strict";
function hashchange(e) {
	$(".main-spinner").removeClass("hidden");
	const [link, ...sub] = _getHashParts();

	if (link && (!e || sub.length === 0)) {
		const $el = _getListElem(link);
		if ($el && $el.attr("id")) {
			loadhash($el.attr("id"));
			window.scrollTo(0, 0);
			$('.history-link.selected').removeClass('selected');
			$el.addClass('selected');
			if (!window.originalTitle) {
				window.originalTitle = $('.main .page-title').first().text();
			}
			let newTitle = decodeURIComponent($el.data('title'));
			$('.breadcrumbs__no_caret').removeClass('breadcrumbs__no_caret').addClass('breadcrumbs__caret-removed');
			$('.breadcrumbs__last').text(newTitle);
			$('.main .page-title').first().text(newTitle);
			$('.main').addClass('item-opened');
			$(".history-link.list-item--activated").removeClass("list-item--activated");
			$(`.history-link[data-title='${newTitle}']`).addClass("list-item--activated");
			document.title = newTitle + " - 5E Tools";
		} else {
			resetHash();
		}
	} else {
		resetHash();
	}

	if (typeof loadsub === "function" && sub.length > 0) {
		loadsub(sub);
	}
	$(".main-spinner").addClass("hidden");
}

function blankHash() {
	window.location.hash = '';
}

function resetHash() {
	window.originalTitle
	$('.history-link.selected').removeClass('selected');
	$('.main').removeClass('item-opened');
	$('.breadcrumbs__caret-removed').removeClass('breadcrumbs__caret-removed').addClass('breadcrumbs__no_caret');
	$('.breadcrumbs__last').text('');
	$('.main .page-title').first().text(window.originalTitle);
	document.title = window.originalTitle + " - 5E Tools";
}

function initHistory() {
	window.onhashchange = hashchange;
	if (window.location.hash.length) {
		hashchange();
	}
	$(document).on('click', '.history-link', (e) => {
		let hashLink = $(e.target).closest('.history-link').data('link');
		if (hashLink) {
			location.hash = hashLink;
		}
	});
	$(document).on('click', '.close-item', (e) => {
		blankHash();
	});
	$(".main-spinner").addClass('hidden');
}

function getSelectedListElement() {
	const [link, ...sub] = _getHashParts();
	return _getListElem(link);
}

function _getHashParts() {
	return window.location.hash.slice(1).split(HASH_PART_SEP);
}

function _getListElem(link) {
	const listWrapper = $(`.history-link[data-link='${link.toLowerCase()}']`);
	if (listWrapper[0]) {
		return listWrapper;
	}
	return undefined;
}