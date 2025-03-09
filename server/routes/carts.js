const router = require("express").Router();
const CartsController = require("../controller/carts");

router.post("/add", CartsController.addCart); // 添加购物车
router.get("/get/:cartId", CartsController.getCart); // 获取购物车
module.exports = router;
