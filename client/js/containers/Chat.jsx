import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import R from 'ramda';
import { ROOM_TYPE_PUBLIC } from 'common/constants';
import MessageGroup from 'containers/MessageGroup';
import Icon from 'components/Icon';
import { stateToProps, bindState } from 'utilities';
import { sendMessage } from 'actions/messages';
import { RoomRecord, UserRecord } from 'records';

class Chat extends Component {
  state = {
    message: '',
  }

  componentDidUpdate() {
    // Reset the scroll when the component updates.
    // TODO: Display message to user when new messages appear
    // instead of scrolling to the bottom.
    const { messageContainer } = this;
    messageContainer.scrollTop = -(messageContainer.getBoundingClientRect().height
      - messageContainer.scrollHeight);
  }

  messageContainer = null

  sendMessage = () => {
    if (!this.state.message) {
      return;
    }
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

    const {
      currentUser,
    } = this.props.authentication;

    const {
      allUsers: users,
    } = this.props.users;

    const room = availableRooms.get(currentRoom) || new RoomRecord();

    const {
      allMessages,
      roomMessages,
    } = this.props.messages;

    const messages = (roomMessages.get(currentRoom) || Set())
      .map(messageId => allMessages.get(messageId))
      .sortBy(message => message.createdAt)
      .toArray();

    // Group the messages based on user and time to avoid unneccessarily outputting the
    // message authors' names for message
    const groupedMessages = R.groupWith(
      (a, b) => a.userId === b.userId
      && b.createdAt.getTime() - a.createdAt.getTime() < 1000 * 60 * 10
    )(messages);

    // Deduce the room name:
    //  - If the room is public, just output the name
    //  - If the room is private, output comma-separated list of users in the room
    //    (excluding the current user)
    const roomName = room.type === ROOM_TYPE_PUBLIC
      ? `# ${room.name}`
      : room.users
        .filter(({ id }) => id !== currentUser.id)
        // Since the users may have not been loaded, fall back to defaults
        .map(({ id }) => users.get(id) || new UserRecord())
        .map(({ firstName, lastName }) => `${firstName} ${lastName}`).join(', ');

    const noMessages = groupedMessages.length === 0;

    return (
      <div className="chat">
        <div className="room-header">{roomName}</div>
        <div className="message-container" ref={(elem) => { this.messageContainer = elem; }}>
          {noMessages && <span>no messages, yet :)</span>}
          {groupedMessages.map(group => <MessageGroup key={group[0].id} messages={group} />)}
          <div className="clearfix" />
        </div>
        <hr />
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

export default connect(stateToProps('rooms', 'messages', 'users', 'authentication'), {
  sendMessage,
})(Chat);
