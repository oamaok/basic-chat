import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from '../utilities';

import Authentication from './Authentication';
import App from './App';

function Main({ authentication }) {
  return (
    <div>
      {authentication.isAuthenticated ? <App /> : <Authentication />}
    </div>
  );
}

export default connect(stateToProps('authentication'))(Main);
