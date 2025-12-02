const { DataTypes, Sequelize } = require('sequelize');
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
    beer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'cart_item',
    timestamps: false
  });

module.exports = CartItem;
