const userService = require("../service/users");
const { success, failOnServer } = require("../utils/wrap");

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
      res.json(failOnServer(error.message));
    }
  }

  async findUserIsExist(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userService.findUserIsExist({ username, password });
      res.json(success("查询用户成功", user));
    } catch (error) {
      res.json(failOnServer(error.message));
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
      res.json(failOnServer(error.message));
    }
  }

  async UploadUserAvatar(req, res) {
    if (!req.file) {
      return res.json(failOnClient("未上传文件"));
    }
    const data = {
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`,
    };
    res.json(success("上传成功", data));
  }

  async findAllUsers(req, res) {
    try {
      const users = await userService.findAllUsers();
      res.json(success("查询所有用户成功", users));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new UserController();
