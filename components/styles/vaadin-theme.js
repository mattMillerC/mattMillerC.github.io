
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
    [part="value"] {
      -webkit-mask-image: none;
    }
`);