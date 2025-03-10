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

  async updateRepairType(id, repairType) {
    return await RepairTypeModel.update(repairType, {
      where: { id },
    });
  }

  async deleteRepairType(id) {
    return await RepairTypeModel.destroy({
      where: { id },
    });
  }
  
}

module.exports = new RepairTypeService();
