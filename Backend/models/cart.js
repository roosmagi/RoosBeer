const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATETIME,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cart',
    timestamps: false
  });

module.exports = Cart;
