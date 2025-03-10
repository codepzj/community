const userService = require("../service/users");
const { success, failOnServer } = require("../utils/wrap");

class AdminUserController {
  async findAllUsers(req, res) {
    try {
      const users = await userService.findAllUsers();
      res.json(success("查询所有用户成功", users));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.body);
      res.json(success("更新用户成功", user));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async deleteUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUserById(id);
      res.json(success("删除用户成功", user));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new AdminUserController();
