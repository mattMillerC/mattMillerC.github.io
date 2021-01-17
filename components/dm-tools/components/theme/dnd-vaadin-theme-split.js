const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="dnd-vaadin-theme-split" theme-for="vaadin-grid vaadin-split-layout">
  <template>
    <style>
      /* Vaadin Grid */
      [part~='cell'] {
        padding: 0;
        outline: none !important;
      }

      /* Vaadin Split-layout */
      [part='handle'] {
        width: 14px;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      :host([vertical]) [part='handle'] {
        width: 100%;
        height: 14px;
      }

      [part~='splitter'] {
        border-left: 1px solid #aaa;
        min-width: 0px;
        min-height: 0px;
      }
      :host([vertical]) > [part~='splitter'] {
        border-top: 1px solid #aaa;
        border-left: none;
        border-right: none;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
