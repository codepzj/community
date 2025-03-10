const repairTypeService = require("../service/repair_type");
const { success, failOnServer } = require("../utils/wrap");
class RepairTypeController {
  async createRepairType(req, res) {
    try {
      const repairType = await repairTypeService.createRepairType(req.body);
      res.json(success("创建报修类型成功", repairType));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async getAllRepairType(req, res) {
    try {
      const repairType = await repairTypeService.getAllRepairType();
      res.json(success("获取所有报修类型成功", repairType));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async updateRepairType(req, res) {
    try {
      const repairType = await repairTypeService.updateRepairType(req.params.id, req.body);
      res.json(success("更新报修类型成功", repairType));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async deleteRepairType(req, res) {
    try {
      const repairType = await repairTypeService.deleteRepairType(req.params.id);
      res.json(success("删除报修类型成功", repairType));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new RepairTypeController();