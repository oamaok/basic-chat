import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EVENT_ACTION } from 'common/constants';
import classNames from 'classnames';
import { stateToProps } from 'utilities';
import Sidebar from 'containers/Sidebar';
import Chat from 'containers/Chat';
import RoomSelector from 'containers/RoomSelector';
import UserSelector from 'containers/UserSelector';
import Connection from '../Connection';

class App extends Component {
  state = {
    initializing: true,
    reconnecting: false,
  }

  unmounting = false

  componentWillMount() {
    this.establishConnection();
  }

  componentWillUnmount() {
    this.unmounting = true;

    Connection.getInstance().close();
  }

  attemptToReconnect() {
    this.setState({
      reconnecting: true,
    });

    Connection.getInstance().close();
    this.establishConnection();
  }

  establishConnection() {
    if (this.unmounting) {
      return;
    }

    const connection = Connection.init(this.props.authentication.token);
    const { socket } = connection;

    socket.on('connect', () => {
      this.setState({
        initializing: false,
        reconnecting: false,
      });
    });

    socket.on(EVENT_ACTION, this.props.dispatch);

    socket.on('disconnect', () => {
      if (this.state.unmounting) {
        return;
      }

      this.attemptToReconnect();
    });

    socket.on('connect_error', () => {
      this.attemptToReconnect();
    });

    socket.on('connect_timeout', () => {
      this.attemptToReconnect();
    });
  }

  render() {
    // TODO: Display a spinner while initializing connection (?)
    // TODO: Display an error while trying to reconnect

    const isModalOpen = this.props.modals.userSelectorOpen
      || this.props.modals.roomSelectorOpen;

    const initializing = this.state.initializing
      || this.props.rooms.availableRooms.size === 0;

    const containerClass = classNames('app-container', {
      'modal-open': isModalOpen,
      initializing,
    });


    return (
      <div className="app">
        <RoomSelector />
        <UserSelector />
        <div className={containerClass}>
          <Sidebar />
          <Chat />
        </div>
      </div>
    );
  }
}

export default connect(stateToProps('authentication', 'rooms', 'modals'))(App);
