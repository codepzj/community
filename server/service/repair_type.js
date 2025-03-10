const { RepairTypeModel } = require("../database/index");

class RepairTypeService {
  async createRepairType(repairType) {
    return await RepairTypeModel.create(repairType);
  }

  async getAllRepairType() {
    return await RepairTypeModel.findAll({
      order: [["createdAt", "ASC"]],
    });
  }
}

module.exports = new RepairTypeService();
