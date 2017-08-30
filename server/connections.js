import R from 'ramda';

import {
  EVENT_ACTION,
  EVENT_CHANGE_ROOM,
  EVENT_CREATE_ROOM,
  ROOM_TYPE_PUBLIC,
  EVENT_NEW_MESSAGE,
  EVENT_JOIN_ROOM,
} from 'common/constants';

import {
  setAvailableRooms,
  setActiveRooms,
  setCurrentRoom,
  addAvailableRoom,
  addActiveRoom,
  createRoomRequestSuccess,
} from 'common/actions/rooms';

import {
  setUsers,
  setConnectedUsers,
  removeConnectedUser,
  addConnectedUser,
} from 'common/actions/users';

import {
  addMessages,
  addMessage,
  markMessageAsSent,
} from 'common/actions/messages';

import { idFromJWT } from './utilities';

export default function connections(app) {
  const {
    User,
    Room,
    Message,
  } = app.models;
  const { io } = app;

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

    if (!user) {
      // TODO: Graceful exit
      socket.close();
      return;
    }

    // Tie the user data to the socket
    Object.assign(socket, { user: user.toJSON() });

    const activeRooms = user.toJSON().rooms.map(room => room.id);
    const currentRoomId = user.get('currentRoomId');
    const connectedUsers = R.toPairs(io.sockets.connected)
      .filter(pair => pair[1].user)
      .map(pair => pair[1].user.id);

    socket.join(activeRooms);

    socket.emit(EVENT_ACTION, [
      setAvailableRooms(rooms.toJSON()),
      setActiveRooms(activeRooms),
      setCurrentRoom(currentRoomId),
      setUsers(users.toJSON()),
      setConnectedUsers(connectedUsers),
    ]);

    // Inform all other connected clients of the newly connected user
    socket.broadcast.emit(EVENT_ACTION, addConnectedUser(id));

    const currentRoomMessages = await Message.query({
      where: { roomId: currentRoomId },
      limit: 25,
    }).fetchAll();

    // Send the current room's messages
    socket.emit(EVENT_ACTION, addMessages(currentRoomMessages));

    // Event handlers
    R.forEachObjIndexed(R.flip(socket.on.bind(socket)), {
      [EVENT_CHANGE_ROOM]: async (roomId) => {
        await user.set('currentRoomId', roomId).save();

        const messages = await Message.query({
          where: { roomId },
          limit: 25,
        }).fetchAll();

        socket.emit(EVENT_ACTION, addMessages(messages));
      },

      [EVENT_JOIN_ROOM]: async (roomId) => {
        socket.join(roomId);

        // TODO: transactions? maybe not neccessary.
        await user.rooms().attach({
          roomId,
          createdAt: new Date(),
        });

        await user.set('currentRoomId', roomId).save();

        const messages = await Message.query({
          where: { roomId },
          limit: 25,
        }).fetchAll();

        socket.emit(EVENT_ACTION, [
          addActiveRoom(roomId),
          addMessages(messages),
        ]);
      },

      [EVENT_CREATE_ROOM]: async (name) => {
        try {
          const room = await Room.forge({
            creatorId: id,
            createdAt: new Date(),
            type: ROOM_TYPE_PUBLIC,
            name,
          }).save();

          await user.rooms().attach({
            roomId: room.get('id'),
            createdAt: new Date(),
          });

          await user.set('currentRoomId', room.get('id')).save();

          // Send the new room to everybody
          io.sockets.emit(EVENT_ACTION, addAvailableRoom(room.toJSON()));

          // Add the current user to the room
          socket.emit(EVENT_ACTION, [
            addActiveRoom(room.get('id')),
            setCurrentRoom(room.get('id')),
            createRoomRequestSuccess(),
          ]);
        } catch (err) {
          // TODO: handle errors
          console.error(err);
        }
      },

      [EVENT_NEW_MESSAGE]: async (messageObj) => {
        try {
          const message = await Message.forge({
            roomId: messageObj.roomId,
            userId: id,
            createdAt: new Date(),
            contents: messageObj.contents,
          }).save();

          socket.to(messageObj.roomId).emit(EVENT_ACTION, addMessage(message.toJSON()));

          // Mark the message as sent using the original ID
          socket.emit(EVENT_ACTION, markMessageAsSent(messageObj.id, message.id));
        } catch (err) {
          // TODO: Send an error
          console.error(err);
        }
      },

      disconnect: () => {
        const aliveConnections = R.toPairs(io.sockets.connected)
          .filter(pair => pair[1].user && pair[1].user.id === id);

        // Inform all remaining connected clients of the disconnect
        // only if this is the last connection by this user
        if (aliveConnections.length === 0) {
          io.sockets.emit(EVENT_ACTION, removeConnectedUser(id));
        }
      },
    });
  });
}
