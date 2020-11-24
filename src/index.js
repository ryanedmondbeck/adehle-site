import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fonts/UxumGrotesque-Regular.otf';
import './fonts/UxumGrotesque-UltraLight.otf';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);


