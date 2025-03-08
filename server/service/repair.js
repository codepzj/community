const { RepairsModel } = require("../database/index");

class RepairService {
  async createRepair(repair) {
    const { status, ...rest } = repair;
    // 更新报修表状态为待支付
    const formattedRepair = {
      ...rest,
      status: "in_pay",
    };
    try {
      return await RepairsModel.create(formattedRepair);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 更新保修表信息
  async updateRepair(repair) {
    try {
      const [updated] = await RepairsModel.update(repair, {
        where: { id: repair.id },
      });
      if (updated === 0) {
        throw new Error("更新失败");
      }
      return await this.findRepairById(repair.id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 根据id查询报修信息
  async findRepairById(id) {
    try {
      return await RepairsModel.findByPk(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // 根据用户id查询所有报修信息
  async findRepairByUserId(user_id) {
    try {
      return await RepairsModel.findAll({ where: { user_id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 根据用户id查询所有待支付报修信息
  async findRepairInPayByUserId(user_id) {
    try {
      return await RepairsModel.findAll({
        where: { user_id, status: "in_pay" },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new RepairService();
