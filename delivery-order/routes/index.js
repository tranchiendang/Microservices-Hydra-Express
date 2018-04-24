const hydraExpress = require('hydra-express');
const express = hydraExpress.getExpress();
const router = express.Router();

const HTTP_OK = 200;

/**
* @description Create delivery order
* @param {function} route handler
*/
router.post('/create', function(req, res){
  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Create delivery order successfully!"
    }
  });
});

/**
* @description Get delivery order info
* @param {function} route handler
*/
router.get('/:id', function(req, res){
  let id = req.params.id || 0;
  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Get delivery order with id= " + id
    }
  });
});

module.exports = router;
