const { CartsModel } = require("../database/index");
const { nanoid } = require("nanoid");

class CartsService {
  async addCart(cartList) {
    try {
      // 生成购物车ID
      const cartId = nanoid(10);
      cartList.forEach((item) => {
        item.cart_id = cartId;
      });
      const cart = await CartsModel.bulkCreate(cartList);
      return cart;
    } catch (error) {
      throw new Error("添加购物车失败");
    }
  }

  async getCart(cartId) {
    try {
      const cart = await CartsModel.findAll({ where: { cart_id: cartId } });
      return cart;
    } catch (error) {
      throw new Error("获取购物车失败");
    }
  }
}

module.exports = new CartsService();
