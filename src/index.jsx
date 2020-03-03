import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/app.jsx';

/**
 * This must come after the App as we need it to initialize
 *  last when put through webpack.
 *
 * Due to the custome state/interface, we made this a requirement
 *  but simplified the redux interface a little bit.
 */
import { Provider } from 'react-redux';
import store from './state/store.js';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
