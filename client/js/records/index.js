import { Record, Map, Set } from 'immutable';
import { MODAL_NONE } from 'utilities/constants';

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
  unreadMessages: 0,
  users: [],
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
  // Map<roomId, Room>
  availableRooms: Map(),

  // Set of the room IDs the user 
  activeRooms: Set(),

  currentRoom: '',
  isCreatingRoom: false,
  roomCreationError: '',
});

export const UsersState = Record({
  // Map<userId, User>
  allUsers: Map(),

  // Set of the IDs of the users who are currently connected to the server
  connectedUsers: Set(),
});

export const MessageRecord = Record({
  id: '',
  createdAt: new Date(0),
  roomId: '',
  userId: '',
  contents: '',
  sent: true,
});

export const MessagesState = Record({
  // Map<messageId, Message>
  allMessages: Map(),

  // Map<roomId, Set<messageId>>
  roomMessages: Map(),
});


export const ModalsState = Record({
  open: false,
  component: MODAL_NONE,
});
