import { html, LitElement } from 'lit-element';
import style from './hours-table-styles.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-button/vaadin-button.js';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles';

class HoursTable extends LitElement {
  static get properties() {
    return {
      url: {type: String},
      years : {type: Array},
      newYear: {type: Object}
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
    this.rawData = [];
    this.newYear = '';
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

      grid.items = this.years
    }).then( () => {
      const vaadinButton = this.shadowRoot.querySelector('vaadin-button')
      vaadinButton.addEventListener('click', () => {
        this.dispatchEvent(new Event('open-form'));
      })
    })
  }

  __buildIcon(id){
    const icon = document.createElement('img');
    icon.src = this.url;
    icon.alt = this.url;
    icon.id = id
    icon.addEventListener('click', event => {
      this.dispatchEvent(new CustomEvent('year-selected',
      {detail: {year: event.currentTarget.id}})) 
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
        border-radius: 30px;
        font-size: var(--font-size-button);
        width: 350px;
      }
`);

window.customElements.define("hours-table", HoursTable);
