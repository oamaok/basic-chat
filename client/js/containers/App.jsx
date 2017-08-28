import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EVENT_TYPE_ACTION } from 'common/constants';

import { stateToProps } from 'utilities';
import RoomList from 'containers/RoomList';
import Chat from 'containers/Chat';
import Connection from '../Connection';

class App extends Component {
  state = {
    initializing: true,
    reconnecting: false,
  }

  componentWillMount() {
    this.establishConnection();
  }

  componentWillUnmount() {
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
    const connection = Connection.init(this.props.authentication.token);
    const { socket } = connection;

    socket.on('connect', () => {
      this.setState({
        initializing: false,
        reconnecting: false,
      });
    });

    socket.on(EVENT_TYPE_ACTION, this.props.dispatch);

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
    return (
      <div className="app">
        <RoomList />
        <Chat />
      </div>
    );
  }
}

export default connect(stateToProps('authentication'))(App);
