const CartsService = require("../service/carts");
const { success, failOnServer } = require("../utils/wrap");

class CartsController {
  async addCart(req, res) {
    try {
      const { cartList } = req.body;
      const cart = await CartsService.addCart(cartList);
      res.json(success("添加购物车成功", cart));
    } catch (error) {
      res.json(error);
    }
  }

  async getCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await CartsService.getCart(cartId);
      res.json(success("获取购物车成功", cart));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new CartsController();
