const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Beer = require('../models/beer');

class CartController {

  // GET /carts
  static async getAllCarts(req, res) {
    try {
      const carts = await Cart.findAll({
        include: [
          {
            model: CartItem,
            as: "items",
            include: [{ model: Beer }]
          }
        ]
      });

      res.status(200).json(carts);
    } catch (error) {
      console.error('Error fetching carts:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // GET /carts/user/:userId
  static async getCartByUser(req, res) {
    try {
      const cart = await Cart.findOne({
        where: { user_id: req.params.userId },
        include: [
          {
            model: CartItem,
            as: "items",
            include: [{ model: Beer }]
          }
        ]
      });

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET /carts/:id
  static async getCartById(req, res) {
    try {
      const cart = await Cart.findByPk(req.params.id, {
        include: [
          {
            model: CartItem,
            as: "items",
            include: [Beer]
          }
        ]
      });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // POST /carts
  static async createCart(req, res) {
    try {
      const cart = await Cart.create({
        user_id: req.body.user_id,
        status: req.body.status || "open"
      });

      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // POST /carts/:id/items
  static async addItemToCart(req, res) {
    try {
      const { id } = req.params; // cart_id
      const { beer_id, quantity } = req.body;

      const cart = await Cart.findByPk(id);
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const beer = await Beer.findByPk(beer_id);
      if (!beer) return res.status(404).json({ message: "Beer not found" });

      const item = await CartItem.create({
        cart_id: id,
        beer_id,
        quantity
      });

      res.status(201).json(item);
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({ message: error.message });
    }
  }

  // DELETE /carts/:id/items/:itemId
  static async removeItemFromCart(req, res) {
    try {
      const { id, itemId } = req.params;

      const item = await CartItem.findOne({
        where: { id: itemId, cart_id: id }
      });

      if (!item) return res.status(404).json({ message: "Item not found in cart" });

      await item.destroy();
      res.status(204).end();

    } catch (error) {
      console.error('Error removing item:', error);
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
}

module.exports = CartController;
