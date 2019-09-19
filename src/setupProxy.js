const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/user',
    proxy({
      target: 'https://data.detroitledger.org',
      secure: false,
    }),
  );

  app.use(
    '/services',
    proxy({
      target: 'https://data.detroitledger.org',
      secure: false,
    }),
  );

  app.use(
    '/api',
    proxy({
      target: 'https://data.detroitledger.org',
      secure: false,
    }),
  );

  app.use(
    '/node/add',
    proxy({
      target: 'https://data.detroitledger.org',
      secure: false,
    }),
  );

  app.use(
    '/index.php',
    proxy({
      target: 'https://data.detroitledger.org',
      secure: false,
    }),
  );

  app.use(
    '/index.php',
    proxy({
      target: 'https://data.detroitledger.org',
      secure: false,
      pathRewrite: {
        '^/grantentrypdfs': '/sites/default/files/grantentrypdfs',
      },
    }),
  );
};
