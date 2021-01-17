const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="dnd-vaadin-theme-textfield" theme-for="vaadin-text-field vaadin-text-area">
  <template>
    <style>
      [part='label'] {
        font-size: 0.875em;
        font-weight: 600;
        margin-bottom: 0.25em;
      }
      [part='input-field'] {
        padding: 7px;
        font-size: 13px;
        line-height: 1.6;
        background-color: #fff;
        color: #333;
        border: 1px solid #bebebe;
      }
      [part='value'] {
        border: 0;
        background: transparent;
        padding: 0;
        margin: 0;
        font: inherit;
        outline: none;
        box-shadow: none;
      }
      [part='error-message'] {
        font-size: 0.875em;
        margin-top: 0.25em;
        color: red;
      }
      [part='label'] {
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.25em;
      }

      :host(.form) {
        width: 100%;
        max-width: none;
      }
      :host(.button-input) {
        width: 140px;
      }
      :host([part='text-field']) [part='input-field'] {
        padding: 1px 7px;
      }

      :host(.button-input) [part='input-field'] {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
        width: 140px;
        padding: 1px 7px;
      }
      :host([focused]:not(.button-input)) [part='input-field'] {
        -moz-box-shadow: 0 0 8px #88d5e9;
        -webkit-box-shadow: 0 0 8px #88d5e9;
        box-shadow: 0 0 8px #88d5e9;
        border: 1px solid #88d5e9;
      }
      :host([invalid]) [part='input-field'] {
        border-color: red;
      }
      :host([disabled]) {
        opacity: 0.5;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
