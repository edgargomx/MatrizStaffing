import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';

class HoursForm extends LitElement {
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
        <h2>${this.hello} hours-form</h2>
      `;
    }
}

window.customElements.define("hours-form", HoursForm);
