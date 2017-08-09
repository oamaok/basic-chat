const Koa = require('koa');

const app = new Koa();

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;
