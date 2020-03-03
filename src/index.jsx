import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './state/store.js';

import { App } from './app.jsx';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
