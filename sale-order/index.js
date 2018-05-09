const express = require("express");
const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;

const routes = require('./routes');
const config = require('./hydra_properties').value;

const factory = new HydraServiceFactory(config);

const Brakes = require("brakes");

function promiseCall(req, res, next){
    return new Promise((resolve, reject) =>{
      if (res.statusCode == 200) {
          resolve(res);
      }
      else {
        reject();
      }
      next();
    });
  };

function fallbackCall(){
    return new Promise((resolve, reject) =>{
      resolve('Service not available!');
    });
  };

const brake = new Brakes(promiseCall, {
    statInterval: 2500,
    threshold: 0.5,
    circuitDuration: 15000,
    timeout: 250
    }
);

brake.fallback(fallbackCall);

function applyBrakes(req, res, next){
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

factory.init().then(factory => factory.getService(service => {
  router.get('/hystrix', (req, res) => {
    globalStats.getHystrixStream().pipe(res);
  });

  service.use('/v1/so/hystrix', router);
  service.use('/v1/so/api', applyBrakes);
  service.use('/v1/so/api', routes);
})).catch(e => console.log(e));
