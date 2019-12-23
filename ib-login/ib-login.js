import { html, LitElement } from 'lit-element';
import style from './ib-login-styles.js';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@polymer/paper-card/paper-card.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';

class IbLogin extends LitElement {
  static get properties() {
    return {
      Logo: String,
      Username: String,
      Password: String,
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.Logo = '';
    this.Username = '';
    this.Password = '';
  }

  render() {
    return html`
    <div id ="conteiner">
        <paper-card image="${this.Logo}" > </paper-card>
        <div class = "fields">
          <vaadin-text-field placeholder="${this.Username}" id="userIron"></vaadin-text-field>
          <vaadin-password-field placeholder="XXXXX"  id="passwordIron"></vaadin-password-field>
          <vaadin-button theme="primary" @click="${this.sendUser}">Ingresar</vaadin-button>
        </div>
    </div>
      `;
    }

  sendUser (){
    let valide = this.fieldvalidator();
    
    if(valide){
      const userIronNode = this._getNode('#userIron');
      const passwordIronNode =  this._getNode('#passwordIron');
      const dataUser =  {
        user : userIronNode.value,
        password : passwordIronNode.value
      }
      this.dispatchEvent( new CustomEvent('send-user-ib',{
        detail:dataUser
      }));
    }
  }

  fieldvalidator(){
    if(this.shadowRoot.querySelector('#userIron').value === '' && this.shadowRoot.querySelector('#passwordIron').value === '' ){
      alert ('Los campos estan vacios son datos necesarios para ingresar');
        return false;
    }else{
      if(this.shadowRoot.querySelector('#userIron') === '' ){
        alert ('El campo usuario esta vacio, es un campo obligatorio debe ser llenado para ingresar');
        return false;
    }else{
      if(this.shadowRoot.querySelector('#passwordIron') === '' ){
        alert ('El campo password esta vacio, es un campo obligatorio debe ser llenado para ingresar');
        return false;
      }else{
        return true
      }
    }
  }
}

  _getNode(query) {
    return this.shadowRoot.querySelector(query);
  }
    
}

window.customElements.define("ib-login", IbLogin);
