const userService = require("../service/users");
const { success, fail } = require("../utils/wrap");
class UserController {
  async createUser(req, res) {
    const { username, password, email, avatar, phone, address } = req.body;
    console.log(req.body);
    try {
      const user = await userService.createUser({
        username,
        password,
        email,
        avatar,
        phone,
        address,
      });
      res.json(success("创建用户成功", user));
    } catch (error) {
      res.status(500).json(fail(error.message));
    }
  }

  async findUserIsExist(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userService.findUserIsExist({ username, password });
      res.json(success("查询用户成功", user));
    } catch (error) {
      res.json(fail(error.message));
    }
  }

  async updateUser(req, res) {
    const { id, email, avatar, phone, address } = req.body;
    try {
      const user = await userService.updateUser({
        id,
        email,
        avatar,
        phone,
        address,
      });
      res.json(success("更新用户成功", user));
    } catch (error) {
      res.json(fail(error.message));
    }
  }

  async UploadUserAvatar(req, res) {
    const { id } = req.body;
    console.log(req);

  }
}

module.exports = new UserController();
