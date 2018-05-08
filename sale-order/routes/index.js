const express = require("express");
const router = express.Router();

/**
* @description Create sale order
* @param {function} route handler
*/
router.post('/create', function(req, res){
  res.send("Create sale order successfully!");
});

/**
* @description Get sale order info
* @param {function} route handler
*/
router.get('/get/:id', function(req, res){
  let id = req.params.id || 0;
  res.send("Get sale order with id= " + id);
});

module.exports = router;
