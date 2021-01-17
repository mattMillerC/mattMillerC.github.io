class RichTextArea extends mixins.TermLookupMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <style>
      [hidden] {
        display: none;
      }
      textarea {
        width: calc(100% - 16px);
        background-color: #fff;
        resize: vertical;
        font: inherit;
        height: 100%;
        padding: 7px;
        font-size: 13px;
        line-height: 1.6;
        color: #333;
        border: 1px solid #bebebe;
      }
      textarea:focus {
        -moz-box-shadow: 0 0 8px #88d5e9;
        -webkit-box-shadow: 0 0 8px #88d5e9;
        box-shadow: 0 0 8px #88d5e9;
        border: 1px solid #88d5e9;
        outline: none;
      }
      #mdElement {
        width: 100%;
      }
      #mdElement > p:first-of-type {
        margin-top: 0;
      }
      #mdElement > p:last-of-type {
        margin-bottom: 0;
      }
      .label {
        font-size: 0.875em;
        font-weight: 600;
        margin-bottom: 0.25em;
      }
      .wrapper {
        width: 100%;
        height: 100%;
      }
    </style>

    <div class="wrapper" hidden\$="[[!_isEqual(mode, 'view')]]">
      <div class="wrapper" hidden\$="[[!_isPresent(value)]]">
        <marked-element markdown="{{markdown}}" sanitize="true">
          <div id="mdElement" slot="markdown-html"></div>
        </marked-element>
      </div>
    </div>

    <div class="wrapper" hidden\$="[[!_isEqual(mode, 'edit')]]">
      <div hidden\$="[[hideEditLabel]]" class="label">[[label]]</div>
      <textarea id="editor" value="{{value::input}}"></textarea>
    </div>
`;
  }

  static get is() {
    return 'dnd-rich-text-area';
  }

  static get properties() {
    return {
      value: {
        type: String,
        notify: true,
      },
      markdown: {
        type: String,
      },
      label: {
        type: String,
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
        observer: '_renderMarkup',
      },
      selection: {
        type: Object,
        statePath: 'selection.creature',
        observer: '_renderMarkup',
      },
      inlineLabel: {
        type: Boolean,
        reflectToAttribute: true,
      },
      hideEditLabel: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value === undefined) {
      this.value = '';
    }
    if (this.inlineLabel) {
      this.markdown = `**${this.label}.** ` + this.value;
    } else {
      this.markdown = this.value;
    }
  }

  _renderMarkup() {
    setTimeout(() => {
      if (this.mode === 'view') {
        if (this.inlineLabel) {
          this.markdown = `**${this.label}.** ` + this.value;
        } else {
          this.markdown = this.value;
        }
        this._termLookupFromAnchorElements(this.$.mdElement);
      } else if (this.mode === 'edit') {
        let adjustedHeight =
          this.$.editor.scrollHeight < 40
            ? 40
            : this.$.editor.scrollHeight > 155
            ? 155
            : this.$.editor.scrollHeight - 14;
        this.$.editor.style.height = adjustedHeight + 'px';
      }
    }, 50);
  }

  _isPresent(a) {
    return !!a;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(RichTextArea.is, RichTextArea);
