
import {
  EVENT_NEW_MESSAGE,
} from 'common/constants';
import Connection from '../Connection';

let localMessageId = 0;

export function sendMessage(message) {
  return (dispatch, getState) => {
    const state = getState();
    const roomId = state.rooms.currentRoom;
    const userId = state.authentication.currentUser.id;

    const { socket } = Connection.getInstance();
    const id = `LOCAL${localMessageId++}`;

    socket.emit(EVENT_NEW_MESSAGE, {
      id,
      roomId,
      contents: message,
    });

    dispatch({
      type: 'ADD_MESSAGE',
      data: {
        id,
        createdAt: new Date(),
        roomId,
        userId,
        contents: message,
        sent: false,
      },
    });
  };
}
