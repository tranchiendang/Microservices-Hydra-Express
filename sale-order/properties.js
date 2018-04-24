exports.value = {
  cluster: false,
  maxSockets: 500,
  environment: 'development',
  logPath: '',
  logRequestHeader: true,
  logOutboundRequest: true,
  hydra: {
    serviceName: 'sale-order-service',
    serviceDescription: 'Sale Order Service',
    serviceIP: '172.28.128.6',
    servicePort: 0,
    serviceType: 'order',
    redis: {
      "url": "172.28.128.5",
      "port": 6379,
      "db": 15
    }
  }
};
