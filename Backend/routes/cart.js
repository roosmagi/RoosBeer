const express = require('express');
const CartController = require('../controllers/cart');

const router = express.Router();

router.get('/carts/user/:userId', CartController.getCartByUser);
router.post('/carts', CartController.createCart);
router.post('/carts/:id/items', CartController.addItemToCart);
router.delete('/carts/:id/items/:itemId', CartController.removeItemFromCart);
router.put('/carts/:id/items/:itemId', CartController.updateItemQuantity);
router.put('/carts/:id', CartController.updateCart);

module.exports = router;
