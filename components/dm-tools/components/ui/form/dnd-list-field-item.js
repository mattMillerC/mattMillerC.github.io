class ListFieldItem extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      .flex-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .flex-wrap > * {
        margin-right: 30px;
      }
      .flex-wrap > *:last-child {
        margin-right: 0;
      }
      .flex-wrap--column {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .flex-wrap--column > * {
        margin-bottom: 5px;
      }
      dnd-rich-text-area {
        flex: 1 1 70%;
        width: 100%;
      }
      vaadin-text-field {
        flex: 1 1 30%;
      }
    </style>

    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <dnd-rich-text-area inline-label="" label="{{item.name}}" value="{{item.description}}"></dnd-rich-text-area>
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <div class="flex-wrap">
        <div class="flex-wrap--column">
          <vaadin-text-field value="{{item.name}}"></vaadin-text-field>
          <dnd-rich-text-area hide-edit-label="" value="{{item.description}}"></dnd-rich-text-area>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-list-field-item';
  }

  static get properties() {
    return {
      item: {
        type: Object,
        notify: true,
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
    };
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(ListFieldItem.is, ListFieldItem);
