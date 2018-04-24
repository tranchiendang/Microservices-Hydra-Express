const apiRoute = require("./api_invoice");

function init(app){
  app.use('/invoice', apiRoute);
}

module.exports = {
  init: init
}
