/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');
const middleware = require('webpack-hot-middleware');
const config = require('../webpack.development.config');

const API_PORT = 3000;

const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, {
  hot: true,
  stats: { colors: true },
  proxy: {
    '/api': {
      target: `http://localhost:${API_PORT}`,
    },
  },
});
devServer.use(middleware(compiler));
devServer.listen(8080);

let app;
let server;

try {
  app = require('./server');
  server = app.listen(API_PORT);
} catch (err) {
  console.error(err);
}

const watcher = chokidar.watch(__dirname);

watcher.on('ready', () => {
  watcher.on('all', () => {
    process.stdout.write('Change detected in the server directory. \nClearing module cache and restarting the server... ');

    // Only reload the modules in the server/ directory
    Object.keys(require.cache)
      .filter(id => id.startsWith(__dirname))
      .forEach((id) => {
        delete require.cache[id];
      });

    if (server && server.close) {
      server.close(() => {
        try {
          app = require('./server');
          server = app.listen(API_PORT);
          process.stdout.write('Done! \n');
        } catch (err) {
          process.stdout.write('Error! \n');
          console.error(err);
        }
      });
    } else {
      try {
        app = require('./server');
        server = app.listen(API_PORT);
        process.stdout.write('Done! \n');
      } catch (err) {
        process.stdout.write('Error! \n');
        console.error(err);
      }
    }
  });
});
