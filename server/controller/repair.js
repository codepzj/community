const repairService = require("../service/repair");
const { success, failOnServer } = require("../utils/wrap");

class RepairController {
  async createRepair(req, res) {
    const repair = req.body;
    console.log(repair);
    try {
      const newRepair = await repairService.createRepair(repair);
      console.log(newRepair);
      res.json(success("创建申报成功", newRepair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async findAllRepairByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const repair = await repairService.findAllRepairByUserId(user_id);
      res.json(success("获取所有申报成功", repair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async updateRepair(req, res) {
    const repair = req.body;
    try {
      const updatedRepair = await repairService.updateRepair(repair);
      res.json(success("更新申报成功", updatedRepair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async getRepairByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const repair = await repairService.findRepairByUserId(user_id);
      res.json(success("获取申报成功", repair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async getRepairPendingByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const repair = await repairService.findRepairPendingByUserId(user_id);
      res.json(success("获取待审核申报成功", repair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async deleteRepairById(req, res) {
    const { id } = req.params;
    try {
      const deleted = await repairService.deleteRepairById(id);
      if (deleted) {
        res.json(success("删除申报成功"));
      } else {
        res.json(failOnServer("删除申报失败"));
      }
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async updateRepairStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedRepair = await repairService.updateRepairStatus(id, status);
      res.json(success("更新申报状态成功", updatedRepair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  // 获取待审核
  async getRepairPending(req, res) {
    try {
      const repair = await repairService.findRepairPending();
      res.json(success("获取待审核申报成功", repair));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new RepairController();
