
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
`);

registerStyles('vaadin-select-text-field', css`
  [part="label"] {
    color: var(--mdc-theme-primary);
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
`);

registerStyles('vaadin-grid', css`
  :host([theme~="no-border"]) {
    border-top: 3px solid var(--mdc-theme-text-divider-on-background);
  }
  [part~="cell"]:not([part~="details-cell"]) {
    align-items: flex-start;
  }
  :host([height-by-rows]) #table {
    overflow-y: hidden;
  }
  /* Below Tablet */
  @media(max-width: 920px) {
    [no-scrollbars]:not([safari]):not([firefox]) #outerscroller, [no-scrollbars][safari] #table, [no-scrollbars][firefox] #table {
      overflow: auto;
    }
  }
`);