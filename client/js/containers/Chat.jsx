import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import R from 'ramda';

import Message from 'containers/Message';
import Icon from 'components/Icon';
import { stateToProps, bindState } from 'utilities';
import { sendMessage } from 'actions/messages';
import { RoomRecord } from 'records';

class Chat extends Component {
  state = {
    message: '',
  }

  messageContainer = null

  componentDidUpdate() {
    // Reset the scroll when the component updates.
    // TODO: Display message to user when new messages appear
    // instead of scrolling to the bottom.
    const { messageContainer } = this;
    messageContainer.scrollTop = -(messageContainer.getBoundingClientRect().height - messageContainer.scrollHeight);
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    
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

    const room = availableRooms.get(currentRoom) || new RoomRecord();

    const {
      allMessages,
      roomMessages,
    } = this.props.messages;

    const messages = (roomMessages.get(currentRoom) || Set())
      .map(messageId => allMessages.get(messageId))
      .sortBy(message => message.createdAt)
      .toArray();

    const groupedMessages = R.groupWith(
      (a, b) => a.userId === b.userId
      && b.createdAt.getTime() - a.createdAt.getTime() < 1000 * 60 * 10
    )(messages);

    return (
      <div className="chat">
        <div className="room-header"># {room.name}</div>
        <div className="message-container" ref={(elem) => { this.messageContainer = elem; }}>
          {groupedMessages.map(msg => <Message messages={msg} />)}
          <div className="clearfix" />
        </div>
        <div className="hr" />
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

export default connect(stateToProps('rooms', 'messages'), {
  sendMessage,
})(Chat);
