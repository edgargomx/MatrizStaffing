import { html, LitElement, customElement } from 'lit-element';
import style from './ib-login-styles.js';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@polymer/paper-card/paper-card.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';

class IbLogin extends LitElement {
  static get properties() {
    return {
      logo: String,
      userNameHolder: String,
      passwordHolder: String,
      noteUser: String,
      notePassword: String,
      textButton: String,
      server : String,
      user : String,
      password: String
     };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.logo = '';
    this.userNameHolder = '';
    this.passwordHolder = '';
    this.noteUser = '';
    this.notePassword = '';
    this.textButton = '';
    this.server = '';
    this.user = '';
    this.password = '';
  }

  render() {   
    return html`
    <div id ="conteiner">
        <paper-card image="${this.logo}" > </paper-card>
        <div class = "fields">
          <vaadin-text-field placeholder="${this.userNameHolder}" id="userIron" value ="${this.user}"></vaadin-text-field>
            <div id="noteuser">
              <p>${this.noteUser} </p>
            </div>
          <vaadin-password-field placeholder="${this.passwordHolder}"  id="passwordIron" value="${this.password}"></vaadin-password-field>
            <div id="notepassword">
              <p> ${this.notePassword}</p>
            </div> 
          <vaadin-button theme="primary" @click="${this.sendUser}">${this.textButton}</vaadin-button>
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
      fetch (this.server,{
        method : 'POST',
        body: JSON.stringify(dataUser)
      })
      .then(res => res.json())
      .then( data => {
        if(data == true){
          userIronNode.value = '';
          passwordIronNode.value = '';
        }
        this.dispatchEvent( new CustomEvent('send-user-ib',{
          detail: data
        }));
      })
    }
  }

  fieldvalidator(){
    let user = this.shadowRoot.querySelector('#userIron').value.trim();
    let password =  this.shadowRoot.querySelector('#passwordIron').value.trim();
    if( user === '' && password === '' ){
      this.shadowRoot.getElementById('noteuser').style.display = 'block';
      this.shadowRoot.getElementById('notepassword').style.display = 'block';
        return false;
    }else{
      if( user === '' ){
        this.shadowRoot.getElementById('noteuser').style.display = 'block';
        this.shadowRoot.getElementById('notepassword').style.display = 'none';
        return false;
    }else{
      if(password === '' ){
        this.shadowRoot.getElementById('notepassword').style.display = 'block';
        this.shadowRoot.getElementById('noteuser').style.display = 'none';
        return false;
      }else{
        let validaremail = this.shadowRoot.querySelector('#userIron').value.trim();
        this.shadowRoot.getElementById('noteuser').style.display = 'none';
        this.shadowRoot.getElementById('notepassword').style.display = 'none';
        if(validaremail.includes('@')){
          if(this.validaremairegexp()){
            return true;
          }else{
            return false;
          }
        }else{
          return true;
          }
        }
      }
    }
  }

  validaremairegexp(){
    let user = this.shadowRoot.querySelector('#userIron').value.trim();
    let expreg = /\w+@\w+\.+\w/;
    let flag = true;
    if(expreg.test(user)){
      flag = true;
    }else{
      alert('Esta intentando identificarse con un correo no valido'); 
      flag = false;
    }
    return flag;
  }

  _getNode(query) {
    return this.shadowRoot.querySelector(query);
  }   
}

window.customElements.define("ib-login", IbLogin);
