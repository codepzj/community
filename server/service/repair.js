const { RepairsModel } = require("../database/index");

class RepairService {
  async createRepair(repair) {
    const { status, ...rest } = repair;
    // 更新报修表状态为待审核
    const formattedRepair = {
      ...rest,
      status: "pending",
    };
    try {
      return await RepairsModel.create(formattedRepair);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 获取待审核
  async findRepairPending() {
    try {
      return await RepairsModel.findAll({ where: { status: "pending" } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // 获取所有申报
  async findAllRepairByUserId(user_id) {
    try {
      return await RepairsModel.findAll({ where: { user_id } });
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
      return await RepairsModel.findAll({
        where: { user_id },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 根据用户id查询所有待审核报修信息
  async findRepairPendingByUserId(user_id) {
    try {
      return await RepairsModel.findAll({
        where: { user_id, status: "pending" },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 根据id删除报修信息
  async deleteRepairById(id) {
    try {
      const deleted = await RepairsModel.destroy({ where: { id } });
      return deleted ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 更新保修状态
  async updateRepairStatus(id, status) {
    try {
      return await RepairsModel.update({ status }, { where: { id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new RepairService();
