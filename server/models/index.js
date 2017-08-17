/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');
const Knex = require('knex');
const Bookshelf = require('bookshelf');

module.exports = (app) => {
  const knex = Knex({
    client: 'pg',
    connection: Object.assign({ charset: 'utf8' }, app.config.database),
  });

  const bookshelf = Bookshelf(knex);

  const models = fs
    .readdirSync(__dirname)
    .filter(entry => entry.substr(-3) === '.js' && entry[0].toUpperCase() === entry[0])
    .reduce((obj, entry) => Object.assign(obj, {
      [entry.slice(0, -3)]: require(path.resolve(__dirname, entry))(bookshelf, obj),
    }), {});

  Object.assign(app, { models });
};
