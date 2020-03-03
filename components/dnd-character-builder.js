import {PolymerElement, html} from '@polymer/polymer';
import '@vaadin/vaadin-text-field';
import "@vaadin/vaadin-text-field/src/vaadin-integer-field";

class DndCharacterBuilder extends PolymerElement {
  
  static get properties() {
    return {
      characterName: {
        type: String
      },
      str: {
        type: Number,
        value: 10
      },
      dex: {
        type: Number,
        value: 10
      },
      con: {
        type: Number,
        value: 10
      },
      int: {
        type: Number,
        value: 10
      },
      wis: {
        type: Number,
        value: 10
      },
      cha: {
        type: Number,
        value: 10
      }
    };
  }

  static get template() {
    return html`
      <style>
        h1 {
          display: block;
          margin-right: 0 !important;
          font-size: 3.75rem;
          line-height: 3.75rem;
          margin: 48px 0 24px;
          font-family: Roboto, sans-serif;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-size: 3.75rem;
          line-height: 3.75rem;
          font-weight: 300;
          letter-spacing: -0.0083333333em;
          text-decoration: inherit;
          text-transform: inherit;
        }

        .name {
          width: 300px;
        }

        .row {
          display: flex;
          justify-content: space-between;
        }

        .stats {
          display: flex;
        }

        .stats > vaadin-integer-field {
          width: 100px;
          margin-right: 8px;
        }
      </style>
      <h1>Character Builder</h1>
      <div class='row'>
        <vaadin-text-field class="name" label="Character Name" value="{{characterName}}"></vaadin-text-field>

        <div class="stats">
          <vaadin-integer-field value={{str}} min="1" max="20" has-controls label="STR"></vaadin-integer-field>
          <vaadin-integer-field value={{dex}} min="1" max="20" has-controls label="DEX"></vaadin-integer-field>
          <vaadin-integer-field value={{con}} min="1" max="20" has-controls label="CON"></vaadin-integer-field>
          <vaadin-integer-field value={{int}} min="1" max="20" has-controls label="INT"></vaadin-integer-field>
          <vaadin-integer-field value={{wis}} min="1" max="20" has-controls label="WIS"></vaadin-integer-field>
          <vaadin-integer-field value={{cha}} min="1" max="20" has-controls label="CHA"></vaadin-integer-field>
        </div>
      </div>
    `;
  }
}

customElements.define('dnd-character-builder', DndCharacterBuilder);