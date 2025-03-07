var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _orders = require("./orders");
var _payments = require("./payments");
var _posts = require("./posts");
var _repairs = require("./repairs");
var _settings = require("./settings");
var _users = require("./users");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var repairs = _repairs(sequelize, DataTypes);
  var settings = _settings(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
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
    orders,
    payments,
    posts,
    repairs,
    settings,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
