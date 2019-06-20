'use strict';

((Material) => {
    document.addEventListener("DOMContentLoaded", () => {
        // Darkmode Switch
        const darkModeSwitch = Material.switchControl.MDCSwitch.attachTo(document.querySelector(".mdc-switch"));
        darkModeSwitch.checked = window.darkModeSwitchChecked;

        if (window.darkModeSwitchChecked) {
            document.querySelector("body").classList.add("dark");
        } else {
            document.querySelector("body").classList.remove("dark");
        }
        document.querySelector('.darkmode-label').addEventListener('click', () => {
            darkModeSwitch.checked = !darkModeSwitch.checked;
        });

        document.querySelector('.mdc-switch__native-control').addEventListener('change', () => {
            window.localStorage.setItem('darkMode', darkModeSwitch.checked);
            if (darkModeSwitch.checked) {
                document.querySelector('body').classList.add('dark');
            } else {
                document.querySelector('body').classList.remove('dark');
            }
            window.swapCssVariables(darkModeSwitch.checked);
        });

        // Nav Button
        const button = Material.ripple.MDCRipple.attachTo(document.querySelector('.mdc-top-app-bar__navigation-icon'));
        const drawer = Material.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        window.drawer = drawer;
        document.querySelector('.mdc-top-app-bar__navigation-icon').addEventListener('click', (e) => {
            drawer.open = !drawer.open;
        });
        $(document).on("click", ".rules .mdc-list-item, .classes .mdc-list-item", () => {
            drawer.open = false;
        });

        // List Items
        document.querySelectorAll('.mdc-drawer .mdc-list-item').forEach((i) => {
            Material.ripple.MDCRipple.attachTo(i);
        });

        $(document).on('click', '.collapse .collapse-toggle', (e) => {
            let collapse = $(e.target).closest('.collapse'),
                list = collapse.find('.collapse-list');

            if (collapse.hasClass('open')) {
                list.css("margin-top", "-" + list.height() + "px");
            } else {
                list.css("margin-top", "0px");
            }
            collapse.toggleClass('open');
        });

        // swipe
        registerSwipe($('body')[0], 'left', (e) => {
            if (drawer.open) {
                drawer.open = false;
            }
        });
        registerSwipe($('body')[0], 'right', (e) => {
            if (!drawer.open) {
                drawer.open = true;
            }
        });
    });
})(mdc);