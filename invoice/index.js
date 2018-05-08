const express = require("express");
const HydraServiceFactory = require('hydra-integration').HydraServiceFactory;

const routes = require('./routes');
const config = require('./hydra_properties').value;

const factory = new HydraServiceFactory(config);

factory.init().then(factory => factory.getService(service => {
  service.use('/v1/inv', routes);
})).catch(e => console.log(e));
