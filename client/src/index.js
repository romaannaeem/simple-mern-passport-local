import React from 'react';
import ReactDOM from 'react-dom';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
