
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles('vaadin-select', css`
    :host([mini]) {
      width: 36px;
    }
    :host([mini]) [part="value"] {
      visibility: hidden;
      padding: 0;
    }
    :host([add]) [part="toggle-button"] {
      margin-left: -10px;
    }
    :host([add]) [part="toggle-button"]::before {
      content: var(--lumo-icons-plus);
    }
    :host([no-animate]) {
      animation-duration: 0s !important;
    }

    :host([disabled]) .prefix {
      margin: -12px;
      color: var(--lumo-body-text-color);
    }
  
    :host([disabled]) [part="toggle-button"] {
      display: none;
    }
`);

registerStyles('vaadin-select-text-field', css`
  [part="label"] {
    color: var(--mdc-theme-primary);
  }

  :host([disabled]) [part="label"] {
    color: var(--mdc-theme-primary);;
    -webkit-text-fill-color: var(--mdc-theme-primary);
  }

  :host([disabled]) [part="input-field"] {
    background-color: transparent;
  }
  :host([disabled]) [part="input-field"] ::slotted(*) {
    color: var(--lumo-body-text-color);
    -webkit-text-fill-color: var(--lumo-body-text-color);
  }
`);

registerStyles('vaadin-text-field', css`
  :host([disabled]) [part="input-field"] {
    background-color: transparent;
  }
  :host([disabled]) [part="value"] {
    color: var(--lumo-body-text-color);
    -webkit-text-fill-color: var(--lumo-body-text-color);
    margin-left: -16px;
  }
`);

registerStyles('vaadin-select-overlay', css`
    :host {
      animation-duration: 0s !important;
    }
`);

registerStyles('vaadin-list-box', css`
    [part="items"] ::slotted([focus-ring]:not([disabled])) {
      box-shadow: unset !important;
    }
`);

registerStyles('vaadin-integer-field', css`
    :host([focused]:not([readonly])) [part="label"] {
      color: var(--mdc-theme-primary);
    }
    [part="label"] {
      color: var(--mdc-theme-primary);
    }
    [part="value"] {
      -webkit-mask-image: none;
    }
    :host([disabled]) [part="label"] {
      color: var(--mdc-theme-primary);
      -webkit-text-fill-color: var(--mdc-theme-primary);
    }
    :host([disabled]) [part="decrease-button"],
    :host([disabled]) [part="increase-button"] {
      display: none !important;
    }

`);

registerStyles('vaadin-grid', css`
  :host([theme~="no-border"]) {
    border-top: 3px solid var(--mdc-theme-text-divider-on-background);
  }
  [part~="cell"]:not([part~="details-cell"]) {
    align-items: flex-start;
  }
  :host([theme~="no-row-padding"]) [part~="cell"] ::slotted(vaadin-grid-cell-content) {
    padding: 0;
  }
  :host([theme~="no-row-padding"]) [part~="cell"] {
    min-height: 2px;
  }

  :host {
    touch-action: unset !important;
  }
  #scroller {
    touch-action: unset !important;
  }
`);
