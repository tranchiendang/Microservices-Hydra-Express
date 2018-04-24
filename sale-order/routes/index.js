const apiRoute = require("./api_order");

function init(app){
  app.use('/sale_order', apiRoute);
}

module.exports = {
  init: init
}
