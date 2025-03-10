const { OrdersModel } = require("../database/index");
const { nanoid } = require("nanoid");
class OrdersService {
  async createOrder(order) {
    try {
      order.order_id = nanoid();
      return await OrdersModel.create(order);
    } catch (error) {
      throw new Error(error);
    }
  }
  async isExistByCartId(cartId) {
    try {
      const order = await OrdersModel.findOne({ where: { cart_id: cartId } });
      return {
        exist: order ? true : false,
        order_id: order?.order_id,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllOrder(user_id) {
    try {
      return await OrdersModel.findAll({ where: { user_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      return await OrdersModel.update(
        { order_status: status },
        { where: { order_id: orderId } }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrderByOrderId(orderId) {
    try {
      return await OrdersModel.findOne({ where: { order_id: orderId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOrder(orderId) {
    try {
      return await OrdersModel.destroy({ where: { order_id: orderId } });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new OrdersService();
