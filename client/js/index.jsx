import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { apiCall } from 'utilities';
import { loginRequestSuccess, logout } from 'actions/authentication';

import authentication from 'reducers/authentication';
import rooms from 'reducers/rooms';
import users from 'reducers/users';
import messages from 'reducers/messages';
import modal from 'reducers/modal';

import Root from 'containers/Root';

// Redux middleware for enabling multiple actions in a single dispatch call
const multiActions = store => next => action =>
  (Array.isArray(action) ? action.map(store.dispatch) : next(action));

(async () => {
  const store = createStore(
    combineReducers({
      authentication,
      rooms,
      users,
      messages,
      modal,
    }),
    applyMiddleware(
      ReduxThunk,
      multiActions
    )
  );

  const token = localStorage.getItem('token');

  if (token) {
    const response = await apiCall('me', {}, token).then(res => res.json());
    if (response.token) {
      store.dispatch(loginRequestSuccess(response));
    } else {
      store.dispatch(logout());
    }
  }

  // Refresh the token
  setInterval(async () => {
    const { token } = store.getState().authentication;

    if (token) {
      const response = await apiCall('me', {}, token).then(res => res.json());
      if (response.token) {
        store.dispatch(loginRequestSuccess(response));
      } else {
        store.dispatch(logout());
      }
    }
  }, 1000 * 60 * 5);

  ReactDOM.render(
    <Provider store={store}>
      <Root history={history} />
    </Provider>,
    document.getElementById('root')
  );
})();
