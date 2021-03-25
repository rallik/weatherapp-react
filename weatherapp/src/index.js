import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherAppProvider } from './context';


ReactDOM.render(
  <React.StrictMode>
    <WeatherAppProvider>
      <App />
    </WeatherAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


