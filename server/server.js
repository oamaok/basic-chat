import http from 'http';
import Koa from 'koa';
import koaJson from 'koa-json';
import koaJsonError from 'koa-json-error';
import koaBodyparser from 'koa-bodyparser';
import SocketIO from 'socket.io';
import R from 'ramda';

import config from './config';
import models from './models';
import authentication from './middleware/authentication';
import routes from './routes';
import connections from './connections';

const app = new Koa();
const server = http.createServer(app.callback());

const io = SocketIO(server, {
  path: '/api/ws',
  pingInterval: 2000,
  pingTimeout: 1000,
});

server.on('close', () => {
  Object.keys(io.sockets.connected).forEach((key) => {
    io.sockets.connected[key].disconnect();
  });
});

Object.assign(app, { io });

app.use(koaBodyparser());
app.use(koaJsonError({
  postFormat: (e, obj) => R.omit(config.stackTrace ? [] : ['stack'], obj),
}));
app.use(koaJson());

// Initialize configurations
Object.assign(app, { config });

// Initialize database models
models(app);

// Authentication middleware
authentication(app);

// Initialize routes
routes(app);
// Initialize Socket.IO connections handler
connections(app);

if (require.main === module) {
  server.listen(config.apiPort);
}

export default server;
