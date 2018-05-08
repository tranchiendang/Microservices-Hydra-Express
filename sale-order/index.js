const express = require("express");
const bodyParser = require("body-parser");
const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;

const routes = require('./routes');
const config = require('./hydra_properties').value;

const factory = new HydraServiceFactory(config);

factory.init().then(factory => factory.getService(service => {
  console.log("Sale order service is now listening at port " + config.hydra.servicePort);
  service.use('/v1/so', routes);
}));
