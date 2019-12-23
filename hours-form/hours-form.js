import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'
import '@vaadin/vaadin-button/vaadin-button'

class HoursForm extends LitElement {
  static get properties() {
    return {
      years:Array
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.years = [];
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
     });

  }

  render() {
    return html`
    <div class="col-center">
      <h2>Agregar horas</h2>
      <div class="col-left">
        <div class="item">
        <p>Año</p>
        <vaadin-combo-box></vaadin-combo-box>
        </div>
        <div class="item">
          <p>Enero</p>
          <vaadin-integer-field min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <p>Febrero</p>
          <vaadin-integer-field min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <p>Marzo</p>
          <vaadin-integer-field min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <p>Abril</p>
          <vaadin-integer-field min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <p>Mayo</p>
          <vaadin-integer-field min="0" ></vaadin-integer-field>
        </div>
        <div class="item">
          <p>Junio</p>
          <vaadin-integer-field min="0" ></vaadin-integer-field>
        </div>
      </div>
      <div class="col-right">
        <div class="item">
          <p>Julio</p>
          <vaadin-integer-field min="0"></vaadin-integer-field>
        </div>
        <div class="item">
          <p>Agoto</p>
          <vaadin-integer-field min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <p>Sep.</p>
          <vaadin-integer-field min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <p>Oct.</p>
          <vaadin-integer-field min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <p>Nov.</p>
          <vaadin-integer-field min="0"></vaadin-integer-field>
        </div>
        <div class="item">
        <p>Dic.</p>
          <vaadin-integer-field min="0"></vaadin-integer-field>
        </div>
      </div>
      <vaadin-button>Guardar</vaadin-button>
      
    </div>
      `;
    }
}

window.customElements.define("hours-form", HoursForm);
