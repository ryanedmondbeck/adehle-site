import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PageProvider } from './contexts/PageContext';
import './fonts/UxumGrotesque-Regular.otf';
import './fonts/UxumGrotesque-UltraLight.otf';

ReactDOM.render(
    <PageProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </PageProvider>,
  document.getElementById('root')
);


