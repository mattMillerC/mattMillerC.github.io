const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="dnd-vaadin-theme-dialog" theme-for="vaadin-dialog-overlay">
  <template>
    <style>
      [part='overlay'] {
        box-shadow: 0 0 0 1px var(--lumo-contrast-5pct),
          var(--lumo-box-shadow-xl);
        animation: 0.2s vaadin-dialog-enter cubic-bezier(0.215, 0.61, 0.355, 1);
        background-image: none;
        width: 60%;
        padding: 0 20px;
      }

      [part='content'] {
        padding: var(--lumo-space-m);
      }

      @keyframes vaadin-dialog-enter {
        0% {
          opacity: 0;
          transform: scale(0.8) translateY(10px);
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
