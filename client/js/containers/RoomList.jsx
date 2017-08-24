import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from '../utilities';

function RoomList({ rooms }) {
  return (
    <div className="room-list">
      {rooms.availableRooms.map(room => <div>{room.name}</div>).toArray()}
    </div>
  );
}

export default connect(stateToProps('rooms'))(RoomList);
