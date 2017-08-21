const Koa = require('koa');
const koaJson = require('koa-json');
const koaJsonError = require('koa-json-error');
const koaBodyparser = require('koa-bodyparser');

const config = require('./config');
const models = require('./models');
const routes = require('./routes');

const app = new Koa();

app.use(koaBodyparser());
app.use(koaJsonError());
app.use(koaJson());

// Initialize configurations
Object.assign(app, { config });

// Initialize database models
models(app);

// Initialize routes
routes(app);

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;
