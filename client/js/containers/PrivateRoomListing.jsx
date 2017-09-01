import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changeRoom } from 'actions/rooms';
import { stateToProps } from 'utilities';
import StatusIndicator from 'components/StatusIndicator';

function PrivateRoomListing({ room, rooms, users, changeRoom, authentication }) {
  // Wait for the users to be initialized before displaying anything
  if (users.allUsers.size === 0) {
    return null;
  }

  const roomClass = classNames('room', {
    current: rooms.currentRoom === room.id,
    unread: room.unreadMessages !== 0,
  });

  const roomUserIds = room.users.map(({ id }) => id);

  const roomUsers = roomUserIds
    .filter(id => id !== authentication.currentUser.id)
    .map(id => users.allUsers.get(id));

  const roomName = roomUsers
    .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
    .join(', ');

  // Display online status if any of the users is online
  // (with the exception of the current user)
  const roomOnline = roomUsers.some(({ id }) => users.connectedUsers.includes(id));

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  return (
    <div
      role="navigation"
      className={roomClass}
      key={room.id}
      onClick={() => changeRoom(room.id)}
    >
      <StatusIndicator online={roomOnline} />
      {roomName}
      <div className="unread-indicator" />
    </div>
  );
}
export default connect(stateToProps('rooms', 'users', 'authentication'), {
  changeRoom,
})(PrivateRoomListing);
