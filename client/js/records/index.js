import { Record, Map, Set } from 'immutable';

export const UserRecord = Record({
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  createdAt: '',
});

export const RoomRecord = Record({
  id: '',
  name: '',
  type: '',
});

export const AuthState = Record({
  token: '',
  currentUser: new UserRecord(),
  isAuthenticated: false,
  isAuthenticating: false,

  loginStatus: 0,
  registrationStatus: 0,
});

export const RoomsState = Record({
  // Map of all available public rooms, using the room id as the key
  availableRooms: Map(),

  // Set of the room IDs the user 
  activeRooms: Set(),
});
