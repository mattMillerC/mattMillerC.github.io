class CreatureListFilter extends AsyncActionsMixin(
  ReduxMixin(Polymer.Element)
) {
  static get template() {
    return Polymer.html`
    <link rel="stylesheet" href="./css/photon-fields.css">
    <style>
      [hidden] {
        display: none !important;
      }
      :host {
        display: flex;
        height: 190px;
      }
      .wrapper {
        color: black;
        display: flex;
        flex-wrap: wrap;
      }
      .wrapper > *:not(.wrapper) {
        margin: 5px;
      }
      vaadin-text-field {
        width: 100%;
      }
      #search {
        width: 360px;
      }
      .result-count {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: white;
      }
      .clear-wrap {
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }
      vaadin-text-field[has-value],
      vaadin-combo-box[has-value] {
        box-shadow: 0 0 2px 2px Highlight;
      }
    </style>

    <dnd-toolbar>
      <div class="wrapper">
        <vaadin-text-field name="name" id="search" placeholder="Name Search"></vaadin-text-field>

        <div class="wrapper" hidden\$="[[!_isEqual(model, &quot;monsters&quot;)]]">
          <vaadin-combo-box class="short" name="size" placeholder="Size" items="[[sizeOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="type" placeholder="Type" items="[[typeOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="tag" placeholder="Tag" items="[[tagOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="source" placeholder="Source" items="[[sourceOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="crMin" placeholder="Min CR" items="[[crOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="crMax" placeholder="Max CR" items="[[crOptions]]"></vaadin-combo-box>
        </div>

        <div class="wrapper" hidden\$="[[!_isEqual(model, &quot;players&quot;)]]">
          <vaadin-combo-box class="short" name="class" placeholder="Class" items="[[classOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="race" placeholder="Race" items="[[raceOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="tag" placeholder="Tag" items="[[tagOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="levelMin" placeholder="Min Level" items="[[levelOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="levelMax" placeholder="Max Level" items="[[levelOptions]]"></vaadin-combo-box>
        </div>

        <div class="wrapper" hidden\$="[[!_isEqual(model, &quot;npcs&quot;)]]">
          <vaadin-combo-box class="short" name="class" placeholder="Class" items="[[classOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="race" placeholder="Race" items="[[raceOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="tag" placeholder="Tag" items="[[tagOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="crMin" placeholder="Min CR" items="[[crOptions]]"></vaadin-combo-box>
          <vaadin-combo-box class="short" name="crMax" placeholder="Max CR" items="[[crOptions]]"></vaadin-combo-box>
        </div>

        <div class="clear-wrap">
          <dnd-button id="clearBtn" negative="" text="Clear"></dnd-button>
        </div>
        <div class="result-count">
          <span>[[totalCreaturesCount]] results</span>
          <dnd-loading-spinner on="[[isLoading]]"></dnd-loading-spinner>
          <dnd-button default="" icon="plus" on-click="addModel"></dnd-button>
        </div>
      </div>
    </dnd-toolbar>
`;
  }

  static get is() {
    return 'dnd-creature-list-filter';
  }

  static get properties() {
    return {
      filter: {
        type: Object,
        statePath: 'cursor.filter',
      },
      creatures: {
        type: Array,
        statePath: 'cursor.creatures',
      },
      model: {
        type: String,
        statePath: 'cursor.model',
      },
      totalCreaturesCount: {
        type: Number,
        computed: '_listSize(creatures)',
      },
      isLoading: {
        type: Boolean,
        statePath: 'loading',
      },
      sizeOptions: {
        type: Array,
        statePath: 'selectData.size',
      },
      typeOptions: {
        type: Array,
        statePath: 'selectData.type',
      },
      tagOptions: {
        type: Array,
        statePath: 'selectData.tag',
      },
      crOptions: {
        type: Array,
        statePath: 'selectData.cr',
      },
      sourceOptions: {
        type: Array,
        statePath: 'selectData.source',
      },
      classOptions: {
        type: Array,
        statePath: 'selectData.clazz',
      },
      raceOptions: {
        type: Array,
        statePath: 'selectData.race',
      },
      levelOptions: {
        type: Array,
        statePath: 'selectData.level',
      },
    };
  }

  static get observers() {
    return ['clearFilters(model)'];
  }

  connectedCallback() {
    super.connectedCallback();

    let inputs = this.root.querySelectorAll('vaadin-combo-box');
    let search = this.$.search;

    for (let input of inputs) {
      input.addEventListener('change', (e) => {
        this.filterChange(e);
      });
    }

    search.addEventListener('keyup', (e) => {
      if (e.which === 13) {
        this.filterChange(e);
      }
    });

    this.$.clearBtn.addEventListener('click', (e) => {
      this.clearFilters();
    });
  }

  clearFilters() {
    let inputs = this.root.querySelectorAll('vaadin-combo-box');
    let search = this.$.search;

    for (let input of inputs) {
      input.value = '';
    }
    search.value = '';

    this.dispatch({ type: 'SET_CURSOR_FILTER', filter: {} });
    this.dispatch('loadCursor');
  }

  addModel() {
    this.dispatch({ type: 'SET_SELECTION_MODE', mode: 'edit' });
    this.dispatch({
      type: 'SET_SELECTION',
      selection: { model: this.model, creature: {} },
    });
  }

  filterChange(e) {
    let filterName = e.target.name;
    let filterValue = e.target.value;

    if (filterName) {
      if (filterName === 'name') {
        if (
          filterValue !== '' &&
          filterValue !== null &&
          filterValue !== undefined
        ) {
          let searchTerms = filterValue.split(' ').join('.*');
          this.filter.name = { $regex: new RegExp(searchTerms, 'i') };
        } else {
          delete this.filter.name;
        }
      } else if (filterName === 'crMin') {
        if (
          filterValue !== '' &&
          filterValue !== null &&
          filterValue !== undefined
        ) {
          if (this.filter.cr) {
            this.filter.cr['$gte'] = parseFloat(filterValue);
          } else {
            this.filter.cr = { $gte: parseFloat(filterValue) };
          }
        } else {
          if (this.filter.cr && this.filter.cr['$gte']) {
            if (this.filter.cr['$lte']) {
              delete this.filter.cr['$gte'];
            } else {
              delete this.filter.cr;
            }
          }
        }
      } else if (filterName === 'crMax') {
        if (
          filterValue !== '' &&
          filterValue !== null &&
          filterValue !== undefined
        ) {
          if (this.filter.cr) {
            this.filter.cr['$lte'] = parseFloat(filterValue);
          } else {
            this.filter.cr = { $lte: parseFloat(filterValue) };
          }
        } else {
          if (this.filter.cr && this.filter.cr['$lte']) {
            if (this.filter.cr['$gte']) {
              delete this.filter.cr['$lte'];
            } else {
              delete this.filter.cr;
            }
          }
        }
      } else if (filterName === 'levelMin') {
        if (
          filterValue !== '' &&
          filterValue !== null &&
          filterValue !== undefined
        ) {
          if (this.filter.level) {
            this.filter.level['$gte'] = parseFloat(filterValue);
          } else {
            this.filter.level = { $gte: parseFloat(filterValue) };
          }
        } else {
          if (this.filter.level && this.filter.level['$gte']) {
            if (this.filter.level['$lte']) {
              delete this.filter.level['$gte'];
            } else {
              delete this.filter.level;
            }
          }
        }
      } else if (filterName === 'levelMax') {
        if (
          filterValue !== '' &&
          filterValue !== null &&
          filterValue !== undefined
        ) {
          if (this.filter.level) {
            this.filter.level['$lte'] = parseFloat(filterValue);
          } else {
            this.filter.level = { $lte: parseFloat(filterValue) };
          }
        } else {
          if (this.filter.level && this.filter.level['$lte']) {
            if (this.filter.level['$gte']) {
              delete this.filter.level['$lte'];
            } else {
              delete this.filter.level;
            }
          }
        }
      } else if (filterValue === '' && this.filter[filterName]) {
        delete this.filter[filterName];
      } else if (filterValue !== '') {
        this.filter[filterName] = filterValue;
      }

      this.dispatch({ type: 'SET_CURSOR_FILTER', filter: this.filter });
    }

    this.dispatch('loadCursor');
  }

  _listSize(creatures) {
    return this.creatures.length;
  }

  _isEqual(a, b) {
    return a === b;
  }
}
window.customElements.define(CreatureListFilter.is, CreatureListFilter);
