const os = require('os');
const path = require('path');

const ShipitDeploy = require('shipit-deploy');

module.exports = (shipit) => {
  ShipitDeploy(shipit);

  const workspace = path.resolve(os.tmpdir(), 'shipit');

  shipit.initConfig({
    default: {
      workspace,
      repositoryUrl: 'git@github.com:oamaok/basic-chat',
      key: `${process.env.HOME}/.ssh/id_rsa`,
      keepReleases: 2,
      shallowClone: true,
      ignores: [
        '/client',
        '/server',
        '/common',
        '/node_modules',
        '/*.js',
        '/*.md',
        '/.*',
        '/build.sh',
      ],
    },

    production: {
      deployTo: '/var/www/basic-chat',
      servers: 'teemu@bitti.io:20408',
      branch: 'master',
    },
  });

  shipit.blTask('install-modules', () =>
    shipit.local(
      'npm install',
      { cwd: shipit.config.workspace }
    )
  );

  shipit.blTask('build-package', () =>
    shipit.local(
      'npm run build',
      { cwd: shipit.config.workspace }
    ).then(() => shipit.local(
      `cp ${__dirname}/server/config/config.production.json ${workspace}/build/server/config/`,
      { cwd: shipit.config.workspace }
    ))
  );

  shipit.blTask('restart-api-server', () =>
    shipit.remote(`cd ${shipit.currentPath} && npm install --prod`)
      .then(() => shipit.remote('pm2 reload basic-chat'))
  );


  shipit.on('fetched', () => shipit.start([
    'install-modules',
    'build-package',
  ]));

  shipit.on('published', () =>
    shipit.start('restart-api-server')
  );
};
