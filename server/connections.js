import SocketIO from 'socket.io';
import { ACTION } from 'common/constants/events';
import { ROOM_TYPE_PUBLIC } from 'common/constants';
import {
  setAvailableRooms,
  setActiveRooms,
} from 'common/actions/rooms';

import { idFromJWT } from './utilities';

export default function connections(server, app) {
  const { User, Room } = app.models;

  const io = SocketIO(server, { path: '/api/ws' });

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

    const user = await User.where({ id }).fetch({ withRelated: ['rooms'] });
    const rooms = await Room.where({ type: ROOM_TYPE_PUBLIC }).fetchAll();

    const activeRooms = user.toJSON().rooms.map(room => room.id);

    socket.join(activeRooms);

    socket.emit(ACTION, setAvailableRooms(rooms.toJSON()));
    socket.emit(ACTION, setActiveRooms(activeRooms));
  });
}
