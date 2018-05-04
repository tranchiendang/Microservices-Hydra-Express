const config = require('./properties').value;
const version = require('./package.json').version;
const hydraExpress = require('hydra-express');
const Hystrix = require("hystrixjs");
const Hoek = require('hoek');

const {Tracer, ExplicitContext, BatchRecorder, jsonEncoder: {JSON_V2}} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

const ctxImpl = new ExplicitContext();
const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: process.env.ZIPKIN_URL,
    jsonEncoder: JSON_V2
  })
});
const localServiceName = 'service-invoice'; // name of this application
const tracer = new Tracer({ctxImpl, recorder, localServiceName});

const routes = require('./routes');
const commandFactory = Hystrix.commandFactory;

function defaultRunCommand(command, req, res, next) {
    return new Promise((resolve, reject) => {
        const handleResponseStatus = Hoek.once(function handleResponseStatus() {
            if (config.commandStatusResolver) {
                // hook to custom command status resolver
                return config.commandStatusResolver(req, res)
                .then(resolve)
                .catch(reject);
            }
            resolve();
        });

        res.once('finish', handleResponseStatus);
        res.once('close', handleResponseStatus);
        next();
    });
}

function registerRoutesCallback() {
  hydraExpress.registerRoutes({'/v1/invoice': routes});
  hydraExpress.registerRoutes({'/v1/hystrix_inv': routes});
}

function registerMiddlewareCallback() {
  let app = hydraExpress.getExpressApp();

  app.use((req, res, next) => {
    console.log(req.headers);
    next();
  });

  app.use(zipkinMiddleware({tracer}));

  app.use('/v1/invoice', (req, res, next) => {
    let commandPath = req.originalUrl;
    if (req.method === "GET"){
      let indexOfSplash = commandPath.lastIndexOf("/");
      if (indexOfSplash > 0) {
        commandPath = commandPath.substring(0, indexOfSplash);
      }
    }

    const commandBuilder = commandFactory.getOrCreate(commandPath).run(defaultRunCommand);
    commandBuilder
          .circuitBreakerErrorThresholdPercentage(50)
          .timeout(20)
          .circuitBreakerRequestVolumeThreshold(20)
          .circuitBreakerSleepWindowInMilliseconds(5000)
          .statisticalWindowLength(10000)
          .statisticalWindowNumberOfBuckets(10)
          .build()
          .execute(commandPath, req, res, next)
          .catch(err => {
              console.log(err);
          });
  });

  app.use('/v1/hystrix_inv', (req, res, next) => {
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
