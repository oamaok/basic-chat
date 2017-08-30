import { Map, Set } from 'immutable';
import { createReducer } from 'utilities';
import { UsersState, UserRecord } from 'records';

export default createReducer(new UsersState(), {
  SET_USERS: (state, users) => state
    .set('allUsers', Map(users.map(user => [user.id, new UserRecord(user)]))),

  ADD_USER: (state, user) => state
    .update('allUsers', users => users.set(user.id, new UserRecord(user))),

  SET_CONNECTED_USERS: (state, userIds) => state
    .set('connectedUsers', Set(userIds)),

  ADD_CONNECTED_USER: (state, userId) => state
    .update('connectedUsers', users => users.add(userId)),

  REMOVE_CONNECTED_USER: (state, userId) => state
    .update('connectedUsers', users => users.delete(userId)),

  RESET_APP_STATE: () => new UsersState(),
});
