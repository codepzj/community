var DataTypes = require("sequelize").DataTypes;
var _announcements = require("./announcements");
var _carts = require("./carts");
var _goods = require("./goods");
var _orders = require("./orders");
var _payments = require("./payments");
var _posts = require("./posts");
var _repair_type = require("./repair_type");
var _repairs = require("./repairs");
var _super_admin = require("./super_admin");
var _users = require("./users");

function initModels(sequelize) {
  var announcements = _announcements(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var goods = _goods(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var repair_type = _repair_type(sequelize, DataTypes);
  var repairs = _repairs(sequelize, DataTypes);
  var super_admin = _super_admin(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  carts.belongsTo(goods, { as: "good", foreignKey: "goods_id"});
  goods.hasMany(carts, { as: "carts", foreignKey: "goods_id"});
  posts.belongsTo(posts, { as: "reply", foreignKey: "reply_id"});
  posts.hasMany(posts, { as: "posts", foreignKey: "reply_id"});
  goods.belongsTo(repair_type, { as: "type", foreignKey: "type_id"});
  repair_type.hasMany(goods, { as: "goods", foreignKey: "type_id"});
  repairs.belongsTo(repair_type, { as: "type", foreignKey: "type_id"});
  repair_type.hasMany(repairs, { as: "repairs", foreignKey: "type_id"});
  carts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  payments.belongsTo(users, { as: "resident", foreignKey: "resident_id"});
  users.hasMany(payments, { as: "payments", foreignKey: "resident_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  repairs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(repairs, { as: "repairs", foreignKey: "user_id"});
  repairs.belongsTo(users, { as: "assigned_worker_user", foreignKey: "assigned_worker"});
  users.hasMany(repairs, { as: "assigned_worker_repairs", foreignKey: "assigned_worker"});

  return {
    announcements,
    carts,
    goods,
    orders,
    payments,
    posts,
    repair_type,
    repairs,
    super_admin,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
