import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { WeatherAppProvider } from './context';


ReactDOM.render(
  <WeatherAppProvider>
    <App />
  </WeatherAppProvider>,
  document.getElementById('root')
);


