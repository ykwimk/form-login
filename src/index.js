import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import UserStore from './stores/user';

const user = new UserStore();

ReactDOM.render(
  <Provider user={user}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
