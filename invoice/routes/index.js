const express = require("express");
const router = express.Router();

/**
* @description Create invoice
* @param {function} route handler
*/
router.post('/create', function(req, res){
  res.send("Create invoice successfully!");
});

/**
* @description Get invoice info
* @param {function} route handler
*/
router.get('/get/:id', function(req, res){
  let id = req.params.id || 0;
  res.send("Get invoice with id= " + id);
});

module.exports = router;
