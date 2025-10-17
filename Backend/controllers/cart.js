const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Beer = require('../models/beer');

class CartController {
  static async getAllCarts(req, res) {
    try {
      const carts = await Cart.findAll({ include: [CartItem] });
      res.status(200).json(carts);
    } catch (error) {
      console.error('Error fetching carts:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getCartById(req, res) {
    try {
      const cart = await Cart.findByPk(req.params.id, { include: [CartItem] });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createCart(req, res) {
    try {
      const cart = await Cart.create(req.body);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateCart(req, res) {
    try {
      const cart = await Cart.findByPk(req.params.id);
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      await cart.update(req.body);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteCart(req, res) {
    try {
      const cart = await Cart.findByPk(req.params.id);
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      await cart.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addItemToCart(req, res) {
    try {
      const { id } = req.params;
      const { beerId, quantity } = req.body;
      const cart = await Cart.findByPk(id);
      if (!cart) return res.status(404).json({ message: 'Cart not found' });

      const beer = await Beer.findByPk(beerId);
      if (!beer) return res.status(404).json({ message: 'Beer not found' });

      const item = await CartItem.create({ cartId: id, beerId, quantity });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeItemFromCart(req, res) {
    try {
      const { id, itemId } = req.params;
      const item = await CartItem.findOne({ where: { id: itemId, cartId: id } });
      if (!item) return res.status(404).json({ message: 'Item not found in cart' });
      await item.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CartController;
