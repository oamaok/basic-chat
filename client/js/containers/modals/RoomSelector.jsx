import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateToProps } from 'utilities';

import { joinRoom, createRoom } from 'actions/rooms';
import { closeModal } from 'actions/modal';
import LabeledInput from 'components/LabeledInput';
import Icon from 'components/Icon';

class RoomSelector extends Component {
  state = {
    name: '',
  }

  handleNameChange = (evt) => {
    this.setState({
      name: evt.target.value.replace(/[^a-z0-9_-]/gi, ''),
    });
  }

  handleRoomCreate = (evt) => {
    evt.preventDefault();

    this.props.createRoom(this.state.name);
  }

  render() {
    const {
      handleNameChange,
      handleRoomCreate,
    } = this;
    const { availableRooms, activeRooms } = this.props.rooms;
    const { name } = this.state;

    const rooms = availableRooms.filter(({ id }) => !activeRooms.includes(id));

    const isRoomNameAvailable = !availableRooms.find(room => room.name === name)
      && name.length !== 0;

    const nameHint = isRoomNameAvailable
      ? <Icon name="&#xE86C;" />
      : <span><Icon name="&#xE5C9;" /> room name is unavailable!</span>;

    const nameHintType = isRoomNameAvailable
      ? 'success'
      : 'error';

    // TODO: display errors returned if room creation fails

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div className="modal room-selector">
        <div className="join">
          <div>
            <h3>join a room</h3>
            <button
              className="modal-exit"
              onClick={this.props.closeModal}
            >
              <Icon name="&#xE14C;" />
            </button>
          </div>
          <div className="room-list">
            {rooms.map(({ id, name }) => (
              <div key={id} className="room">
                # {name}
                <button onClick={() => this.props.joinRoom(id)}>join!</button>
              </div>
            )).toArray()}
            {!rooms.size &&
              <div className="placeholder">no rooms to join :(</div>
            }
          </div>
        </div>
        <hr />
        <form className="new" onSubmit={handleRoomCreate}>
          <h3>create a new room</h3>
          <LabeledInput
            id="room-name"
            type="text"
            label="name"
            hintType={nameHintType}
            hint={nameHint}
            value={name}
            onChange={handleNameChange}
          />
          <button disabled={!isRoomNameAvailable}>create!</button>
          <div className="clearfix" />
        </form>
      </div>
    );
  }
}

export default connect(stateToProps('rooms'), {
  joinRoom,
  createRoom,
  closeModal,
})(RoomSelector);
