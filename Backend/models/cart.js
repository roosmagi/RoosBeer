const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/db');
const CartItem = require('./cart_item'); 
const Beer = require('./beer');

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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    total_amount: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'cart',
    timestamps: false
  });

// Assotsiatsioonid
Cart.hasMany(CartItem, { as: 'items', foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Beer, { foreignKey: 'beer_id' });
Beer.hasMany(CartItem, { foreignKey: 'beer_id' });

module.exports = Cart;
