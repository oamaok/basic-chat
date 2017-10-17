import React from 'react';
import { connect } from 'react-redux';
import { OrderedSet } from 'immutable';
import { stateToProps } from 'utilities';
import Icon from 'components/Icon';
import { changeRoom } from 'actions/rooms';
import { logout } from 'actions/authentication';

import {
  MODAL_USER_SELECTOR,
  MODAL_ROOM_SELECTOR,
} from 'utilities/constants';

import {
  ROOM_TYPE_PUBLIC,
  ROOM_TYPE_PRIVATE,
} from 'common/constants';

import PublicRoomListing from 'containers/PublicRoomListing';
import PrivateRoomListing from 'containers/PrivateRoomListing';

function Sidebar({
  rooms,
  logout,
  authentication,
}) {
  const activeRooms = rooms.activeRooms
    .map(roomId => rooms.availableRooms.get(roomId))
    .groupBy(({ type }) => type);

  const {
    firstName,
    lastName,
  } = authentication.currentUser;

  const publicRooms = activeRooms.get(ROOM_TYPE_PUBLIC) || OrderedSet();
  const privateRooms = activeRooms.get(ROOM_TYPE_PRIVATE) || OrderedSet();

  return (
    <div className="sidebar">
      <div className="section-title">
        rooms
        {/* DEV-SCHOOL: This button should open the RoomSelector-modal */}
        <button onClick={() => {}}>
          <Icon name="&#xE145;" />
        </button>
      </div>
      <div className="room-list">
        {publicRooms.map(room => <PublicRoomListing key={room.id} room={room} />).toArray()}
      </div>
      <hr />
      <div className="section-title">
        people
        {/* DEV-SCHOOL: This button should open the UserSelector-modal */}
        <button onClick={() => {}}>
          <Icon name="&#xE145;" />
        </button>
      </div>
      <div className="room-list">
        {privateRooms.map(room => <PrivateRoomListing key={room.id} room={room} />).toArray()}
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
  logout,
})(Sidebar);
