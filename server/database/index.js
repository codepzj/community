const Sequelize = require("sequelize");

db = {};

// 数据库配置
const config = {
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "pzj20162116",
  database: "community",
  dialect: "mysql",
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config);

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

db.UserModel = require("../models/users")(sequelize, Sequelize.DataTypes);
db.RepairsModel = require("../models/repairs")(sequelize, Sequelize.DataTypes);
module.exports = db;
