import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';
import { ROOM_TYPE_PRIVATE } from 'common/constants';
import { changeRoom, createPrivateRoom } from 'actions/rooms';
import { closeUserSelector } from 'actions/modals';
import Icon from 'components/Icon';
import StatusIndicator from 'components/StatusIndicator';

class UserSelector extends Component {
  handleWrapperClick = (evt) => {
    if (Array.from(evt.target.classList).includes('modal-wrapper')) {
      this.props.closeUserSelector();
    }
  }

  startChat = (userId) => {
    // TODO: causes the modal to close instantly,
    // should wait until the room is created
    this.props.closeUserSelector();

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
      handleWrapperClick,
    } = this;

    const { userSelectorOpen } = this.props.modals;
    const { allUsers, connectedUsers } = this.props.users;

    // Filter out the current user
    const users = allUsers
      .filter(({ id }) => id !== this.props.authentication.currentUser.id);

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div
        className={userSelectorOpen ? 'modal-wrapper open' : 'modal-wrapper'}
        onClick={handleWrapperClick}
      >
        <div className="modal user-selector">
          <div className="join">
            <div>
              <h3>start a chat with...</h3>
              <button
                className="modal-exit"
                onClick={this.props.closeUserSelector}
              >
                <Icon name="&#xE14C;" />
              </button>
            </div>
            <div className="user-list">
              {users.map(({ id, firstName, lastName }) => (
                <div className="user" key={id}>
                  <StatusIndicator online={connectedUsers.includes(id)} />
                  {firstName} {lastName}
                  <button onClick={() => this.startChat(id)}>chat!</button>
                </div>
              )).toArray()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(stateToProps('modals', 'rooms', 'users', 'authentication'), {
  closeUserSelector,
  changeRoom,
  createPrivateRoom,
})(UserSelector);
