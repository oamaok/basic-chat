import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';

function RoomList({ rooms, users }) {
  return (
    <div className="room-list">
      <h3>rooms</h3>
      {rooms.availableRooms.map(room => <div># {room.name}</div>).toArray()}
      <h3>users</h3>
      {users.allUsers.map(user => (
        <div>
          {users.connectedUsers.includes(user.id) && 'Connected'}

          {user.firstName}
        </div>
      )).toArray()}
    </div>
  );
}

export default connect(stateToProps('rooms', 'users'))(RoomList);
