/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

export default function routesLoader(app) {
  const router = new Router({
    prefix: '/api',
  });

  fs.readdirSync(__dirname)
    .filter(entry => entry.substr(-3) === '.js' && entry !== 'index.js')
    .forEach(entry => require(path.resolve(__dirname, entry)).default(app, router));

  // Apply the routes
  app.use(router.routes());
}
