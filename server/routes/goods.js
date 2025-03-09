const express = require("express");
const router = express.Router();
const goodsController = require("../controller/goods");

router.post("/create", goodsController.createGoods);
router.get("/all", goodsController.getGoods);

module.exports = router;
