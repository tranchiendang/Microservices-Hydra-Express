const localIP = require('local-ip');
const default_iface = 'eth0'
const destination_iface = 'eth1';
let local_ip = "";

try {
  local_ip = localIP(destination_iface);
} catch (err) {
  // exception, fallback to eth0 interface
  local_ip = localIP(default_iface);
}

let result = {
  cluster: false,
  maxSockets: 500,
  environment: 'development',
  logPath: '',
  logRequestHeader: true,
  logOutboundRequest: true,
  hydra: {
    serviceName: 'sale-order-service',
    serviceDescription: 'Sale Order Service',
    serviceIP: local_ip,
    servicePort: 0,
    serviceType: 'order',
    redis: {
      "url": "172.28.128.5",
      "port": 6379,
      "db": 15
    }
  }
}

exports.value = result;
