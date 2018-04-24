const hydraExpress = require('hydra-express');
const express = hydraExpress.getExpress();
const router = express.Router();

const HTTP_OK = 200;

/**
* @description Create invoice
* @param {function} route handler
*/
router.post('/create', function(req, res){
  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Create invoice successfully!"
    }
  });
});

/**
* @description Get invoice info
* @param {function} route handler
*/
router.get('/:id', function(req, res){
  let id = req.params.id || 0;
  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Get invoice with id= " + id
    }
  });
});

module.exports = router;
