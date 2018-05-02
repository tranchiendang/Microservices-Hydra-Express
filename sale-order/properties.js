/*
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
*/

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
    //serviceIP: local_ip,
    serviceIP: "",
    servicePort: 3000,
    serviceType: 'order',
    redis: {
      "url": process.env.REDIS_PORT_6379_TCP_ADDR
    }
  }
}

exports.value = result;
