import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@polymer/paper-button/paper-button'
import '@polymer/paper-dialog/paper-dialog';

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

  __isInteger(event){
    if(/^(-\d)?\d*$/.test(event.target.value)){
    }else {
      event.target.value = '';
    }
  }

  render() {
    return html`

      <paper-dialog id="modal" modal>
        <paper-dialog-scrollable>
        <div id="container" class="col ">
          <h2 class="center-item">${this.title}</h2>
          <div class="row content-center margin-bottom-sm ">
            <div class="col">
              <div class="row">
                <label>Año: </label>
                <iron-input>
                  <input placeholder="AÑO"
                  id="year"
                  maxlength="4"
                  minlength="4"
                  @input="${ this.__isInteger }"
                  @change="${this.changeYear}"
                  >
                </iron-input>
                
              </div>
              <div class="row margin-top-sm">
                <label>Enero:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="january"
                  required>
                </iron-input>
              </div>
              <div class="row ">
                <label>Febrero:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="february"
                  required>
                </iron-input>
              </div>
              <div class="row ">
                <label>Marzo:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="march"
                  required>
                </iron-input>
              </div>
              <div class="row ">
                <label>Abril:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="april"
                  required>
                </iron-input>             </div>
              <div class="row ">
                <label>Mayo:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="may"
                  required>
                </iron-input>
                    </div>
              <div class="row">
                <label>Junio:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="june"
                  required>
                </iron-input>
                           </div>
            </div>
            <div class="col">
              <div class="row margin-top-lg">
                <label>Julio:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="july"
                  required>
                </iron-input>              </div>
              <div class="row ">
                <label>Agosto:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="august"
                  required>
                </iron-input>              </div>
              <div class="row ">
                <label>Sep:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="september"
                  required>
                </iron-input>             </div>
              <div class="row ">
                <label>Oct:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="october"
                  required>
                </iron-input>            </div>
              <div class="row ">
                <label>Nov:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="november"
                  required>
                </iron-input>              </div>
              <div class="row ">
                <label>Dic:</label>
                <iron-input>
                  <input
                  placeholder="HRS"
                  minlength="1"
                  maxlength="3"
                  @input="${this.__isInteger}"
                  class="month"
                  id="december"
                  required>
                </iron-input>              </div>
            </div>
          </div>
          <div class="row content-center btn-fixed">
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
