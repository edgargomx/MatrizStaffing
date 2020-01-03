import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@polymer/paper-input/paper-input'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-input/paper-input-container.js';

/**
 * `<hours-form>` is the component that contains
 * the format of the hours of the worked year
 * this component display an input with the year
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

  clearMonths(){
    const integerField = this.shadowRoot.querySelectorAll('.month');
    for(const month of integerField){
      month.value = '';
    }
  }

  clearYear(){
    this.shadowRoot.querySelector('#year').value = '';
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
      this.shadowRoot.querySelector('paper-button').disabled=false;
      if(parseInt(year) === new Date().getFullYear()){
        this.validateMonths(textFields);
      };
    }else{
      this.shadowRoot.querySelector('paper-button').disabled=true;
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
      this.shadowRoot.querySelector('paper-button').disabled=false;
      const textFields= this.shadowRoot.querySelectorAll('.month');
      for(const itr of textFields){
        itr.disabled=false;
      };
    }
    this.clearMonths();
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
    this.clearMonths();
    this.clearYear();
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
    this.clearMonths();
    this.clearYear();
  }

  render() {
    return html`
      <paper-dialog id="modal" modal>
        <paper-dialog-scrollable>
        <div id="container" class="col ">
          <h2 class="center-item">${this.title}</h2>
          <div class="row content-center padding-md">
            <div class="col">
              <div class="row">
                <label>Año: </label>
                <paper-input label="AÑO" 
                required auto-validate error-message="introduzca año" 
                auto-validate allowed-pattern="[0-9]"
                 maxlength="4"
                @change="${this.changeYear}"
                id="year"></paper-input>
              </div>
              <div class="row margin-top-sm">
                <label>Enero:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="january"
                class="month"
                ></paper-input>
              </div>
              <div class="row ">
                <label>Febrero:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="february"
                class="month"
                ></paper-input>
              </div>
              <div class="row ">
                <label>Marzo:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="march"
                class="month"
                ></paper-input>
              </div>
              <div class="row ">
                <label>Abril:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="april"
                class="month"
                ></paper-input>              </div>
              <div class="row ">
                <label>Mayo:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="may"
                class="month"
                ></paper-input>              </div>
              <div class="row">
                <label>Junio:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="june"
                class="month"
                ></paper-input>              </div>
            </div>
            <div class="col">
              <div class="row margin-top-lg">
                <label>Julio:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="july"
                class="month"
                ></paper-input>               </div>
              <div class="row ">
                <label>Agosto:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="august"
                class="month"
                ></paper-input>              </div>
              <div class="row ">
                <label>Sep:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="september"
                class="month"
                ></paper-input>              </div>
              <div class="row ">
                <label>Oct:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="october"
                class="month"
                ></paper-input>              </div>
              <div class="row ">
                <label>Nov:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="november"
                class="month"
                ></paper-input>              </div>
              <div class="row ">
                <label>Dic:</label>
                <paper-input label="HRS"
                required auto-validate error-message="introduzca horas"
                auto-validate allowed-pattern="[0-9]"
                 maxlength="3"
                id="december"
                class="month"
                ></paper-input>              </div>
            </div>
          </div>
          <div class="row content-center margin-top-md">
        <paper-button @click="${this.send}" >Guardar</paper-button>
        <paper-button @click="${this.hide}">Cancelar</paper-button>
          </div>          
        </div>
        </paper-dialog-scrollable>
      </paper-dialog>
    `;
    }
}


window.customElements.define("hours-form", HoursForm);
