import http from 'http';
import Koa from 'koa';
import koaJson from 'koa-json';
import koaJsonError from 'koa-json-error';
import koaBodyparser from 'koa-bodyparser';

import config from './config';
import models from './models';
import authentication from './middleware/authentication';
import routes from './routes';
import connections from './connections';

const app = new Koa();
const server = http.createServer(app.callback());

app.use(koaBodyparser());
app.use(koaJsonError());
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
connections(server, app);

if (require.main === module) {
  server.listen(3000);
}

export default server;
