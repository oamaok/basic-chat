import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router';
import {
  ConnectedRouter,
} from 'react-router-redux';

import { stateToProps } from 'utilities';
import Authentication from 'containers/Authentication';
import App from 'containers/App';

function Root({ history, authentication }) {
  const AuthorizedRoute = (...args) => (
    <Route
      {...args}
      render={renderProps => (
        authentication.isAuthenticated ? <App /> : (
          <Redirect
            to={{
              pathname: '/authentication',
              state: { from: renderProps.location },
            }}
          />
        )
      )}
    />
  );

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/authentication" component={Authentication} />
        <AuthorizedRoute path="/" />
      </Switch>
    </ConnectedRouter>
  );
}

export default connect(stateToProps('authentication'))(Root);
