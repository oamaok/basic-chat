import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changeRoom } from 'actions/rooms';
import { stateToProps } from 'utilities';

function PublicRoomListing({ room, rooms, changeRoom }) {
  const roomClass = classNames('room', {
    current: rooms.currentRoom === room.id,
    unread: room.unreadMessages !== 0,
  });

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  return (
    <div
      role="navigation"
      className={roomClass}
      key={room.id}
      onClick={() => changeRoom(room.id)}
    >
      # {room.name}
      <div className="unread-indicator" />
    </div>
  );
}
export default connect(stateToProps('rooms'), {
  changeRoom,
})(PublicRoomListing);
