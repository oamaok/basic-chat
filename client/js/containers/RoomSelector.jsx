import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateToProps, bindState } from 'utilities';

import { joinRoom, createRoom } from 'actions/rooms';
import { closeRoomSelector } from 'actions/modals';
import LabeledInput from 'components/LabeledInput';
import Icon from 'components/Icon';

class RoomSelector extends Component {
  state = {
    name: '',
  }

  bind = bindState(this)

  handleWrapperClick = (evt) => {
    if (Array.from(evt.target.classList).includes('modal-wrapper')) {
      this.props.closeRoomSelector();
    }
  }

  handleRoomCreate = (evt) => {
    evt.preventDefault();

    this.props.createRoom(this.state.name);
  }

  render() {
    const { bind, handleWrapperClick, handleRoomCreate } = this;
    const { roomSelectorOpen } = this.props.modals;
    const { availableRooms, activeRooms } = this.props.rooms;
    const { name } = this.state;

    const rooms = availableRooms.filter(room => !activeRooms.includes(room.id));

    const isRoomNameAvailable = !availableRooms.find(room => room.name === name)
      && name.length !== 0;

    const nameHint = isRoomNameAvailable
      ? <Icon name="&#xE86C;" />
      : <span><Icon name="&#xE5C9;" /> room name is unavailable!</span>;

    const nameHintType = isRoomNameAvailable
      ? 'success'
      : 'error';

    // TODO: display errors returned if room creation fails

    return (
      <div
        className={roomSelectorOpen ? 'modal-wrapper open' : 'modal-wrapper'}
        onClick={handleWrapperClick}
      >
        <div className="modal room-selector">
          <div className="join">
            <div>
              <h3>join a room</h3>
              <button
                className="modal-exit"
                onClick={this.props.closeRoomSelector}
              >
                <Icon name="&#xE14C;" />
              </button>
            </div>
            <div className="list">
              {rooms.map(room => (
                <div key={room.id} className="room">
                  # {room.name}
                  <button onClick={() => this.props.joinRoom(room.id)}>join!</button>
                </div>
              )).toArray()}
              {!rooms.size &&
                <div className="placeholder">no rooms to join :(</div>
              }
            </div>
          </div>
          <form className="new" onSubmit={handleRoomCreate}>
            <h3>create a new room</h3>
            <LabeledInput
              id="room-name"
              type="text"
              label="name"
              hintType={nameHintType}
              hint={nameHint}
              {...bind('name')}
            />
            <button disabled={!isRoomNameAvailable}>create!</button>
            <div className="clearfix" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(stateToProps('modals', 'rooms'), {
  joinRoom,
  createRoom,
  closeRoomSelector,
})(RoomSelector);
