class SubName extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      [hidden] {
        display: none !important;
      }
      .edit-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      vaadin-combo-box {
        margin-top: 5px;
        margin-bottom: 15px;
        width: calc(33% - 7px);
      }
    </style>
    <div hidden\$="[[!_isEqual(mode, 'view')]]">
      <small>
        <i hidden\$="[[_isEqual(size, '')]]">[[size]]</i><i hidden\$="[[!_useSpace(size, type)]]"> </i><i hidden\$="[[_isEqual(typeString, '')]]">[[typeString]]</i><i hidden\$="[[!_useComma(alignment, size, type)]]">, </i><i hidden\$="[[_isEqual(alignment, '')]]">[[alignment]]</i>
      </small>
    </div>

    <div class="edit-wrap" hidden\$="[[!_isEqual(mode, 'edit')]]">
      <vaadin-combo-box label="Size" items="[[sizeOptions]]" value="{{size}}"></vaadin-combo-box>
      <vaadin-combo-box label="Type" items="[[typeOptions]]" value="{{type}}"></vaadin-combo-box>
      <vaadin-combo-box label="Tag" items="[[tagOptions]]" value="{{tag}}"></vaadin-combo-box>
      <!--<dnd-addto-combobox label="Tag" model="tag" value="{{tag}}"></dnd-addto-combobox>-->
      <vaadin-combo-box label="Alignment" items="[[alignmentOptions]]" value="{{alignment}}" allow-custom-value=""></vaadin-combo-box>
    </div>
`;
  }

  static get is() {
    return 'dnd-subname-field';
  }

  static get properties() {
    return {
      size: {
        type: String,
        notify: true,
      },
      alignment: {
        type: String,
        notify: true,
      },
      type: {
        type: String,
        notify: true,
      },
      tag: {
        type: String,
        notify: true,
      },
      sizeOptions: {
        type: Array,
        statePath: 'selectData.size',
      },
      alignmentOptions: {
        type: Array,
        statePath: 'selectData.alignment',
      },
      typeOptions: {
        type: Array,
        statePath: 'selectData.type',
      },
      tagOptions: {
        type: Array,
        statePath: 'selectData.tag',
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
      },
      typeString: {
        type: String,
        computed: '_typeWithTag(type, tag)',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.size === undefined) {
      this.size = '';
    }
    if (this.alignment === undefined) {
      this.alignment = '';
    }
    if (this.type === undefined) {
      this.type = '';
    }
    if (this.tag === undefined) {
      this.tag = '';
    }
  }

  _typeWithTag() {
    return this.tag ? this.type + ' (' + this.tag + ')' : this.type;
  }

  _useSpace() {
    return this.size && this.type;
  }

  _useComma() {
    return (this.alignment && this.size) || (this.alignment && this.type);
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(SubName.is, SubName);
