import { PolymerElement,html } from "@polymer/polymer";
import "../../dnd-accordion";
import { getCharacterChannel,getSelectedCharacter,getClassReferences,getClassLevelGroups } from "../../../util/charBuilder";
import { filterModel } from "../../../util/data";
import { spellHtml } from "../../../js/spells";

class DndCharacterBuilderSpells extends PolymerElement {
  
  static get properties() {
    return {
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected",this.characterChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected",this.characterChangeHandler);
  }

  async updateFromCharacter(character) {
    const now = Date.now();
    if (character) {
      const classRefs = await getClassReferences(character),
        classLevels = getClassLevelGroups(character),
        spellDisplay = [];
      
      for (const [ className, level ] of Object.entries(classLevels)) {
        const classRef = classRefs[className];
        const hasCantrips = 1; // TODO

        if (classRef.casterProgression) {
          const spellTable = classRef.classTableGroups.find((tableGroup) => tableGroup.title === "Spell Slots per Spell Level");
          let spellsKnown;
          let cantripsKnown;
          let spellsPrepared;

          classRef.classTableGroups.forEach((classTableGroup) => {
            if (classTableGroup.colLabels && classTableGroup.colLabels.length) {
              const spellsColIndex = classTableGroup.colLabels.findIndex((label) => label.toLowerCase().indexOf("spells known") > -1);
              if (spellsColIndex > -1 && classTableGroup.rows && classTableGroup.rows.length > level - 1) {
                spellsKnown = classTableGroup.rows[level][spellsColIndex]
              }
              const cantripsColIndex = classTableGroup.colLabels.findIndex((label) => label.toLowerCase().indexOf("cantrips known") > -1);
              if (cantripsColIndex > -1 && classTableGroup.rows && classTableGroup.rows.length > level - 1) {
                cantripsKnown = classTableGroup.rows[level][cantripsColIndex]
              }
            }
          });

          const spellList = (await filterModel('spells', { key: 'classes.fromClassList', value: { name: className, source: classRef.source } }))
            .sort((a, b) => {
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            });
          const spellSlots = spellTable.rows[level - 1].filter((spellSlots) => spellSlots !== 0).map((spellSlots, index) => {
            return {
              level: index + hasCantrips,
              spellSlots,
              spellList: spellList.filter((spell) => spell.level === index + hasCantrips)
            }
          });
          spellDisplay.push({className, level, spellSlots, spellsKnown});
        }
      }
      this.spellDisplay = spellDisplay;
    }
    const later = Date.now();
    console.error('Spells Tab: ' + (later - now));
  }

  _renderSpell(spell) {
    return spellHtml(spell);
  }

  _countToArray(count) {
    const data = [];
    for (var i = 0; i < count; i++) {
      data.push(null);
    }
    return data;
  }

  static get template() {
    return html`
      <style include='my-styles'>
        :host {}
        :host {
          display: block;
          padding: 14px;
        }
        [hidden] {
          display: none !important;
        }

        .stats-wrapper {
          margin: 0 14px;
        }

        .spells-wrap {
          padding-left: 14px;
        }
      </style>

      <h2>Spells</h2>
      <div>
        <template is='dom-repeat' items='[[spellDisplay]]'>
          <h3>[[item.className]] [[item.level]]</h3>
          <template is='dom-repeat' items='[[item.spellSlots]]'>
            <dnd-accordion left-arrow>
              <h4 slot="header">
                <span>Level [[item.level]]</span>

                <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]'>
                  <input type="checkbox"/>
                </template>
              </h4>
              <div class="spells-wrap" slot="body">
                <template is="dom-repeat" items='[[item.spellList]]'>
                  <dnd-accordion>
                    <span slot="header">[[item.name]]  <button>Select</button></span>
                    <div slot="body" class="stats-wrapper" inner-h-t-m-l="[[_renderSpell(item)]]"></div>
                  </dnd-accordion>
                </template>
              </div>
            </dnd-accordion>
          </template>
        </template>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-spells",DndCharacterBuilderSpells);