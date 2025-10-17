const express = require('express');
const CartController = require('../controllers/cart');

const router = express.Router();

router.get('/', CartController.getAllCarts);
router.get('/:id', CartController.getCartById);
router.post('/', CartController.createCart);
router.post('/:id/items', CartController.addItemToCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);
router.delete('/:id/items/:itemId', CartController.removeItemFromCart);

module.exports = router;
