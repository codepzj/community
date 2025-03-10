const ordersService = require("../service/orders");
const { success, failOnServer } = require("../utils/wrap");

class OrdersController {
  async createOrder(req, res) {
    try {
      const order = req.body;
      const newOrder = await ordersService.createOrder(order);
      res.json(success("创建订单成功", newOrder));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async findAllOrder(req, res) {
    try {
      const { user_id } = req.params;
      const order = await ordersService.findAllOrder(user_id);
      res.json(success("获取所有订单成功", order));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async isExistByCartId(req, res) {
    try {
      const { cartId } = req.params;
      const isExist = await ordersService.isExistByCartId(cartId);
      res.json(success("查询订单是否存在", isExist));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  // 更新订单状态
  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const updatedOrder = await ordersService.updateOrderStatus(
        orderId,
        "paid"
      );
      res.json(success("更新订单状态成功", updatedOrder));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async getOrderByOrderId(req, res) {
    try {
      const { orderId } = req.params;
      const order = await ordersService.getOrderByOrderId(orderId);
      res.json(success("查询订单成功", order));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  // 删除订单
  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      const order = await ordersService.deleteOrder(orderId);
      res.json(success("删除订单成功", order));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new OrdersController();
