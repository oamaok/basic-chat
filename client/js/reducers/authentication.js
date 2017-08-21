import { createReducer } from '../utilities';
import { UserRecord, AuthState } from '../records';

export default createReducer(new AuthState(), {
  LOGIN_REQUEST: state => state
    .set('isAuthenticating', true)
    .set('loginError', 0),

  LOGIN_REQUEST_FAILURE: (state, error) => state
    .set('isAuthenticating', false)
    .set('loginError', error),

  LOGIN_REQUEST_SUCCESS: (state, { token, user }) => state
    .set('isAuthenticating', false)
    .set('isAuthenticated', true)
    .set('currentUser', new UserRecord(user))
    .set('token', token),

  REGISTRATION_REQUEST: state => state
    .set('isAuthenticating', true)
    .set('registrationError', 0),

  REGISTRATION_REQUEST_FAILURE: (state, error) => state
    .set('isAuthenticating', false)
    .set('registrationError', error),

  REGISTRATION_REQUEST_SUCCESS: (state, { token, user }) => state
    .set('isAuthenticating', false)
    .set('isAuthenticated', true)
    .set('currentUser', new UserRecord(user))
    .set('token', token),

  RESET_APP_STATE: () => new AuthState(),
});
