import io from 'socket.io-client';

export default class Connection {
  socket = null;
  static instance = null;

  constructor(token) {
    if (this.instance) {
      throw new Error('Connection has already been established!');
    }

    this.socket = io('', {
      path: '/api/ws',
      extraHeaders: {
        Authorization: token,
      },
    });
  }

  static init(token) {
    Connection.instance = new Connection(token);
    return Connection.instance;
  }

  static close() {
    Connection.instance.socket.close();
    Connection.instance = null;
  }

  static getInstance() {
    if (Connection.instance) {
      throw new Error('Connection hasn\'t been initialized!');
    }

    return Connection.instance;
  }
}
