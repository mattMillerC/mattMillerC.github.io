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
    const navListItems = document.querySelectorAll(".rules .mdc-list-item, .classes .mdc-list-item")
    for (let navListItem of navListItems) {
      navListItem.addEventListener("click", () => {
        drawer.open = false;
      });
    }
    
    // List Items
    const listItems = document.querySelectorAll('.mdc-drawer .mdc-list-item');
    for (let listItem of listItems) {
      Material.ripple.MDCRipple.attachTo(listItem);
    }
    
    const collapseToggles = document.querySelectorAll('.collapse .collapse-toggle');
    for (let collapseToggle of collapseToggles) {
      collapseToggle.addEventListener("click", e => {
        let collapse = $(e.target).closest(".collapse"),
        list = collapse.find(".collapse-list");
        
        if (collapse.hasClass("open")) {
          list.css("margin-top", "-" + list.height() + "px");
        } else {
          list.css("margin-top", "0px");
        }
        collapse.toggleClass("open");
      });
    }
    
    // swipe
    registerSwipe(document.body, 'left', () => {
      if (drawer.open) {
        drawer.open = false;
      }
    });
    registerSwipe(document.body, "right", () => {
      if (!drawer.open) {
        drawer.open = true;
      }
    });
  });
})(mdc);