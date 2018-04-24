const apiRoute = require("./api_delivery_order");

function init(app){
  app.use('/delivery_order', apiRoute);
}

module.exports = {
  init: init
}
