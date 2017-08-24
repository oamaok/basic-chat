import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTION } from 'common/constants/events';

import { stateToProps } from '../utilities';
import RoomList from './RoomList';
import Chat from './Chat';
import Connection from '../Connection';

class App extends Component {
  state = {
    initializing: true,
  }

  componentWillMount() {
    const connection = Connection.init(this.props.authentication.token);
    const { socket } = connection;

    socket.on('connect', () => {
      this.setState({
        initializing: false,
      });
    });

    socket.on(ACTION, this.props.dispatch);

    socket.on('connect_error', () => {
      // TODO
    });

    socket.on('connect_timeout', () => {
      // TODO
    });

    socket.on('error', () => {
      // TODO
    });

    socket.on('disconnect', () => {
      // TODO
    });

    socket.on('reconnect_attempt', () => {
      // TODO
    });
  }

  componentWillUnmount() {
    Connection.getInstance().socket.close();
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
