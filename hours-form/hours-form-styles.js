import { css } from 'lit-element';

export default css`
:host {
  display: inline-block;
  box-sizing: border-box;
  --label-color: #757575;
  --primary-color: #00ACEA;
  --second-color: #00EFD1;
  --background-gradient: linear-gradient(0deg, #00ACEA 0%, #00EFD1 100%);
  font-family: Grotesk; }

:host([hidden]), [hidden] {
  display: none !important; }

*, *:before, *:after {
  box-sizing: inherit;
  font-family: var(--font-family); }

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

.content-evenly {
  justify-content: space-evenly; }

.content-left {
  justify-content: space-between;
  align-items: flex-start; }

.center-item {
  align-self: center; }

.right-item {
  align-self: flex-end; }

.d-none {
  display: none; }

label {
  margin-top: 12px;
  font-family: var(--font-family);
  width: 65px;
  margin-right: 3px;
  color: var(--label-color); }

.margin-top-sm {
  margin-top: 15px; }

.margin-top-md {
  margin-top: 45px; }

.margin-bottom-sm {
  margin-bottom: 15px; }

.margin-top-lg {
  margin-top: 60px; }

.card {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  color: #757575;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }

paper-dialog {
  border-radius: 30px;
  overflow: auto; }

.btn-fixed {
  position: fixed;
  margin-top: 480px;
  align-self: center; }

@media (min-width: 600px) {
  .btn-fixed {
    margin-top: 390px; } }
`;
