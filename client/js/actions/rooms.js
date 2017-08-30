import {
  EVENT_CHANGE_ROOM,
  EVENT_JOIN_ROOM,
  EVENT_CREATE_ROOM,
} from 'common/constants';

import {
  setCurrentRoom,
  createRoomRequest,
} from 'common/actions/rooms';

import Connection from '../Connection';

export function changeRoom(roomId) {
  const { socket } = Connection.getInstance();
  socket.emit(EVENT_CHANGE_ROOM, roomId);

  return setCurrentRoom(roomId);
}

export function joinRoom(roomId) {
  const { socket } = Connection.getInstance();
  socket.emit(EVENT_JOIN_ROOM, roomId);

  return setCurrentRoom(roomId);
}

export function createRoom(name) {
  const { socket } = Connection.getInstance();
  socket.emit(EVENT_CREATE_ROOM, name);

  return createRoomRequest();
}
