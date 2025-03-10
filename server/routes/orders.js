const express = require("express");
const router = express.Router();
const ordersController = require("../controller/order");

router.post("/create", ordersController.createOrder);
router.get("/exist/:cartId", ordersController.isExistByCartId);
router.put("/update/:orderId", ordersController.updateOrderStatus);
router.get("/:orderId", ordersController.getOrderByOrderId);
router.get("/all/:user_id", ordersController.findAllOrder);
router.delete("/delete/:orderId", ordersController.deleteOrder);
module.exports = router;