const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    repair_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'repairs',
        key: 'id'
      }
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carts',
        key: 'id'
      }
    },
    order_type: {
      type: DataTypes.ENUM('repair','goods','repair_goods'),
      allowNull: false
    },
    order_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    order_status: {
      type: DataTypes.ENUM('pending','paid','completed','cancelled'),
      allowNull: true,
      defaultValue: "pending"
    },
    order_payment_method: {
      type: DataTypes.ENUM('cash','wechat','alipay','card'),
      allowNull: true
    },
    order_payment_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_completed_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "repair_id",
        using: "BTREE",
        fields: [
          { name: "repair_id" },
        ]
      },
      {
        name: "cart_id",
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  });
};
