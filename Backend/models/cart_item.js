const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_at_order: {
      type: DataTypes.REAL,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.REAL,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATETIME,
      allowNull: false
    }
  }, {
    tableName: 'cart_item',
    timestamps: false
  });

module.exports = CartItem;
