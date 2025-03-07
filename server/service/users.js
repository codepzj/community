const { UserModel } = require("../database/index");
const Sequelize = require("sequelize");

class UserService {
  async createUser(user) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new Error("用户名已存在");
      }
      throw new Error(error.message);
    }
  }

  async findUserIsExist({ username, password }) {
    try {
      const user = await UserModel.findOne({ where: { username, password } });
      if (!user) throw new Error("用户不存在");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUserById(id) {
    try {
      return await UserModel.findByPk(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser({ id, email, avatar, phone, address }) {
    try {
      const [updated] = await UserModel.update(
        { email, avatar, phone, address },
        { where: { id } }
      );
      if (!updated) throw new Error("更新失败");
      const user = await this.findUserById(id);
      if (!user) throw new Error("用户不存在,更新失败");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();
