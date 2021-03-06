import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
// import 'date-input-polyfill';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
unregister(); // service worker 해제
