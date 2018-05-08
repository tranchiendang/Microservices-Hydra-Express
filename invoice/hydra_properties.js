const config = {
  hydra : {
    'serviceName': 'invoice-service',
    'serviceDescription': 'Invoice Service',
    'serviceIP': '',
    'servicePort': 3000,
    'serviceType': 'express',
    'serviceVersion': '1.0.0',
    'redis': {
      "url": process.env.REDIS_PORT_6379_TCP_ADDR
    }
}};

exports.value = config;
