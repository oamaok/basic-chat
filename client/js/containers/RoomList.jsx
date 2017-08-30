import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';
import StatusIndicator from 'containers/StatusIndicator';
import Icon from 'components/Icon';
import { changeRoom } from 'actions/rooms';
import { logout } from 'actions/authentication';
import { openUserSelector, openRoomSelector } from 'actions/modals';

function RoomList({
  rooms,
  users,
  changeRoom,
  openRoomSelector,
  openUserSelector,
  logout,
}) {
  const activeRooms = rooms.activeRooms.map(room => rooms.availableRooms.get(room));
  const { currentRoom } = rooms;
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  return (
    <div className="room-list">
      <div className="section-title">
        rooms
        <button onClick={openRoomSelector}>
          <Icon name="&#xE145;" />
        </button>
      </div>
      <div className="rooms">
        {activeRooms.map(room => (
          <div
            role="navigation"
            className={currentRoom === room.id ? 'room current' : 'room'}
            key={room.id}
            onClick={() => changeRoom(room.id)}
          >
            # {room.name}
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
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default connect(stateToProps('rooms', 'users'), {
  changeRoom,
  openRoomSelector,
  openUserSelector,
  logout,
})(RoomList);
