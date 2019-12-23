import { html, LitElement } from 'lit-element';
import style from './ib-login-styles.js';

class IbLogin extends LitElement {
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
        <h2>${this.hello} ib-login</h2>
      `;
    }
}

window.customElements.define("ib-login", IbLogin);
