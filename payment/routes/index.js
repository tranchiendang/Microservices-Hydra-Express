const apiRoute = require("./api_payment");

function init(app){
  app.use('/payment', apiRoute);
}

module.exports = {
  init: init
}
