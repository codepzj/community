const superAdminService = require("../service/super_admin");
const { success, failOnServer } = require("../utils/wrap");
class SuperAdminController {
  // 创建超级管理员
  async createSuperAdmin(req, res) {
    const { username, password, role_id } = req.body;
    try {
      if (role_id !== 1 && role_id !== 2) {
        throw new Error("该用户不是超级管理员也不是社区管理员");
      }
      const superAdmin = await superAdminService.createSuperAdmin({
        username,
        password,
        role_id,
      });
      res.json(success("创建超级管理员成功", superAdmin));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  // 更新超级管理员
  async updateSuperAdmin(req, res) {
    const { id } = req.params;
    const { username, password, role_id } = req.body;
    try {
      if (role_id !== 1 && role_id !== 2) {
        throw new Error("该用户不是超级管理员也不是社区管理员");
      }
      const superAdmin = await superAdminService.updateSuperAdmin(id, {
        username,
        password,
        role_id,
      });
      res.json(success("更新超级管理员成功", superAdmin));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  // 删除超级管理员
  async deleteSuperAdmin(req, res) {
    const { id } = req.params;
    try {
      const superAdmin = await superAdminService.deleteSuperAdmin(id);
      res.json(success("删除超级管理员成功", superAdmin));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  // 获取所有管理员
  async findAllSuperAdmin(req, res) {
    try {
      const superAdmin = await superAdminService.findAllSuperAdmin();
      res.json(success("获取所有超级管理员成功", superAdmin));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  // 查找用户是否存在
  async findSuperAdminIsExist(req, res) {
    const { username, password } = req.body;
    try {
      const superAdmin = await superAdminService.findSuperAdminIsExist(
        username,
        password
      );
      if (superAdmin) {
        res.json(
          success("用户存在", { user: superAdmin, exist: true })
        );
      } else {
        res.json(success("用户不存在", { user: null, exist: false }));
      }
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}
module.exports = new SuperAdminController();
