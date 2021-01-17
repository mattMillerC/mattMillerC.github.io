class ImageField extends ReduxMixin(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host([mode='view']) {
        height: 0;
        z-index: 1;
      }
      [hidden] {
        display: none !important;
      }

      #imagewrap {
        position: relative;
      }
      img.big {
        max-width: calc(50% - 20px);
        max-height: 266px;
        position: absolute;
        right: -2px;
      }
      #imagewrap.expanded {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10;
      }
      #imagewrap.expanded img.big {
        margin: auto;
        max-height: 100%;
        max-width: 100%;
        position: relative;
      }

      .edit-container {
        display: flex;
        align-items: flex-start;
      }
      img.small {
        max-height: 60px;
        max-width: 60px;
        margin: 0 auto;
      }
      .image-preview {
        position: relative;
        display: inline-flex;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        overflow: hidden;
        background: grey;
        border-radius: 4px;
      }
      .image-preview dnd-button {
        position: absolute;
        padding: 0;
        background: white;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        padding-right: 2px;
        padding-bottom: 1px;
      }
      .input-container {
        display: flex;
        flex-direction: column;
      }
      dnd-loading-spinner {
        position: absolute;
        left: 20px;
        top: 20px;
      }
      .error {
        color: red;
      }
      label {
        display: block;
        font-size: 0.875em;
        font-weight: 600;
        margin-bottom: 0.25em;
      }
    </style>

    <div id="imagewrap" hidden\$="[[!_isEqual(mode, 'view')]]">
      <img hidden\$="[[!_hasThing(image)]]" class="big" src\$="[[image]]">
    </div>

    <div hidden\$="[[!_isEqual(mode, 'edit')]]">
      <label>Image</label>
      <div class="edit-container">
        <div class="image-preview">
          <img hidden\$="[[!_hasThing(image)]]" class="small" src\$="[[image]]">
          <dnd-button id="clearImg" hidden\$="[[!_hasThing(image)]]" icon="cancel-squared" bigicon=""></dnd-button>
          <dnd-loading-spinner on="[[loading]]"></dnd-loading-spinner>
        </div>
        <div class="input-container">
          <dnd-button-input id="urlField" icon="palette" text="Render" placeholder="Image URL"></dnd-button-input>
          <span class="error">[[errorMsg]]</span>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-image-field';
  }

  static get properties() {
    return {
      image: {
        type: String,
        notify: true,
      },
      mode: {
        type: String,
        statePath: 'selection.mode',
        reflectToAttribute: true,
      },
      loading: {
        type: Boolean,
        value: false,
      },
      errorMsg: {
        type: String,
        value: '',
      },
    };
  }

  ready() {
    super.ready();
    let base64Img = await import('base64-img');

    this.$.imagewrap.addEventListener('click', () => {
      this.$.imagewrap.classList.toggle('expanded');
    });

    this.$.urlField.addEventListener('change', (e) => {
      let url = e.detail;

      this.errorMsg = '';
      this.loading = true;

      base64Img.requestBase64(url, (err, res, body) => {
        this.loading = false;

        if (err) {
          this.errorMsg = 'Image request failed.';
        } else if (
          body.indexOf('undefined') > -1 ||
          body.indexOf('data:text/html;') > -1
        ) {
          this.errorMsg = 'Image response unuseable.';
        } else {
          this.set('image', body);
        }
      });
    });

    this.$.clearImg.addEventListener('click', () => {
      this.image = '';
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.image === undefined) {
      this.image = '';
    }
  }

  _isEqual(a, b) {
    return a === b;
  }

  _hasThing(thing) {
    return !!thing;
  }
}
window.customElements.define(ImageField.is, ImageField);
