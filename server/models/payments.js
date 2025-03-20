const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resident_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    water_fee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    electricity_fee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    property_fee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.ENUM('pending','paid'),
      allowNull: true,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'payments',
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
        name: "resident_id",
        using: "BTREE",
        fields: [
          { name: "resident_id" },
        ]
      },
    ]
  });
};
