import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EVENT_ACTION } from 'common/constants';

import { stateToProps } from 'utilities';
import Sidebar from 'containers/Sidebar';
import Chat from 'containers/Chat';
import RoomSelector from 'containers/RoomSelector';
import Connection from '../Connection';

class App extends Component {
  state = {
    initializing: true,
    reconnecting: false,
    unmounting: false,
  }

  componentWillMount() {
    this.establishConnection();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount()');
    this.setState({
      unmounting: true,
    });
    
    Connection.getInstance().close();
  }

  attemptToReconnect() {
    if (this.state.unmounting) {
      return;
    }

    this.setState({
      reconnecting: true,
    });

    Connection.getInstance().close();
    this.establishConnection();
  }

  establishConnection() {
    console.log('establishConnection()');
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
      this.attemptToReconnect();
    });

    socket.on('connect_error', () => {
      this.attemptToReconnect();
    });

    socket.on('connect_timeout', () => {
      this.attemptToReconnect();
    });

    socket.on('error', () => {
      console.log('Socket: error');
      // TODO
    });

    socket.on('reconnect_attempt', () => {
      console.log('Socket: reconnect_attempt');
      // TODO
    });

    socket.on('reconnect', () => {
      console.log('Socket: reconnect');
      // TODO
    });
  }

  render() {
    // TODO: Display a spinner while initializing connection
    // TODO: Display an error while trying to reconnect

    if (this.state.initializing) {
      return null;
    }

    const isModelOpen = this.props.modals.userSelectorOpen
      || this.props.modals.roomSelectorOpen;

    const containerClass = isModelOpen ? 'app-container modal-open' : 'app-container';

    return (
      <div className="app">
        <RoomSelector />
        <div className={containerClass}>
          <Sidebar />
          <Chat />
        </div>
      </div>
    );
  }
}

export default connect(stateToProps('authentication', 'modals'))(App);
