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
      rawData: {type: Object},
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
    customElements.whenDefined('paper-grid').then(()=> {
    this.__renderAll();
    })
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
      const emptyMessage = document.createElement('h3');
      emptyMessage.appendChild(document.createTextNode('No hay datos aún'))
      return [emptyMessage];
    }

  }
  __getHours(year){
    this.hours = this.rawData[year];
  }

  __buildYearCell(row, text){
    const cell = document.createElement('div');
    const yearCell = document.createElement('h3');
    const colAtt = document.createAttribute('col');
    const rowAtt = document.createAttribute('row');
    colAtt.value = 0;
    rowAtt.value = row;
    yearCell.appendChild(document.createTextNode(text));
    cell.setAttributeNode(colAtt);
    cell.setAttributeNode(rowAtt)
    cell.appendChild( yearCell );

    return cell;
  }

  __buildIcon(data, row){
    const cell = document.createElement('div');
    const icon = document.createElement('img');
    const colAtt = document.createAttribute('col');
    const rowAtt = document.createAttribute('row');
    colAtt.value = 1;
    rowAtt.value = row;
    icon.src = this.url;
    icon.alt = this.url;
    icon.id = data;
    icon.addEventListener('click', event => {
      const form = this.shadowRoot.querySelector('hours-form');
      form.display();
      form.edit();
      this.__getHours(event.currentTarget.id);
      form.set(event.currentTarget.id, this.hours);
    })
    cell.setAttributeNode(colAtt);
    cell.setAttributeNode(rowAtt)
    cell.appendChild( icon );

    return cell
  }

  __renderAll(){
    console.log('is rendering')
      /*const grid = this.shadowRoot.querySelector('#grid');
      grid.innerHTML='';
      customElements.whenDefined(grid.localName).then(() => {
        for(const cell of this.throwCells()){
          grid.appendChild(cell);
        };
      });*/
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
    const registerButton = this.shadowRoot.querySelector('paper-button');
    registerButton.addEventListener('click', () => {
      this.shadowRoot.querySelector('hours-form').display();
      this.shadowRoot.querySelector('hours-form').create();
    });
    const form = this.shadowRoot.querySelector('hours-form');
    customElements.whenDefined(form.localName).then(() => {
        form.addEventListener('years-changed', event => {
          this.__getHours(event.detail.year);
          form.set(event.detail.year,  this.hours);
        })
        form.addEventListener('edited', event => {
          this.dispatchEvent(new CustomEvent('edited', {detail: event.detail}))
        })
        form.addEventListener('created', event => {
          this.dispatchEvent(new CustomEvent('created', {detail: event.detail}))
        })
    })
  }

  getYearCollection(){
    return this.years;
  }

  render() {
    return html`
        <div class="col content-center">
          <table>
            <thead>
              <th>Año</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              ${ this.years.map( (year, index) => { 
                return html`<tr>
                              <td>${ year.year }</td>
                              <td>
                                <img src="${ this.url }" alt="acciones${year.year}" id="${year.year}">
                              </td>
                            </tr>`;
              }) }
            </tbody>
          </table>
          <paper-button class="margin-top-md" >Registrar</paper-button>
        </div>
        <hours-form></hours-form>
      `;
    }
}


window.customElements.define("hours-table", HoursTable);
