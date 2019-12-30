import { css } from 'lit-element';

export default css`
:host {
  display: inline-block;
  box-sizing: border-box;
  width: 100vw;
  --primary-color: #00ACEA;
  --second-color: #00EFD1;
  --background-gradient: linear-gradient(0deg, #00ACEA 0%, #00EFD1 100%);
  font-family: Grotesk; }

:host([hidden]), [hidden] {
  display: none !important; }

*, *:before, *:after {
  box-sizing: inherit;
  font-family: inherit; }

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
`;
