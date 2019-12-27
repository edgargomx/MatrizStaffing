import { css } from 'lit-element';

export default css`
@charset "UTF-8";
@font-face {
  font-family: 'Grotesk';
  src: url("Assets/tipografías/Typo Grotesk Primaria.otf"); }

:host {
  display: inline-block;
  box-sizing: border-box;
  width: 100vw;
  --background-gradient: linear-gradient(0deg, #00ACEA 0%, #00EFD1 100%);
  font-family: Grotesk, Verdana; }

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
