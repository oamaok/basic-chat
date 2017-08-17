const Koa = require('koa');

const config = require('./config');
const models = require('./models');

const app = new Koa();

// Initialize configurations
Object.assign(app, { config });

// Initialize database models
models(app);

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;
