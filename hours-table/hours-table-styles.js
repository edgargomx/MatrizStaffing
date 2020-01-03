import { css } from 'lit-element';

export default css`
:host {
  display: inline-block;
  box-sizing: border-box;
  width: 100vw;
  --primary-color: #00ACEA;
  --second-color: #00EFD1;
  --background-gradient: linear-gradient(0deg, #00ACEA 0%, #00EFD1 100%);
  --font-family: Grotesk;
  --font-size: 12px; }

:host([hidden]), [hidden] {
  display: none !important; }

*, *:before, *:after {
  box-sizing: inherit;
  font-family: --font-family; }

.col {
  display: flex;
  flex-direction: column; }

.row {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: flex-start; }

.content-center {
  justify-content: space-around;
  align-items: center; }

.margin-top-md {
  margin-top: 45px; }

table {
  /*font-family: var(--font-family);*/
  border-collapse: collapse;
  width: 100%; }

thead {
  background: var(--background-gradient);
  color: white; }

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px; }

tr:nth-child(even) {
  background-color: #dddddd; }

paper-button {
  background: var(--background-gradient);
  color: white;
  border-radius: 30px;
  font-size: var(--font-size-button);
  padding: 10px; }
`;
