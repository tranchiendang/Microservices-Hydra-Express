const hydraExpress = require('hydra-express');
const express = hydraExpress.getExpress();
const router = express.Router();

const HTTP_OK = 200;

/**
* @description Create Sale Order
* @param {function} route handler
*/
router.post('/create', function(req, res){
  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Create sale order successfully!"
    }
  });
});

/**
* @description Get Sale Order
* @param {function} route handler
*/
router.get('/:id', function(req, res){
  let id = req.params.id || 0;

  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Get sale order with id: " + id
    }
  });
});

module.exports = router;
