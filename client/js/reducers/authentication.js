import { createReducer } from 'utilities';
import { UserRecord, AuthState } from 'records';

export default createReducer(new AuthState(), {
  LOGIN_REQUEST: state => state
    .set('isAuthenticating', true)
    .set('loginStatus', 0),

  LOGIN_REQUEST_FAILURE: (state, status) => state
    .set('isAuthenticating', false)
    .set('loginStatus', status),

  LOGIN_REQUEST_SUCCESS: (state, { token, user }) => {
    localStorage.setItem('token', token);
    return state
      .set('isAuthenticating', false)
      .set('isAuthenticated', true)
      .set('currentUser', new UserRecord(user))
      .set('token', token);
  },

  REGISTRATION_REQUEST: state => state
    .set('isAuthenticating', true)
    .set('registrationStatus', 0),

  REGISTRATION_REQUEST_FAILURE: (state, status) => state
    .set('isAuthenticating', false)
    .set('registrationStatus', status),

  REGISTRATION_REQUEST_SUCCESS: (state, { token, user }) => {
    localStorage.setItem('token', token);
    return state
      .set('isAuthenticating', false)
      .set('isAuthenticated', true)
      .set('currentUser', new UserRecord(user))
      .set('token', token);
  },

  RESET_APP_STATE: () => {
    localStorage.removeItem('token');
    return new AuthState();
  },
});
