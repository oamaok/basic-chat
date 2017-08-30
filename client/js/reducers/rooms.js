import { Map, Set } from 'immutable';
import { createReducer } from 'utilities';
import { RoomsState, RoomRecord } from 'records';

export default createReducer(new RoomsState(), {
  SET_AVAILABLE_ROOMS: (state, rooms) => state
    .set('availableRooms', Map(rooms.map(
      room => [room.id, new RoomRecord(room)]
    ))),

  ADD_AVAILABLE_ROOM: (state, room) => state
    .update('availableRooms', rooms => rooms.set(room.id, new RoomRecord(room))),

  SET_ACTIVE_ROOMS: (state, roomIds) => state
    .set('activeRooms', Set(roomIds)),

  ADD_ACTIVE_ROOM: (state, roomId) => state
    .update('activeRooms', rooms => rooms.add(roomId)),

  REMOVE_ACTIVE_ROOM: (state, roomId) => state
    .update('activeRooms', rooms => rooms.delete(roomId)),

  SET_CURRENT_ROOM: (state, roomId) => state
    .set('currentRoom', roomId),

  CREATE_ROOM_REQUEST: state => state
    .set('isCreatingRoom', true),

  CREATE_ROOM_REQUEST_FAILURE: (state, error) => state
    .set('isCreatingRoom', false)
    .set('roomCreationError', error),

  CREATE_ROOM_REQUEST_SUCCESS: state => state
    .set('isCreatingRoom', false)
    .set('roomCreationError', ''),

  RESET_APP_STATE: () => new RoomsState(),
});
