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
      console.log('Socket: connect_error');
      // TODO
    });

    socket.on('connect_timeout', () => {
      console.log('Socket: connect_timeout');
      // TODO
    });

    socket.on('error', () => {
      console.log('Socket: error');
      // TODO
    });

    socket.on('disconnect', () => {
      console.log('Socket: disconnect');
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
