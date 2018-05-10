const express = require("express");
const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;

const routes = require('./routes');
const config = require('./hydra_properties').value;

const factory = new HydraServiceFactory(config);

const Brakes = require("brakes");

function promiseCall(req, res, next){
    return new Promise((resolve, reject) =>{
      res.on('finish', () => {
        if (res.statusCode == 200) {
            resolve(res);
        }
        else {
          reject();
        }
      });

      next();
    });
  };

function fallbackCall(){
    return new Promise((resolve, reject) =>{
      resolve('Service not available!');
    });
  };

function applyBrakes(req, res, next){
  let commandPath = req.originalUrl;
  if (req.method === "GET"){
    let indexOfSplash = commandPath.lastIndexOf("/");
    if (indexOfSplash > 0) {
      commandPath = commandPath.substring(0, indexOfSplash);
    }
  }

  const brake = new Brakes(promiseCall, {
      name: commandPath,
      group: "api",
      statInterval: 2500,
      threshold: 0.5,
      circuitDuration: 15000,
      timeout: 250
      }
  );

  brake.fallback(fallbackCall);

  brake.exec(req, res, next)
      .then((result) =>{
        console.log(`result: ${result}`);
      })
      .catch(err =>{
        console.error(`error: ${err}`);
      });
};

const globalStats = Brakes.getGlobalStats();
const router = express.Router();

const CLSContext = require('zipkin-context-cls');
const {Tracer} = require('zipkin');
const {recorder} = require('./zipkin_recorder');

const ctxImpl = new CLSContext('zipkin');
const localServiceName = 'payment_service';
const tracer = new Tracer({ctxImpl, recorder, localServiceName});

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

factory.init().then(factory => factory.getService(service => {
  router.get('/hystrix', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream;charset=UTF-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

    globalStats.getHystrixStream().pipe(res);
  });

  service.use('/v1/pay/monitor', router);

  service.use(zipkinMiddleware({tracer}));
  service.use('/v1/pay/api', applyBrakes);
  service.use('/v1/pay/api', routes);
})).catch(e => console.log(e));
