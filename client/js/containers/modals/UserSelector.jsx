import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';
import { ROOM_TYPE_PRIVATE } from 'common/constants';
import { changeRoom, createPrivateRoom } from 'actions/rooms';
import { closeModal } from 'actions/modal';
import Icon from 'components/Icon';
import StatusIndicator from 'components/StatusIndicator';

class UserSelector extends Component {
  startChat = (userId) => {
    // TODO: causes the modal to close instantly,
    // should wait until the room is created
    this.props.closeModal();

    // Check if the current user has a private one-on-one room with the subject 
    const existingRoom = this.props.rooms.availableRooms
      .find(room =>
        room.type === ROOM_TYPE_PRIVATE
        && room.users.some(({ id }) => id === userId)
        && room.users.length === 2
      );

    if (existingRoom) {
      this.props.changeRoom(existingRoom.id);
      return;
    }

    this.props.createPrivateRoom(userId);
  }

  render() {
    const {
      startChat,
    } = this;

    const { allUsers, connectedUsers } = this.props.users;

    // Filter out the current user
    const users = allUsers
      .filter(({ id }) => id !== this.props.authentication.currentUser.id);

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className="modal user-selector">
        <div className="join">
          <div>
            <h3>start a chat with...</h3>
            <button
              className="modal-exit"
              onClick={this.props.closeModal}
            >
              <Icon name="&#xE14C;" />
            </button>
          </div>
          <div className="user-list">
            {users.map(({ id, firstName, lastName }) => (
              <div className="user" key={id}>
                <StatusIndicator online={connectedUsers.includes(id)} />
                {firstName} {lastName}
                <button onClick={() => startChat(id)}>chat!</button>
              </div>
            )).toArray()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(stateToProps('rooms', 'users', 'authentication'), {
  changeRoom,
  createPrivateRoom,
  closeModal,
})(UserSelector);
