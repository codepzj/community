var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _goods = require("./goods");
var _orders = require("./orders");
var _payments = require("./payments");
var _posts = require("./posts");
var _repair_type = require("./repair_type");
var _repairs = require("./repairs");
var _settings = require("./settings");
var _users = require("./users");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var goods = _goods(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var repair_type = _repair_type(sequelize, DataTypes);
  var repairs = _repairs(sequelize, DataTypes);
  var settings = _settings(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  goods.belongsTo(repair_type, { as: "type", foreignKey: "type_id"});
  repair_type.hasMany(goods, { as: "goods", foreignKey: "type_id"});
  repairs.belongsTo(repair_type, { as: "type", foreignKey: "type_id"});
  repair_type.hasMany(repairs, { as: "repairs", foreignKey: "type_id"});
  orders.belongsTo(repairs, { as: "repair", foreignKey: "repair_id"});
  repairs.hasMany(orders, { as: "orders", foreignKey: "repair_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  payments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(payments, { as: "payments", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  repairs.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(repairs, { as: "repairs", foreignKey: "user_id"});
  repairs.belongsTo(users, { as: "assigned_worker_user", foreignKey: "assigned_worker"});
  users.hasMany(repairs, { as: "assigned_worker_repairs", foreignKey: "assigned_worker"});

  return {
    comments,
    goods,
    orders,
    payments,
    posts,
    repair_type,
    repairs,
    settings,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
