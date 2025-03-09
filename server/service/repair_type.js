const { RepairTypeModel } = require("../database/index");

class RepairTypeService {
  async createRepairType(repairType) {
    return await RepairTypeModel.create(repairType);
  }

  async getAllRepairType() {
    return await RepairTypeModel.findAll();
  }
}

module.exports = new RepairTypeService();
