
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
`);

registerStyles('vaadin-integer-field', css`
    :host([focused]:not([readonly])) [part="label"] {
      color: var(--mdc-theme-primary);
    }
    [part="value"] {
      -webkit-mask-image: none;
    }
`);