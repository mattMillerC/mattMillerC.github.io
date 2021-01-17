class Select extends AsyncActionsMixin(ReduxMixin(Polymer.Element)) {
  static get template() {
    return Polymer.html`
    <style>
      [hidden] {
        display: none !important;
      }
      :host {
        position: relative;
        display: inline-block;
      }
      :host([form]) dnd-button {
        padding-top: 6px;
      }
      :host([form]) dnd-button:after {
        top: 6px !important;
      }
      dnd-button {
        display: block;
        position: relative;
        padding-right: 25px;
      }
      dnd-button:after {
        content: '';
        font-family: 'photon-entypo';
        margin-left: 5px;
        position: absolute;
        right: 8px;
        top: 4px;
      }

      #dropdown.open {
        display: block;
      }
      #dropdown {
        display: none;
        min-width: 100%;
        z-index: 10;
        position: absolute;
        top: -3px;
        left: 0;
        box-shadow: 0px 0px 16px 0px rgba(100, 100, 100, 0.55);
        border-radius: 6px;
      }
      .dropdown-wrap {
        background-color: rgba(245, 245, 245, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 6px;
        padding-top: 4px;
      }

      .option {
        display: flex;
        color: #333;
        font-size: 12px;
        align-items: center;
        line-height: 1.4;
        padding: 3px 8px;
        position: relative;
        cursor: default;
        white-space: nowrap;
      }
      .option[selected] .check {
        display: block;
      }
      .option:not([selected]):not(.label) .check {
        display: none;
      }
      .option[selected] .txt {
        display: none;
      }
      .option:not([selected]) .txt {
        display: block;
        margin-left: 19px;
      }
      .option:hover {
        background: #2e88f3;
        color: #fff;
      }
      .option:hover .delete-option-btn {
        opacity: 1;
      }
      .delete-option-btn {
        font-size: 15px;
        line-height: 15px;
        text-align: center;
        color: #666;
        opacity: 0;
        padding-left: 3px;
        padding-right: 3px;
        transition: opacity 0.1s linear, background-color 0.1s linear;
        border-radius: 3px;
        z-index: 10;
        box-shadow: none;
        cursor: pointer;
      }
    </style>

    <dnd-button class="trigger" text\$="{{_titleOverText(title, text)}}" icon\$="[[icon]]" dropdown="" default\$="[[_hasAttribute(&quot;default&quot;)]]" negative\$="[[_hasAttribute(&quot;negative&quot;)]]" positive\$="[[_hasAttribute(&quot;positive&quot;)]]" warning\$="[[_hasAttribute(&quot;warning&quot;)]]" primary\$="[[_hasAttribute(&quot;primary&quot;)]]"></dnd-button>

    <div id="dropdown">
      <div class="dropdown-wrap">
        <section val="" class="label option" on-click="_changeHandler">
          <dnd-icon text\$="[[text]]" icon\$="[[icon]]"></dnd-icon>
        </section>

        <section class="no option" hidden\$="{{_hasOptions(options)}}">
          No stored options.
        </section>
        <template is="dom-repeat" items="{{options}}">
          <div class="option" selected\$="[[_isSelected(item.value, item._id, item.title, val)]]" on-click="_changeHandler" state-id="[[item._id]]" val="[[item.value]]">
            <span class="txt">[[_or(item.title, '&nbsp;')]]</span>
            <dnd-icon class="check" icon="check" text\$="[[item.title]]"></dnd-icon>
            <dnd-button hidden\$="[[!_hasDeleteCallback()]]" class="delete-option-btn" on-click="_deleteHandler" icon="cancel"></dnd-button>
          </div>
        </template>
      </div>
    </div>
`;
  }

  static get is() {
    return 'dnd-select';
  }

  static get properties() {
    return {
      model: {
        type: String,
      },
      val: {
        type: String,
        notify: true,
      },
      title: {
        type: String,
        value: '',
      },
      text: {
        type: String,
      },
      icon: {
        type: String,
      },
      changeCallback: {
        type: Function,
      },
      deleteCallback: {
        type: Function,
      },
      options: {
        type: Array,
        statePath(state) {
          return state.selectData[this.model];
        },
      },
    };
  }

  observers() {
    return ['_externalValueChange(val)'];
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.deleteCallback) {
      this.dispatch('loadSelectSource', this.model);
    }

    let $dropdown = this.$.dropdown;

    for (let trigger of this.root.querySelectorAll('.trigger')) {
      trigger.addEventListener('click', (e) => {
        if ($dropdown.classList.toggle('open')) {
          setTimeout(function () {
            window.addEventListener('click', function fn(e) {
              if (!e.target.closest('dnd-select')) {
                $dropdown.classList.remove('open');
              }
              window.removeEventListener('click', fn);
            });
          }, 300);
        }
      });
    }
  }

  _externalValueChange() {
    for (let option in this.options) {
      if (option.val === this.val || option.id === this.val) {
        this._changeValue(option.val, option.title, option.id);
      }
    }
  }

  _changeHandler(e) {
    let option = e.target.closest('.option'),
      val = option.val || '',
      id = option.stateId,
      title = option.textContent.trim();

    this._changeValue(val, title, id);
  }

  _changeValue(val, title, id) {
    if (id !== undefined) {
      this.set('val', id);
    } else {
      this.set('val', val);
    }
    this.set('title', title);

    this.$.dropdown.classList.remove('open');
    if (this.changeCallback && typeof this.changeCallback === 'function') {
      this.changeCallback(val, id, title);
    }
    this.dispatchEvent(new Event('change'));
  }

  _addHandler(e) {
    /* TODO */
  }

  _deleteHandler(e) {
    let val = e.target.closest('.option').val,
      id = e.target.closest('.option').stateId;

    e.preventDefault();
    e.stopPropagation();
    this.$.dropdown.classList.remove('open');
    if (this.deleteCallback && typeof this.deleteCallback === 'function') {
      this.deleteCallback(val, id);
    }
  }

  _hasText() {
    return this.text ? this.text : false;
  }

  _hasAttribute(attr) {
    return this.hasAttribute(attr);
  }

  _hasDeleteCallback() {
    return this.deleteCallback && typeof this.deleteCallback === 'function';
  }

  _hasOptions() {
    return this.options.length > 0;
  }

  _isEqual(a, b) {
    return a === b;
  }

  _or(a, b) {
    return a ? a : b;
  }

  _isSelected(itemVal, itemId, itemText) {
    if (
      this.val !== undefined &&
      (this.val == itemVal || this.val == itemId)
    ) {
      this.set('title', itemText.trim());
      return true;
    } else {
      return false;
    }
  }

  _titleOverText() {
    return this.title ? this.title : this.text;
  }
}
window.customElements.define(Select.is, Select);
