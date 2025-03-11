const express = require("express");
const router = express.Router();
const goodsController = require("../controller/goods");

router.get("/all", goodsController.getGoods);
router.get("/:id", goodsController.getGoodsById);

module.exports = router;
