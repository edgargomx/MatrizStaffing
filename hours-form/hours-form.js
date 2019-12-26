import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'
import '@vaadin/vaadin-button/vaadin-button'

class HoursForm extends LitElement {
  static get properties() {
    return {
      years:Array,
      yearSelected:Number
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.years = [];
    this.yearSelected=null
  }
  firstUpdated(){
    this.fillYears();
  }

  fillYears(){
   let countYear=2005;
   this.years= Array.from({
      length:(new Date().getFullYear()-countYear)+1
    },
    ()=>countYear++
    ); 
    customElements.whenDefined('vaadin-combo-box').then(()=>{
      const comboBox= this.shadowRoot.querySelector('vaadin-combo-box');
      comboBox.items = this.years;
      comboBox.selectedItem = this.years[this.years.length-1];
      this.yearSelected = this.years[this.years.length-1];
     });

  }

  changeYear(event){
    this.yearSelected=event.target.value;
      this.dispatchEvent(new CustomEvent('change',{
        detail:{
          year:event.target.value
        }
      }))
    
  }
  
  send(){
    const[janInput,febInput,marInput,aprInput,mayInput,
      junInput,julInput,augInput,sepInput,octInput,
      novInput,decInput] = this.shadowRoot.querySelectorAll('vaadin-integer-field');
    const properties ={
      year:this.yearSelected,
      january:janInput.value,
      february:febInput.value,
      march:marInput.value,
      april:aprInput.value,
      may:mayInput.value,
      june:junInput.value,
      july:julInput.value,
      august:augInput.value,
      september:sepInput.value,
      october:octInput.value,
      november:novInput.value,
      december:decInput.value
    }


    this.dispatchEvent(new CustomEvent('sendhrs',{
      detail: properties
    }))
  }

  render() {
    return html`
    <div class="col-center">
      <h2>Agregar horas</h2>
      <div class="col-left">
        <div class="item">
        <span for="year">Año</span>
        <vaadin-combo-box @change="${this.changeYear}"></vaadin-combo-box>
        </div>
        <div class="item">
          <span>Enero</span>
          <vaadin-integer-field id="january" min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <span>Febrero</span>
          <vaadin-integer-field id="february" min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <span>Marzo</span>
          <vaadin-integer-field id="march" min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <span>Abril</span>
          <vaadin-integer-field id="april" min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <span>Mayo</span>
          <vaadin-integer-field id="may" min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <span>Junio</span>
          <vaadin-integer-field id="june" min="0" ></vaadin-integer-field>
        </div>
      </div>
      <div class="col-right">
        <div class="item">
          <span>Julio</span>
          <vaadin-integer-field id="july" min="0"></vaadin-integer-field>
        </div>
        <div class="item">
          <span>Agoto</span>
          <vaadin-integer-field id="august" min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <span>Sep.</span>
          <vaadin-integer-field id="september" min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <span>Oct.</span>
          <vaadin-integer-field id="october" min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <span>Nov.</span>
          <vaadin-integer-field id="november" min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <span>Dic.</span>
          <vaadin-integer-field id="december" min="0"></vaadin-integer-field>
        </div>
      </div>
      <vaadin-button @click="${this.send}">Guardar</vaadin-button>
      
    </div>
      `;
    }
}

window.customElements.define("hours-form", HoursForm);
