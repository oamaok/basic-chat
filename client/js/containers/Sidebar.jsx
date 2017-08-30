import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';
import classNames from 'classnames';
import StatusIndicator from 'containers/StatusIndicator';
import Icon from 'components/Icon';
import { changeRoom } from 'actions/rooms';
import { logout } from 'actions/authentication';
import { openUserSelector, openRoomSelector } from 'actions/modals';

function Sidebar({
  rooms,
  users,
  changeRoom,
  openRoomSelector,
  openUserSelector,
  logout,
  authentication,
}) {
  const activeRooms = rooms.activeRooms.map(room => rooms.availableRooms.get(room));
  const { currentRoom } = rooms;
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

  const roomClass = room => classNames('room', {
    current: currentRoom === room.id,
    unread: room.unreadMessages !== 0,
  });

  const {
    firstName,
    lastName,
  } = authentication.currentUser;

  return (
    <div className="sidebar">
      <div className="section-title">
        rooms
        <button onClick={openRoomSelector}>
          <Icon name="&#xE145;" />
        </button>
      </div>
      <div className="room-list">
        {activeRooms.map(room => (
          <div
            role="navigation"
            className={roomClass(room)}
            key={room.id}
            onClick={() => changeRoom(room.id)}
          >
            # {room.name}
            <div className="unread-indicator" />
          </div>
        )).toArray()}
      </div>
      <div className="section-title">
        people
        <button onClick={openUserSelector}>
          <Icon name="&#xE145;" />
        </button>
      </div>
      <div className="private-chats">
        {users.allUsers.map(user => (
          <div className="private-chat" key={user.id}>
            <StatusIndicator user={user} />
            {user.firstName} {user.lastName}
          </div>
        )).toArray()}
      </div>
      <div className="user-tools">
        <div className="info">{firstName} {lastName}</div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default connect(stateToProps('authentication', 'rooms', 'users'), {
  changeRoom,
  openRoomSelector,
  openUserSelector,
  logout,
})(Sidebar);
