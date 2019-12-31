import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-button/vaadin-button';
import '@polymer/paper-dialog/paper-dialog';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles'; 

/**
 * `<hours-form>` is the component that contains
 * the format of the hours of the worked year
 * this component display a combo box with the year
 * and the months with their hours 
 */

class HoursForm extends LitElement {
  static get properties() {
    return {
      years:{type: Array},
      yearSelected:{type: Number},
      title:{type: String},
      eventName:{type: String}
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.years = [];
    this.yearSelected=null;
    this.title = '';
    this.eventName = '';
    this.monthsName = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"];
  }

  firstUpdated() {
    const fields = this.shadowRoot.querySelectorAll('.month');

    for(const field of fields){
      customElements.whenDefined(field.localName).then(()=> {
        field.addEventListener('input', ()=> {
          field.value > 999 ? field.value = 999: field.value
          field.value < 0 ? field.value = 0: field.value
        });
      })
    }
  }

  fillYears(years){
    this.years = years;
  }

  edit(){
    this.title = 'Editar los años';
    this.eventName = 'edited';
    this.display();
    this.shadowRoot.querySelector('#year').disabled = true;
    this.validateForEdit(this.yearSelected);
  }

  clear(){
    const integerField = this.shadowRoot.querySelectorAll('.month');
    for(const month of integerField){
      month.value = '';
    }
  }

  create(){
    this.title = 'Crear nuevo año';
    this.eventName = 'created';
    this.display();
    this.shadowRoot.querySelector('#year').disabled = false;
    this.validateForCreate(this.yearSelected);
  }

  validateForCreate(year){
    if(this.years.indexOf(year) === -1){
      this.validateForEdit(year);
    } else {
      console.error('Year previously defined')
    }
  }

  validateMonths(textFields){
    const date = new Date();
    const currentMonth = this.monthsName[date.getMonth()];
    for(let i = 0; i < 12; i++){
      if(textFields[i].id !== currentMonth ){
        textFields[i].disabled = true;
      } else {
        textFields[i].disabled = true;
        i = 12;
      }
    }
  }
  validateForEdit(year){
    const textFields= this.shadowRoot.querySelectorAll('.month');
    if(year>=new Date().getFullYear()){
      for(const itr of textFields){
        itr.disabled=false;
      };
      this.shadowRoot.querySelector('vaadin-button').disabled=false;
      if(parseInt(year) === new Date().getFullYear()){
        this.validateMonths(textFields);
      };
    }else{
      this.shadowRoot.querySelector('vaadin-button').disabled=true;
      for(const itr of textFields){
        itr.disabled=true;
      }
    }
  }

  changeYear(event){
    this.yearSelected=event.target.value;
    if(this.years.indexOf(this.yearSelected) !== -1){
      this.validateForEdit(this.yearSelected);
    } else {
      this.shadowRoot.querySelector('vaadin-button').disabled=false;
      const textFields= this.shadowRoot.querySelectorAll('.month');
      for(const itr of textFields){
        itr.disabled=false;
      };
    }
    this.clear();
      this.dispatchEvent(new CustomEvent('years-changed',{
        detail:{
          year:event.target.value 
        }
      }))
    
  }
  set(year, hours){
    const integerField = this.shadowRoot.querySelectorAll('.month');
    this.yearSelected = year;
    
    if(hours){
      for(const month of integerField){
        month.value = hours[month.id];
      }
      this.validateForEdit(year);
      const vaadinYear = this.shadowRoot.querySelector('#year');
      vaadinYear.value = year;
    }
  }
  
  send(){
    const [
        janInput,
        febInput,
        marInput,
        aprInput,
        mayInput,
        junInput,
        julInput,
        augInput,
        sepInput,
        octInput,
        novInput,
        decInput ] = this.shadowRoot.querySelectorAll('.month');

    const properties = {
      year     :this.yearSelected,
      january  :janInput.value,
      february :febInput.value,
      march    :marInput.value,
      april    :aprInput.value,
      may      :mayInput.value,
      june     :junInput.value,
      july     :julInput.value,
      august   :augInput.value,
      september :sepInput.value,
      october  :octInput.value,
      november :novInput.value,
      december :decInput.value
    }
    this.clear();
    this.hide();
    this.dispatchEvent(new CustomEvent(this.eventName,{
      detail: properties
    }))
  }

  display(){
    this.shadowRoot.querySelector('#modal').open();
  }

  hide(){
    this.shadowRoot.querySelector('#modal').close();
    this.clear();
  }

  render() {
    return html`
      <paper-dialog id="modal" modal>
        <div id="container" class="col ">
          <h2 class="center-item">${this.title}</h2>
          <div class="row content-center margin-bottom-sm">
            <div class="col">
              <div class="row">
                <label>Año: </label>
                <vaadin-integer-field @change="${this.changeYear}" theme="custom-border" id="year" min="2000"></vaadin-integer-field>
              </div>
              <div class="row margin-top-sm">
                <label>Enero:</label>
                <vaadin-integer-field id="january" min="0" class="month" ></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Febrero:</label>
                <vaadin-integer-field id="february" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Marzo:</label>
                <vaadin-integer-field id="march" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Abril:</label>
                <vaadin-integer-field id="april" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Mayo:</label>
                <vaadin-integer-field id="may" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row">
                <label>Junio:</label>
                <vaadin-integer-field id="june" min="0" class="month"></vaadin-integer-field>
              </div>
            </div>
            <div class="col">
              <div class="row margin-top-lg">
                <label>Julio:</label>
                <vaadin-integer-field id="july" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Agosto:</label>
                <vaadin-integer-field id="august" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Sep:</label>
                <vaadin-integer-field id="september" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Oct:</label>
                <vaadin-integer-field id="october" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Nov:</label>
                <vaadin-integer-field id="november" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Dic:</label>
                <vaadin-integer-field id="december" min="0" class="month"></vaadin-integer-field>
              </div>
            </div>
          </div>
          <div class="row content-center btn-fixed">
            <vaadin-button @click="${this.send}" theme="primary">Guardar</vaadin-button>
            <vaadin-button @click="${this.hide}" theme="primary">Cancelar</vaadin-button>
          </div>          
        </div>
      </paper-dialog>
    `;
    }
}

registerStyles('vaadin-text-field', css`
  :host([theme~="custom-border"]) [part="input-field"] {
        width: 130px;
      }
`);

registerStyles('vaadin-button', css`
  :host([theme~="primary"]) {
        background: var(--background-gradient);
        border-radius: 30px;
        font-size: var(--font-size-button);
      }
      .vaadin-button-container {
        margin-inline-end: 35px;
      }
`);


window.customElements.define("hours-form", HoursForm);
