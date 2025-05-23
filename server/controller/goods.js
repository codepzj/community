const goodsService = require("../service/goods");
const { success, failOnServer } = require("../utils/wrap");
class GoodsController {
  async createGoods(req, res) {
    try {
      const goods = await goodsService.createGoods(req.body);
      res.json(success("创建商品成功", goods));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async getGoods(req, res) {
    try {
      const goods = await goodsService.getGoods();
      res.json(success("获取商品成功", goods));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async getGoodsById(req, res) {
    try {
      const goods = await goodsService.getGoodsById(req.params.id);
      res.json(success("获取商品成功", goods));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async updateGoods(req, res) {
    try {
      const goods = await goodsService.updateGoods(req.params.id, req.body);
      res.json(success("更新商品成功", goods));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async deleteGoods(req, res) {
    try {
      const goods = await goodsService.deleteGoods(req.params.id);
      res.json(success("删除商品成功", goods));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new GoodsController();