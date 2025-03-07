var express = require('express');
var router = express.Router();

router.all("/", function (req, res, next) {
  res.json({ message: "Hello World" });
});


module.exports = router;
