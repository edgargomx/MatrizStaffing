import { html, LitElement } from 'lit-element';
import style from './hours-table-styles.js';

class HoursTable extends LitElement {
  static get properties() {
    return {
      hello: { type: String }
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.hello = 'Hello';
  }

  render() {
    return html`
        <p>Some static DOM</p>
        <h2>${this.hello} hours-table</h2>
      `;
    }
}

window.customElements.define("hours-table", HoursTable);
