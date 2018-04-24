const express = require("express");
const router = express.Router();

router.post('/create', function(req, res){
  console.log(res.body);
  res.json("Create payment successfully!");
});

router.get('/:id', function(req, res){
  let id = req.params.id || 0;
  console.log(id);
  res.json("Get payment with id= " + id);
});

module.exports = router;
