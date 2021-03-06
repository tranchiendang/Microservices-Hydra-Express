const express = require("express");
const router = express.Router();

/**
* @description Create delivery order
* @param {function} route handler
*/
router.post('/create', function(req, res){
  res.json({message: "Create delivery order successfully!"});
});

/**
* @description Get delivery order info
* @param {function} route handler
*/
router.get('/get/:id', function(req, res){
  let id = req.params.id || 0;
  res.json({message: "Get delivery order with id= " + id});
});

module.exports = router;
