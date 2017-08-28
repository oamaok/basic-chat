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

  currentRoom: '',
});

export const UsersState = Record({
  // ID-keyed map of the users on the server
  allUsers: Map(),

  // Set of the IDs of the users who are currently connected to the server
  connectedUsers: Set(),
});
