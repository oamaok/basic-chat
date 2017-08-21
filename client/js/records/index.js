import { Record } from 'immutable';

export const UserRecord = Record({
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  createdAt: '',
});

export const AuthState = Record({
  token: '',
  currentUser: new UserRecord(),
  isAuthenticated: false,
  isAuthenticating: false,

  loginError: 0,
  registrationError: 0,
});
