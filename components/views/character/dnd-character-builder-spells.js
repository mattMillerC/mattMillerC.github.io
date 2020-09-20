import { PolymerElement,html } from "@polymer/polymer";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle";
import { getCharacterChannel, getSelectedCharacter, getClassReferences, getClassLevelGroups, toggleSpellPrepared, saveCharacter, getAttributeModifier, isSpellPreparedFromObj, setSpellSlots, getSpellSlots, toggleCantripPrepared, getSubclassChoiceLevel } from "../../../util/charBuilder";
import { filterModel } from "../../../util/data";
import { getEditModeChannel, isEditMode } from "../../../util/editMode";
import { spellHtml } from "../../../js/spells";
import { findInPath, util_capitalize, util_capitalizeAll } from "../../../js/utils";
import Parser from "../../../util/Parser";
import "@vaadin/vaadin-checkbox";

// todo:
// compute spell slots for multiclassing, warlock ++
// add DC / Spell Hit Mod / Spells Prepared to top
// Make grid non-heightByRows, fix resizing issues, use detail toggle for spells

class DndCharacterBuilderSpells extends PolymerElement {
  
  static get properties() {
    return {
      spellsKnown: {
        type: Object,
        value: {}
      },
      preparedSpells: {
        type: Object,
        value: {}
      },
      heightByRows: {
        type: Boolean,
        value: () => {
          return window.innerWidth < 900;
        }
      },
      isEditMode: {
        type: Boolean,
        value: false
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.characterChangeHandler = (e) => {
      let character = e.detail.character;
      this.updateFromCharacter(character);
    };
    this.refresh = true;
    this.updateFromCharacter(getSelectedCharacter());
    getCharacterChannel().addEventListener("character-selected",this.characterChangeHandler);

    this.editModeHandler = (e) => {
      this.isEditMode = e.detail.isEditMode;
      this.refresh = true;
      this.updateFromCharacter(getSelectedCharacter());
    }
    getEditModeChannel().addEventListener('editModeChange', this.editModeHandler);
    this.isEditMode = isEditMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    getCharacterChannel().removeEventListener("character-selected",this.characterChangeHandler);
    getEditModeChannel().removeEventListener('editModeChange', this.editModeHandler);
  }

  ready() {
    super.ready();

    this.multiclassSlotsDef = [
      [2],
      [3],
      [4,2],
      [4,3],
      [4,3,2],
      [4,3,3],
      [4,3,3,1],
      [4,3,3,2],
      [4,3,3,3,1],
      [4,3,3,3,2],
      [4,3,3,3,2,1],
      [4,3,3,3,2,1],
      [4,3,3,3,2,1,1],
      [4,3,3,3,2,1,1],
      [4,3,3,3,2,1,1,1],
      [4,3,3,3,2,1,1,1],
      [4,3,3,3,2,1,1,1,1],
      [4,3,3,3,3,1,1,1,1],
      [4,3,3,3,3,2,1,1,1],
      [4,3,3,3,3,2,2,1,1]
    ];

    setTimeout(() => {
      const grid = this.$.grid;

      grid.dataProvider = ((params, callback) => {
        const startIndex = params.page * params.pageSize;
        const children = params.parentItem ? params.parentItem.children : this.spellDisplay;
        if (children && children.length) {
          const page = children.slice(startIndex, startIndex + params.pageSize);
          callback(page, children.length);
        }
      }).bind(this);
    }, 0);
  }

  updateSpellStats(character, classRefs, classLevels) {

  }

  async updateFromCharacter(character) {
    if (character && this.refresh) {
      const classRefs = await getClassReferences(character),
        classLevels = getClassLevelGroups(character),
        expandedItems = [],
        spellsKnownObj = {};
      let spellDisplay = [];

      this.updateSpellStats(character, classRefs, classLevels);

      for (const [ className, level ] of Object.entries(classLevels)) {
        const classRef = classRefs[className];

        if (classRef.casterProgression) {
          let spellsKnownOrPrepared;
          let spellsKnowPreparedType = 'known';
          let cantripsKnown;
          let warlockSpellLevel;
          let warlockSpellSlots;

          // Getting spells + cantrips known info from table, also getting warlock info from table
          classRef.classTableGroups.forEach((classTableGroup) => {
            if (classTableGroup.colLabels && classTableGroup.colLabels.length) {
              const spellsColIndex = classTableGroup.colLabels.findIndex((label) => label.toLowerCase().indexOf("spells known") > -1);
              if (spellsColIndex > -1 && classTableGroup.rows && classTableGroup.rows.length > level - 1) {
                spellsKnownOrPrepared = classTableGroup.rows[level - 1][spellsColIndex];
              }
              const cantripsColIndex = classTableGroup.colLabels.findIndex((label) => label.toLowerCase().indexOf("cantrips known") > -1);
              if (cantripsColIndex > -1 && classTableGroup.rows && classTableGroup.rows.length > level - 1) {
                cantripsKnown = classTableGroup.rows[level - 1][cantripsColIndex];
              }
              const warlockSpellLevelColIndex = classTableGroup.colLabels.findIndex((label) => label.toLowerCase().indexOf("slot level") > -1);
              if (warlockSpellLevelColIndex > -1 && classTableGroup.rows && classTableGroup.rows.length > level - 1) {
                const warlockSpellLevelString = classTableGroup.rows[level - 1][warlockSpellLevelColIndex];
                const warlockSpellLevelMatches = warlockSpellLevelString.match(/(\d+)/g);
                if (warlockSpellLevelMatches && warlockSpellLevelMatches.length) {
                  warlockSpellLevel = parseInt(warlockSpellLevelMatches[0]);
                }
              }
              const warlockSpellSlotsColIndex = classTableGroup.colLabels.findIndex((label) => label.toLowerCase().indexOf("spell slots") > -1);
              if (warlockSpellSlotsColIndex > -1 && classTableGroup.rows && classTableGroup.rows.length > level - 1) {
                warlockSpellSlots = classTableGroup.rows[level - 1][warlockSpellSlotsColIndex];
              }
            }
          });

          // otherwise compute spells prepared
          if (spellsKnownOrPrepared === undefined) {
            spellsKnowPreparedType = 'prepared';
            const levelMultiplier = classRef.casterProgression === 'full' ? 1 : 0.5;
            const attributeModifier = await getAttributeModifier(classRef.spellcastingAbility);
            spellsKnownOrPrepared = Math.floor(level * levelMultiplier) + attributeModifier;
            spellsKnownOrPrepared = spellsKnownOrPrepared < 1 ? 1 : spellsKnownOrPrepared;
          }

          // Getting class spell list
          let classSpellList = await filterModel('spells', { key: 'classes.fromClassList', value: { name: className, source: classRef.source } } );

          // Getting subclass spell list (always prepared)
          const subclassLevel = getSubclassChoiceLevel(classRef);
          if (level >= subclassLevel) {
            const subclassName = character.subclasses && character.subclasses[className] ? character.subclasses[className].shortName : '';
            if (subclassName) {
              let subclassSpellList = await filterModel('spells', { key: 'classes.fromSubclass', value: { 'subclass.name': subclassName, 'class.name': className, 'class.source': classRef.source } } );
              subclassSpellList.forEach(spell => { spell.isSubclassSpell = true });
              classSpellList = [...new Set(classSpellList.concat(subclassSpellList))];
            }
          }

          // Getting spell slots per level array
          const spellTable = classRef.classTableGroups.find((tableGroup) => tableGroup.title === "Spell Slots per Spell Level");
          let spellSlotEntries;
          if (spellTable) {
            spellSlotEntries = spellTable.rows[level - 1].filter((spellSlots) => spellSlots !== 0);
          } else {
            // If no spell slots per level, then we're a warlock, get spell entries for
            // warlocks with zero spell slots at each level (pact slots will be added later)
            spellSlotEntries = [];
            for (let i = 0; i < warlockSpellLevel; i++) {
              spellSlotEntries.push(0);
            }
          }

          // Adding cantrips entry
          const hasCantrips = cantripsKnown ? 0 : 1;
          if (cantripsKnown) {
            spellSlotEntries = [0].concat(spellSlotEntries);
          }

          // Clearing prepared spells to filter out those that can no longer be prepared
          let oldSpellsPrepared = JSON.parse(JSON.stringify(character.preparedSpells));
          let oldCantripsPrepared = JSON.parse(JSON.stringify(character.preparedCantrips));
          character.preparedSpells[className] = {};
          character.preparedCantrips[className] = {};

          // Generating hierarchical structure of classes > levels > spells > spellDef
          const spellSlots = spellSlotEntries.map((spellSlots, index) => {
            if (spellSlots !== -1) {
              let spellList = classSpellList
                .filter((spell) => {
                  return spell.level === index + hasCantrips;
                })
                .sort((a, b) => {
                  if (a.name < b.name) { return -1; }
                  if (a.name > b.name) { return 1; }
                  return 0;
                })
                .map(spell => {
                  const isCantrip = index + hasCantrips === 0;
                  const isPrepared = isCantrip ? isSpellPreparedFromObj(className, spell, oldCantripsPrepared) : isSpellPreparedFromObj(className, spell, oldSpellsPrepared);
                  if (isPrepared) {
                    if (isCantrip) {
                      character.preparedCantrips[className][spell.name] = {name: spell.name, source: spell.source};
                    } else {
                      character.preparedSpells[className][spell.name] = {name: spell.name, source: spell.source};
                    }
                  }
                  if (this.isEditMode || isPrepared || spell.isSubclassSpell) {
                    return {
                      id: 'spell',
                      name: spell.name, 
                      children: [{...spell, hasChildren: false, id: 'spelldef', parentClass: className, parentLevel: index + hasCantrips} ],
                      hasChildren: true,
                      parentClass: className,
                      parentLevel: index + hasCantrips,
                      isCantrip,
                      isSubclassSpell: spell.isSubclassSpell,
                      isWarlock: !!warlockSpellLevel
                    };
                  } else {
                    return undefined;
                  }
                })
                .filter((spell) => spell !== undefined);
              const levelObj = {
                id: 'level',
                level: index + hasCantrips,
                spellSlots,
                currentSlots: getSpellSlots(index + hasCantrips),
                children: spellList,
                hasChildren: spellList.length > 0,
                parentClass: className,
                isWarlock: !!warlockSpellLevel
              };
              const isExpanded = this.$.grid.expandedItems.some(item => item.id === 'level' && item.level === levelObj.level && item.parentClass === levelObj.parentClass);
              if (isExpanded) {
                expandedItems.push(levelObj);
              }
              return levelObj;
            } else {
              return null
            }
          }).filter(slots => slots !== null);

          spellsKnownObj[className] = {
            current: character.preparedSpells && character.preparedSpells[className] ? Object.keys(character.preparedSpells[className]) : [],
            max: spellsKnownOrPrepared,
            type: spellsKnowPreparedType,
            maxCantrips: cantripsKnown,
            currentCantrips: character.preparedCantrips && character.preparedCantrips[className] ? Object.keys(character.preparedCantrips[className]) : []
          };

          if (spellSlots.length) {
            const classObj = {
              id: 'class',
              className,
              level,
              hasCantrips,
              children: spellSlots,
              spellsKnown: spellsKnownOrPrepared,
              hasChildren: spellSlots.length > 0,
              spellPrepType: spellsKnowPreparedType,
              multiclassingLevels: Math.floor((classRef.casterProgression === 'full' ? 1 : 0.5) * level),
              isWarlock: !!warlockSpellLevel,
              warlockSpellLevel,
              warlockSpellSlots
            };
            expandedItems.push(classObj);
            spellDisplay.push(classObj);
          }
        }
      }

      // sorting most levels first
      spellDisplay.sort((a, b) => a.children.length - b.children.length);

      // Changing structure for non-edit mode & multiclassing
      if (!this.isEditMode && spellDisplay.length) {
        let newSpellDisplay = [],
          multiclassLevel = 0,
          isMulticlass = -1,
          warlockSpellLevel,
          warlockSpellSlots;

        // Combine all class spell levels into single references
        for (let spellClass of spellDisplay) {
          if (!spellClass.isWarlock) {
            multiclassLevel += spellClass.multiclassingLevels;
            isMulticlass ++;
          } else {
            warlockSpellLevel = spellClass.warlockSpellLevel;
            warlockSpellSlots = spellClass.warlockSpellSlots;
          }

          spellClass.children.forEach((spellLevel, index) => {
            const adjIndex = index + spellClass.hasCantrips;
            if (!newSpellDisplay[adjIndex]) {
              newSpellDisplay[adjIndex] = spellLevel;
            } else if (spellLevel.children[index]) {
              newSpellDisplay[adjIndex].children.push(spellLevel.children[index]);
            }
          });
        }

        // remove index 0 if no cantrips
        newSpellDisplay = newSpellDisplay.filter(i => i !== undefined);

        // Changing spell slots for multiclass rules
        const hasCantrips = newSpellDisplay[0].level === 0;
        if (isMulticlass > 0) {
          const multiclassSlotsArray = this.multiclassSlotsDef[multiclassLevel];

          for (let i = (hasCantrips ? 1 : 0); i < newSpellDisplay.length; i++) {
            newSpellDisplay[i].spellSlots = multiclassSlotsArray[i - (hasCantrips ? 1 : 0)];
          }
        }

        // Adding warlock slots
        if (warlockSpellLevel) {
          newSpellDisplay[warlockSpellLevel - (hasCantrips ? 0 : 1)].warlockSpellSlots = warlockSpellSlots;
          newSpellDisplay[warlockSpellLevel - (hasCantrips ? 0 : 1)].currentWarlockSlots = character.warlockSpellSlots || 0;
        }

        spellDisplay = newSpellDisplay;
      }

      this.refresh = false;
      saveCharacter(character);
      this.spellsKnown = spellsKnownObj;
      this.spellDisplay = spellDisplay;
      this.expandedItems = expandedItems;
      this.dispatchEvent(new CustomEvent("loadingChange", { bubbles: true, composed: true }));
      this.$.grid.clearCache();
    }
  }

  _renderSpell(spell) {
    return spellHtml(spell);
  }

  _toggleSpellPrepared(e) {
    e.preventDefault();
    e.stopPropagation();
    const isSubclassSpell = e.model.item.isSubclassSpell;
    if (!isSubclassSpell && this.isEditMode) {
      const isCantrip = e.model.item.isCantrip;
      if (isCantrip) {
        this._toggleCantripPrepared(e);
      } else {
        const className = e.model.item.parentClass;
        const spell = e.model.item.children[0];
        const isPrepared = this._isPreparedSpell(this.spellsKnown, className, spell.name);
        const currentPreparedCount = this._currentSpellsKnownCount(className, this.spellsKnown);
        const maxPreparedCount = this._maxSpellsKnownCount(className, this.spellsKnown);

        if ((isPrepared || currentPreparedCount < maxPreparedCount) && spell.id === 'spelldef') {
          let spellsKnownCopy = JSON.parse(JSON.stringify(this.spellsKnown));
          if (isPrepared) {
            const index = spellsKnownCopy[className].current.indexOf(spell.name);
            spellsKnownCopy[className].current.splice(index, 1);
          } else {
            spellsKnownCopy[className].current.push(spell.name);
          }
          this.spellsKnown = spellsKnownCopy;
          toggleSpellPrepared(className, spell);
        } else if (currentPreparedCount >= maxPreparedCount) {
          this._flashPreparedButton(findInPath('button', e.path));
        }
      }
    }
  }

  _toggleCantripPrepared(e) {
    e.preventDefault();
    e.stopPropagation();
    const className = e.model.item.parentClass;
    const spell = e.model.item.children[0];
    const isPrepared = this._isPreparedCantrip(this.spellsKnown, className, spell.name);
    const currentPreparedCount = this._currentCantripsKnownCount(className, this.spellsKnown);
    const maxPreparedCount = this._maxCantripsKnownCount(className, this.spellsKnown);

    if ((isPrepared || currentPreparedCount < maxPreparedCount) && spell.id === 'spelldef') {
      let spellsKnownCopy = JSON.parse(JSON.stringify(this.spellsKnown));
      if (isPrepared) {
        const index = spellsKnownCopy[className].currentCantrips.indexOf(spell.name);
        spellsKnownCopy[className].currentCantrips.splice(index, 1);
      } else {
        spellsKnownCopy[className].currentCantrips.push(spell.name);
      }
      this.spellsKnown = spellsKnownCopy;
      toggleCantripPrepared(className, spell);
    } else if (currentPreparedCount >= maxPreparedCount) {
      this._flashPreparedButton(findInPath('button', e.path));
    }
  }

  _flashPreparedButton(buttonEl) {
    if (buttonEl) {
      buttonEl.classList.add('transition-bg');
      buttonEl.classList.add('flash-error');
      setTimeout(() => {
        buttonEl.classList.remove('flash-error');
        setTimeout(() => {
          buttonEl.classList.remove('transition-bg');
        }, 200);
      }, 200);
    }
  }

  _toggleSpellSlot(e) {
    e.preventDefault();
    e.stopPropagation();
    const isInput = findInPath('vaadin-checkbox', e.path);
    const isWarlock = !!findInPath('[warlock-spell]', e.path);
    const currentSlots = isWarlock ? e.model.item.currentWarlockSlots : e.model.item.currentSlots;
    const maxSlots = isWarlock ? e.model.item.warlockSpellSlots : e.model.item.spellSlots;
    const level = e.model.item.level;

    if (isInput) {
      const isChecked = !isInput.checked;
      if (!isChecked && currentSlots < maxSlots) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots + 1
        } else {
          e.model.item.currentSlots = currentSlots + 1;
        }
  
      } else if (currentSlots > 0) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots - 1;
        } else {
          e.model.item.currentSlots = currentSlots - 1;
        }
      }
    } else {
      if (currentSlots < maxSlots) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots + 1;
        } else {
          e.model.item.currentSlots = currentSlots + 1;
        }

      } else if (currentSlots > 0) {
        if (isWarlock) {
          e.model.item.currentWarlockSlots = currentSlots - 1;
        } else {
          e.model.item.currentSlots = currentSlots - 1;
        }
      }
    }
    
    if (isWarlock) {
      this._setSpellSlotsChecked(e.model.item.currentWarlockSlots, findInPath('.slot-checkboxes', e.path));
      setSpellSlots(level, e.model.item.currentWarlockSlots, undefined, true);
    } else {
      this._setSpellSlotsChecked(e.model.item.currentSlots, findInPath('.slot-checkboxes', e.path));
      setSpellSlots(level, e.model.item.currentSlots);
    }
  }

  _setSpellSlotsChecked(count, el) {
    const checkboxes = el.querySelectorAll('vaadin-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      if (i < count) {
        checkboxes[i].checked = true;
      } else {
        checkboxes[i].checked = false
      }
    }
  }

  _preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _isPreparedClass(spellsKnown, item, isEditMode) {
    const className = item.parentClass;
    const spellName = item.name;
    const isCantrip = item.isCantrip;
    const isSubclassSpell = item.isSubclassSpell;
    if (isSubclassSpell) {
      return isEditMode ? 'spell-button always-prepared edit-mode' : 'spell-button always-prepared';
    }
    let isPrepared = isCantrip ? this._isPreparedCantrip(spellsKnown, className, spellName) : this._isPreparedSpell(spellsKnown, className, spellName, isSubclassSpell);
    if (isPrepared) {
      return isEditMode ? 'spell-prepared spell-button edit-mode' : 'spell-prepared spell-button';
    }
    return isEditMode ? 'spell-button edit-mode' : 'spell-button';
  }

  _isPreparedSpell(spellsKnown, className, spellName, isSubclassSpell){
    return isSubclassSpell || spellsKnown[className] && spellsKnown[className].current && spellsKnown[className].current.length && spellsKnown[className].current.indexOf(spellName) > -1;
  }

  _isPreparedCantrip(spellsKnown, className, spellName){
    return spellsKnown[className] && spellsKnown[className].currentCantrips && spellsKnown[className].currentCantrips.length && spellsKnown[className].currentCantrips.indexOf(spellName) > -1;
  }

  _isPreparedText(spellsKnown, item) {
    const className = item.parentClass;
    const spellName = item.name;
    const isCantrip = item.isCantrip;
    const isSubclassSpell = item.isSubclassSpell;
    const prepareType = spellsKnown[className].type;
    if (isSubclassSpell) {
      return prepareType === 'known' ? 'Always' : 'Always';
    }
    let isPrepared = isCantrip ? this._isPreparedCantrip(spellsKnown, className, spellName) : this._isPreparedSpell(spellsKnown, className, spellName, isSubclassSpell);
    
    if (isPrepared) {
      return prepareType === 'known' ? 'Learned' : 'Prepared';
    } else {
      return prepareType === 'known' ? 'Learn' : 'Prepare';
    }
  }

  _countToArray(count) {
    const data = [];
    for (var i = 0; i < count; i++) {
      data.push(null);
    }
    return data;
  }

  _toLevel(level) {
    if (level === 0) {
      return Parser.spLevelToFull(level) + 's';
    } else {
      return Parser.spLevelToFull(level) + ' Level';
    }
  }
  
  _currentSpellsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className] && spellsKnown[className].current) {
      return spellsKnown[className].current.length;
    }
    return 0;
  }

  _maxSpellsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className]) {
      return spellsKnown[className].max;
    }
    return 0;
  }
  
  _currentCantripsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className] && spellsKnown[className].current) {
      return spellsKnown[className].currentCantrips.length;
    }
    return 0;
  }

  _maxCantripsKnownCount(className, spellsKnown) {
    if (spellsKnown && className && spellsKnown[className]) {
      return spellsKnown[className].maxCantrips;
    }
    return 0;
  }

  _spellsKnownString(spellPrepType) {
    return 'Spells ' + util_capitalize(spellPrepType) + ':'
  }

  _isRitualSpell(spellParent) {
    const spell = spellParent.children[0];
    return spell && spell.meta && spell.meta.ritual;
  }

  _isConcentrationSpell(spellParent) {
    const spell = spellParent.children[0];
    return spell.duration.some((d) => d.concentration);
  }

  _spellLevel(item) {
    if (item && item.children && item.children.length && item.children[0].level) {
      return Parser.spLevelToFull(item.children[0].level);
    }
  }

  _isSpellSlotChecked(currentSlots, index) {
    return index < currentSlots;
  }

  _spellClassText(parentClass) {
    return util_capitalizeAll(parentClass);
  }

  _isEmpty(a) {
    return !a || !a.length;
  }

  _hideCheckboxes(spellSlots) {
    return !spellSlots || spellSlots > 0 && this.isEditMode;
  }

  _equal(a, b) {
    return a === b;
  }

  static get template() {
    return html`
      <style include='my-styles'>
        :host {}
        :host {
          display: block;
        }
        [hidden] {
          display: none !important;
        }

        h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 34px 14px 24px;
        }

        vaadin-grid-tree-toggle { 
          width: 100%;
          cursor: pointer;
        }

        .class-wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 4px;
          /* padding-top: 34px;
          padding-bottom: 8px; */
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .class-wrap h3 {
          font-size: 22px;
          font-weight: bold;
        }

        .spells-prepared-text {
          margin-right: 6px;
          margin-left: auto;
        }
        .prepared-count {
          color: var(--mdc-theme-secondary);
          font-weight: bold;
        }
        .cantrips-prepared {
          margin-right: 0;
        }

        .level-outer-wrap {
          border-bottom: 1px solid var(--_lumo-grid-secondary-border-color);
          padding-bottom: 8px;
          display: flex;
          height: 32px;
        }

        .level-wrap {
          width: 100%;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .slot-checkboxes {
          cursor: pointer;
          display: flex;
          padding: 4px;
        }

        .slot-checkboxes span {
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          margin-left: 4px;
        }

        .checkbox {
          width: 18px;
          height: 18px;
          margin: 4px;
          background-color: var(--mdc-theme-text-disabled-on-background);
        }
        .checkbox[checked] {
          background-color: var(--mdc-theme-secondary);
        }

        .spell-wrap {
          width: calc(100% - 100px);
          margin-left: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spell-inner-wrap {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -youbkit-touch-callout: none;
          -youbkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .spell-level {
          color: var(--mdc-theme-text-disabled-on-background);
          margin-left: 8px;
          margin-right: 4px;
          font-size: 12px;
        }

        .rit-ind,
        .conc-ind {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          color: var(--mdc-theme-on-secondary);
          background-color: var(--mdc-theme-secondary);
          font-size: 10px;
          position: relative;
          bottom: 1px;
          margin-left: 4px;
        }

        .rit-ind::before {
          content: 'R';
        }

        .conc-ind::before {
          content: 'C';
        }

        .spell-def-wrap {
          font-size: 14px;
          width: calc(100% - 20px);
          margin: 0 auto;
          background: var(--lumo-contrast-10pct);
          border-radius: 4px;
          white-space: pre-line;
        }

        .spell-def-wrap .margin-bottom_med {
          margin-bottom: 0px !important;
        }

        .spell-def-wrap .text {
          margin-top: 16px;
        }

        .spell-def-wrap p {
          margin-bottom: 16px;
        }

        .stats-wrapper {
          margin: 0 14px;
        }

        .spell-button,
        .class-icon {
          background-color: var(--mdc-theme-text-disabled-on-background);
          color: var(--mdc-theme-on-secondary);
          border: none;
          border-radius: 4px;
          outline: none;
          width: 60px;
          display: inline-block;
          justify-content: center;
          white-space: normal;
          font-size: 12px;
          padding: 1px 4px;
        }
        .spell-button.edit-mode {
          cursor: pointer;
        }
        .spell-button.always-prepared {
          background-color: var(--mdc-theme-secondary-lighter);
          cursor: not-allowed;
        }
        .spell-button.spell-prepared {
          background-color: var(--mdc-theme-secondary);
        }
        .spell-button.flash-error {
          background-color: var(--mdc-theme-error);
          transition: background-color 0.2s ease-out;
        }
        .spell-button.transition-bg {
          transition: background-color 0.2s ease-in;
        }
        .class-icon {
          width: auto;
        }
      </style>

      <h2>Spells</h2>
      <div>
        <vaadin-grid id="grid" theme="no-border no-row-borders" expanded-items="[[expandedItems]]" height-by-rows$="[[heightByRows]]">
          <vaadin-grid-column flex-grow="1">
            <template>
                <template is="dom-if" if="[[_equal(item.id, 'class')]]">
                  <div class="class-wrap">
                    <h3>[[item.className]]</h3>
                    <div class='spells-prepared-text'>
                      <span>[[_spellsKnownString(item.spellPrepType)]]</span>
                      <span class='prepared-count'>[[_currentSpellsKnownCount(item.className, spellsKnown)]] / [[_maxSpellsKnownCount(item.className, spellsKnown)]]</span>
                    </div>
                  </div>
                </template>
    
                <template is="dom-if" if="[[_equal(item.id, 'level')]]">
                  <div class="level-outer-wrap">
                    <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}">
                      <h4 class="level-wrap">[[_toLevel(item.level)]]</h4>
                      <div class="cantrips-prepared spells-prepared-text" hidden$="[[!_equal(item.level, 0)]]">
                        <span>Cantrips Known:</span>
                        <span class='prepared-count'>[[_currentCantripsKnownCount(item.parentClass, spellsKnown)]] / [[_maxCantripsKnownCount(item.parentClass, spellsKnown)]]</span>
                      </div>
                    </vaadin-grid-tree-toggle>

                    <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.warlockSpellSlots, isEditMode)]]" on-click="_toggleSpellSlot" warlock-spell>
                      <template is='dom-repeat' items='[[_countToArray(item.warlockSpellSlots)]]' as="thing">
                        <vaadin-checkbox on-click="_preventDefault" checked="[[_isSpellSlotChecked(item.currentWarlockSlots, index)]]"></vaadin-checkbox>
                      </template>
                      <span>Pact</span>
                    </div>

                    <div class="slot-checkboxes" hidden$="[[_hideCheckboxes(item.spellSlots, isEditMode)]]" on-click="_toggleSpellSlot">
                      <template is='dom-repeat' items='[[_countToArray(item.spellSlots)]]' as="thing">
                        <vaadin-checkbox on-click="_preventDefault" checked="[[_isSpellSlotChecked(item.currentSlots, index)]]"></vaadin-checkbox>
                      </template>
                      <span>Slots</span>
                    </div>
                  </div>
                </template>

                <template is="dom-if" if="[[_equal(item.id, 'spell')]]">
                  <div class="spell-outer-wrap">
                    <vaadin-grid-tree-toggle leaf="[[!item.hasChildren]]" expanded="{{expanded}}" class="spell-wrap">
                      <span class="spell-inner-wrap">[[item.name]]<span class="spell-level" hidden>[[_spellLevel(item)]]</span><span class="rit-ind" title="Ritual" hidden$="[[!_isRitualSpell(item)]]"></span><span class="conc-ind" title="Concentration" hidden$="[[!_isConcentrationSpell(item)]]"></span></span>
                    </vaadin-grid-tree-toggle>
                    <button class$="[[_isPreparedClass(spellsKnown, item, isEditMode)]]" hidden$="[[!isEditMode]]" on-click="_toggleSpellPrepared">[[_isPreparedText(spellsKnown, item)]]</button>
                    <span class="class-icon" hidden$="[[isEditMode]]">[[_spellClassText(item.parentClass)]]</span>
                  </div>
                </template>

                <template is="dom-if" if="[[_equal(item.id, 'spelldef')]]">
                  <div class="spell-def-wrap">
                    <div class= "stats-wrapper" inner-h-t-m-l="[[_renderSpell(item)]]"></div>
                  </div>
                </template>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }
}

customElements.define("dnd-character-builder-spells",DndCharacterBuilderSpells);