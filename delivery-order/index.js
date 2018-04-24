const config = require('./properties').value;
const version = require('./package.json').version;
const hydraExpress = require('hydra-express');

const routes = require('./routes');

function registerRoutesCallback() {
  hydraExpress.registerRoutes({'/v1/delivery_order': routes});
}

function registerMiddlewareCallback() {
  let app = hydraExpress.getExpressApp();
  app.use((req, res, next) => {
    console.log('req.headers', req.headers);
    next();
  });
}

hydraExpress.init(config, version, registerRoutesCallback, registerMiddlewareCallback)
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);
  })
  .catch((err) => {
    console.log('err', err);
  });
