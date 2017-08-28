import SocketIO from 'socket.io';
import R from 'ramda';

import {
  EVENT_TYPE_ACTION,
  ROOM_TYPE_PUBLIC,
} from 'common/constants';

import {
  setAvailableRooms,
  setActiveRooms,
  setCurrentRoom,
} from 'common/actions/rooms';

import {
  setUsers,
  setConnectedUsers,
  removeConnectedUser,
  addConnectedUser,
} from 'common/actions/users';

import { idFromJWT } from './utilities';

export default function connections(server, app) {
  const { User, Room } = app.models;

  const io = SocketIO(server, {
    path: '/api/ws',
    pingInterval: 2000,
    pingTimeout: 1000,
  });

  server.on('close', () => {
    Object.keys(io.sockets.connected).forEach((key) => {
      io.sockets.connected[key].disconnect();
    });
  });

  io.on('connection', async (socket) => {
    const id = idFromJWT(
      socket.handshake.headers.authorization,
      app.config.jwt.key,
      app.config.jwt.algorithm
    );

    if (!id) {
      // TODO: Graceful exit
      socket.close();
      return;
    }

    const pUser = User.where({ id }).fetch({ withRelated: ['rooms'] });
    const pRooms = Room.where({ type: ROOM_TYPE_PUBLIC }).fetchAll();
    const pUsers = User.fetchAll({
      columns: ['id', 'firstName', 'lastName'],
    });

    const [
      user,
      rooms,
      users,
    ] = await Promise.all([pUser, pRooms, pUsers]);

    // Tie the user data to the socket
    Object.assign(socket, { user: user.toJSON() });

    const activeRooms = user.toJSON().rooms.map(room => room.id);

    const connectedUsers = R.map(
      R.compose(R.path(['user', 'id']), R.last),
      R.toPairs(io.sockets.connected)
    );

    socket.join(activeRooms);

    socket.emit(EVENT_TYPE_ACTION, [
      setAvailableRooms(rooms.toJSON()),
      setActiveRooms(activeRooms),
      setCurrentRoom(user.get('currentRoomId')),
      setUsers(users.toJSON()),
      setConnectedUsers(connectedUsers),
    ]);

    // Inform all other connected clients of the newly connected user
    socket.broadcast.emit(EVENT_TYPE_ACTION, addConnectedUser(id));

    socket.on('disconnect', () => {
      const aliveConnections = R.toPairs(io.sockets.connected)
        .map(R.compose(R.path(['user', 'id']), R.last))
        .filter(uid => uid === id);

      // Inform all remaining connected clients of the disconnect
      // only if this is the last connection by this user
      if (aliveConnections.length === 0) {
        io.sockets.emit(EVENT_TYPE_ACTION, removeConnectedUser(id));
      }
    });
  });
}
