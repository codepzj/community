var express = require('express');
var router = express.Router();

router.all("/", function (req, res, next) {
  res.json({ message: "欢迎来到社区管理系统" });
});


module.exports = router;
