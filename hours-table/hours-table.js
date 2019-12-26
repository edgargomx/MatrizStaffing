import { html, LitElement } from 'lit-element';
import style from './hours-table-styles.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-button/vaadin-button.js';

class HoursTable extends LitElement {
  static get properties() {
    return {
      years : {
        type: Object}
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.url = '/Assets/Acciones.png'
    this.years = [];
  }

  renderAll(){
    (async () => {
      await customElements.whenDefined('vaadin-grid').then(() => {
      const grid = this.shadowRoot.querySelector('vaadin-grid');
  
      const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');

      columns[0].renderer = (root, column, rowData) => {
        if (!root.firstElementChild) {
          root.insertAdjacentHTML('afterbegin', `<img alt="action">`)
        }
        root.firstElementChild.id = rowData.item.year;
        root.firstElementChild.src = this.url;
      };

      grid.items = this.years
    })})().then(()=> {
      const buttons = this.shadowRoot.querySelectorAll('img')
      for(const button of buttons){
        button.addEventListener('click', event => {
          this.dispatchEvent(new CustomEvent('year-selected',
          {detail: {year: event.currentTarget.id}})) 
        })
      }
    })
  }
  updated() {
    this.renderAll();
}

  render() {
    return html`
        <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort>
            <vaadin-grid-sort-column width="9em" path="year" header="Año"></vaadin-grid-sort-column>
            <vaadin-grid-column width="9em" header="Acciones"></vaadin-grid-sort-column>
        </vaadin-grid>
      `;
    }
}

window.customElements.define("hours-table", HoursTable);
