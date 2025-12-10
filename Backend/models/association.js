const Cart = require('./cart');
const CartItem = require('./cart_item');
const Beer = require('./beer');

// CART → CART ITEMS
Cart.hasMany(CartItem, { as: 'items', foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// BEER → CART ITEMS
Beer.hasMany(CartItem, { foreignKey: 'beerId' });
CartItem.belongsTo(Beer, { foreignKey: 'beerId' });

module.exports = { Cart, CartItem, Beer };
