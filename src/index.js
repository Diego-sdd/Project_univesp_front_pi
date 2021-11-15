import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '50px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById('root')
);

