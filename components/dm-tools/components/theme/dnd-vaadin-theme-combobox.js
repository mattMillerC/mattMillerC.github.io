const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="dnd-vaadin-theme-combobox" theme-for="vaadin-combo-box">
  <template>
    <style>
      :host(.short) {
        width: 113px;
      }
      :host(.short) [part='text-field'] {
        width: 113px;
        max-width: none;
      }

      [part='text-field'] {
        width: 100%;
      }

      [part='clear-button'],
      [part='toggle-button'] {
        cursor: pointer;
        height: 20px;
      }

      [part='clear-button']::before {
        content: '\\e901';
        padding-right: 4px;
      }

      [part='toggle-button']::before {
        content: '';
        font-family: 'photon-entypo';
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
