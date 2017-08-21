import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import authentication from './reducers/authentication';

import Main from './containers/Main';

const store = createStore(
  combineReducers({
    authentication,
    ebin: authentication,
  }),
  applyMiddleware(ReduxThunk)
);

if (__dev) {
  /* eslint-disable global-require */
  // Require the app container here, so the dead code elimination
  // can trim it off when building for production
  const { AppContainer } = require('react-hot-loader');

  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  };

  render();

  if (module.hot) {
    module.hot.accept('./containers/Main', render);
  }
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('root')
  );
}
