import { html, LitElement } from 'lit-element';
import style from './hours-table-styles.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@ironbit/hours-form/hours-form.js';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles';

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
    this.url = '/Assets/Acciones.png'
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

  __getHours(year){
    this.hours = this.rawData[year]
  }
  __renderAll(){
      customElements.whenDefined('vaadin-grid').then( () => {
      const grid = this.shadowRoot.querySelector('vaadin-grid');
  
      const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');

      columns[1].renderer = (root, column, rowData) => {
        const icon = this.__buildIcon(rowData.item.year);
        if (!root.firstElementChild) {
          root.appendChild(icon);
        }
      };

      grid.items = this.years;
    }).then( () => {
      const vaadinButton = this.shadowRoot.querySelector('vaadin-button')
      vaadinButton.addEventListener('click', () => {
        this.shadowRoot.querySelector('hours-form').display();
        this.shadowRoot.querySelector('hours-form').create();
      })
    })
  }

  __buildIcon(id){
    const icon = document.createElement('img');
    icon.src = this.url;
    icon.alt = this.url;
    icon.id = id
    icon.addEventListener('click', event => {
      const form = this.shadowRoot.querySelector('hours-form');
      form.display();
      form.edit();
      this.__getHours(event.currentTarget.id);
      form.set(event.currentTarget.id, this.hours);
    })

    return icon
  }

  addNewYear(newYear){
    this.years = [...this.years, {year: newYear}];
    this.__renderAll();
  }

  updated() {
    this.__renderAll();
  }

  firstUpdated(){
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
          <vaadin-grid theme="row-stripes" column-reordering-allowed multi-sort>
              <vaadin-grid-column width="9em" path="year" header="Año"></vaadin-grid-column>
              <vaadin-grid-column width="9em" header="Acciones"></vaadin-grid-column>
          </vaadin-grid>
          <vaadin-button theme="primary" class="margin-top-md">Registro</vaadin-button>
          <hours-form></hours-form>
        </div>
      `;
    }
}

registerStyles('vaadin-grid', css`
  :host([theme~="row-stripes"])
      [part="row"]:last-child [part~="header-cell"] {
        background: var(--background-gradient);
        color: white;
      }
      [part~="cell"] {
        text-align: center;
      }
`);

registerStyles('vaadin-button', css`
  :host([theme~="primary"]) {
        background: var(--background-gradient);
        border-radius: 30px
      }
`);

window.customElements.define("hours-table", HoursTable);
