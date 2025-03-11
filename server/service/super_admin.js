const { SuperAdminModel } = require("../database");

class SuperAdminService {
  // 创建超级管理员
  async createSuperAdmin(superAdmin) {
    try {
      return await SuperAdminModel.create(superAdmin);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // 更新超级管理员
  async updateSuperAdmin(id, superAdmin) {
    try {
      return await SuperAdminModel.update(superAdmin, { where: { id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // 删除超级管理员
  async deleteSuperAdmin(id) {
    try {
      return await SuperAdminModel.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // 获取所有超级管理员
  async findAllSuperAdmin() {
    try {
      return await SuperAdminModel.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //查找用户是否存在
  async findSuperAdminIsExist(username, password) {
    try {
      return await SuperAdminModel.findOne({ where: { username, password } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SuperAdminService();
