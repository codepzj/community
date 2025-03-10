const express = require("express");
const router = express.Router();
const goodsController = require("../controller/goods");

router.get("/all", goodsController.getGoods);
router.get("/:id", goodsController.getGoodsById);
router.post("/create", goodsController.createGoods);

module.exports = router;
