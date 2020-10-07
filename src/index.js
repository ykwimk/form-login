import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import SignupStore from './stores/signup';

const signup = new SignupStore()

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
