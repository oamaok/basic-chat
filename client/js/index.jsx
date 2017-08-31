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
import modals from 'reducers/modals';

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
      modals,
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

  if (__dev) {
    /* eslint-disable global-require */
    // Require the app container here, so the dead code elimination
    // can trim it off when building for production
    const { AppContainer } = require('react-hot-loader');

    const render = () => {
      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <Root />
          </Provider>
        </AppContainer>,
        document.getElementById('root')
      );
    };

    render();

    if (module.hot) {
      module.hot.accept('./containers/Root', render);
    }
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <Root history={history} />
      </Provider>,
      document.getElementById('root')
    );
  }
})();
