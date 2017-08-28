import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from 'components/Icon';
import { stateToProps, bindState } from 'utilities';

class Chat extends Component {
  state = {
    message: '',
  }

  sendMessage = () => {
    this.setState({
      message: '',
    });

    const { messageElement } = this;
    messageElement.style.height = 0;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.sendMessage();
  }

  handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      this.sendMessage();
    }
  }

  handleMessageChange = (evt) => {
    this.setState({
      message: evt.target.value,
    });

    const { messageElement } = this;
    messageElement.style.height = 0;
    messageElement.style.height = `${messageElement.scrollHeight}px`;
  }

  bind = bindState(this)

  render() {
    const {
      handleSubmit,
      handleMessageChange,
      handleKeyDown,
    } = this;

    const {
      message,
    } = this.state;

    const {
      currentRoom,
      availableRooms,
    } = this.props.rooms;

    const room = availableRooms.get(currentRoom);

    if (!room) {
      return null;
    }

    return (
      <div className="chat">
        <div className="room-header"># {room.name}</div>
        <div className="message-container">
          <p>here be messages</p>
        </div>
        <form className="input" onSubmit={handleSubmit}>
          <textarea
            ref={(elem) => { this.messageElement = elem; }}
            onKeyDown={handleKeyDown}
            onChange={handleMessageChange}
            value={message}
          />
          <button>
            <Icon name="&#xE163;" />
          </button>
        </form>
      </div>
    );
  }
}

export default connect(stateToProps('rooms'))(Chat);
