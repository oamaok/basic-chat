/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  fs.readdirSync(__dirname)
    .filter(entry => entry.substr(-3) === '.js' && entry !== 'index.js')
    .forEach(entry => require(path.resolve(__dirname, entry))(app, router));

  // Apply the routes
  app.use(router.routes());
};
