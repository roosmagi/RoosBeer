const Cart = require('./cart');
const CartItem = require('./cart_item');
const Beer = require('./beer');

// CART → CART ITEMS
Cart.hasMany(CartItem, { as: 'cart_items', foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// BEER → CART ITEMS
Beer.hasMany(CartItem, { as: 'cart_items', foreignKey: 'beer_id' });
CartItem.belongsTo(Beer, { as: 'beer', foreignKey: 'beer_id' });

module.exports = { Cart, CartItem, Beer };
