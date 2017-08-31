import React from 'react';
import { connect } from 'react-redux';

import { stateToProps } from 'utilities';
import Authentication from 'containers/Authentication';
import App from 'containers/App';

function Root({ authentication }) {
  return authentication.isAuthenticated ? <App /> : <Authentication />;
}

export default connect(stateToProps('authentication'))(Root);
