const { GoodsModel } = require("../database");

class GoodsService {
  async createGoods(goods) {
    try {
      const { name, price, description, image, type_id } = goods;
      return await GoodsModel.create({ name, price, description, image, type_id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getGoods() {
    try {
      const goods = await GoodsModel.findAll({
        order: [["createdAt", "DESC"]],
      });
      return goods;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getGoodsById(id) {
    try {
      const goods = await GoodsModel.findByPk(id);
      return goods;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateGoods(id, goods) {
    try {
      const { name, price, description, image } = goods;
      const [updated] = await GoodsModel.update({ name, price, description, image }, { where: { id } });
      return updated ? this.getGoodsById(id) : null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteGoods(id) {
    try {
      const deleted = await GoodsModel.destroy({ where: { id } });
      return deleted ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new GoodsService();
