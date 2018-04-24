const express = require("express");
const router = express.Router();

router.post('/create', function(req, res){
  console.log(res.body);
  res.json("Create invoice successfully!");
});

router.get('/:id', function(req, res){
  let id = req.params.id || 0;
  console.log(id);
  res.json("Get invoice with id= " + id);
});

module.exports = router;
