import { html, LitElement } from 'lit-element';
import style from './hours-table-styles.js';
import '@fluidnext-polymer/paper-grid/paper-grid.js';
import '@polymer/paper-button/paper-button.js';
// import '@ironbit/hours-form/hours-form.js';
// import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles';

class HoursTable extends LitElement {
  static get properties() {
    return {
      url: {type: String},
      years : {type: Array},
      newYear: {type: Object},
      rawData: {type: Array},
      hours: {type: Object}
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.url = ''
    this.years = [];
    this.hours = {};
    this.rawData = {};
    this.newYear = '';
  }

  setRawData(rawData){
    this.rawData = rawData;
    this.years = [];
    this.hours = {};
    for(const year in rawData){
      this.years = [...this.years, {year: year}];
    }
  }

  throwCells(){
    let elements = [];
    if(this.years.length > 0 ){
      let i = 0;
      for(const data in this.rawData){
        elements = [...elements, this.__buildYearCell(i, data), this.__buildIcon(data, i)]
        i++
      }
      return elements
    } else {
      return '<p>Not data jet</p>'
    }

  }
  __getHours(year){
    this.hours = this.rawData[year];
  }

  __buildYearCell(row, text){
    const yearCell = document.createElement('p');
    const colAtt = document.createAttribute('col');
    const rowAtt = document.createAttribute('row');
    colAtt.value = 0;
    rowAtt.value = row;
    yearCell.setAttributeNode(colAtt);
    yearCell.setAttributeNode(rowAtt)
    yearCell.appendChild(document.createTextNode(text));
    return yearCell;
  }

  __buildIcon(data, row){
    const icon = document.createElement('img');
    const colAtt = document.createAttribute('col');
    const rowAtt = document.createAttribute('row');
    colAtt.value = 1;
    rowAtt.value = row;
    icon.src = this.url;
    icon.alt = this.url;
    icon.id = data;
    icon.setAttributeNode(colAtt);
    icon.setAttributeNode(rowAtt);
    icon.addEventListener('click', event => {
      const form = this.shadowRoot.querySelector('hours-form');
      form.display();
      form.edit();
      this.__getHours(event.currentTarget.id);
      form.set(event.currentTarget.id, this.hours);
    })

    return icon
  }

  __renderAll(){
      const grid = this.shadowRoot.querySelector('#grid');
      customElements.whenDefined(grid.localName).then(() => {
        for(const cell of this.throwCells()){
          grid.appendChild(cell);
        }
      })
  }

  __addEventListenerToAllIcons(){
    const icons = document.querySelector('#icon');
    for(const icon of icons){
      icon.addEventListener('click', event => {
        const form = this.shadowRoot.querySelector('hours-form');
        form.display();
        form.edit();
        this.__getHours(event.currentTarget.id);
        form.set(event.currentTarget.id, this.hours);
      })
    }
  }

  addNewYear(newYear){
    this.years = [...this.years, {year: newYear}];
    this.__renderAll();
  }

  // updated() {
  //   this.__renderAll();
  // }

  firstUpdated(){
    this.__renderAll();
    const registerButton = this.shadowRoot.querySelector('paper-button');
    registerButton.addEventListener('click', () => {
      this.shadowRoot.querySelector('hours-form').display();
      this.shadowRoot.querySelector('hours-form').create();
    })
  }

  getYearCollection(){
    return this.years;
  }

  render() {
    return html`
        <div class="col content-center">
          <paper-grid id="grid">
            
          </paper-grid>
          <paper-button >Registrar</paper-button>
        </div>
        <hours-form></hours-form>
      `;
    }
}


window.customElements.define("hours-table", HoursTable);
