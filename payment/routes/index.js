const express = require("express");
const router = express.Router();

/**
* @description Create payment
* @param {function} route handler
*/
router.post('/create', function(req, res){
  res.json("Create payment successfully!");
});

/**
* @description Get payment info
* @param {function} route handler
*/
router.get('/get/:id', function(req, res){
  let id = req.params.id || 0;
  res.json("Get payment with id= " + id);
});

module.exports = router;
