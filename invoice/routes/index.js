const express = require("express");
const router = express.Router();

/**
* @description Create invoice
* @param {function} route handler
*/
router.post('/create', function(req, res){
  res.json({message: "Create invoice successfully!"});
});

/**
* @description Get invoice info
* @param {function} route handler
*/
router.get('/get/:id', function(req, res){
  let id = req.params.id || 0;
  res.json({message: "Get invoice with id= " + id});
});

module.exports = router;
