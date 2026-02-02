import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartByUser, removeItemFromCart, updateItemQuantity, closeCart, createCart } from '../api/cart.js';
import './Cart.css';
import { jwtDecode } from 'jwt-decode';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        
        const cartData = await getCartByUser(userId);
        setCart(cartData);
        setError(null);
      } catch (err) {
        setError('Failed to load cart');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token, navigate]);

  const handleRemoveItem = async (itemId) => {
    if (!cart) return;
    
    try {
      await removeItemFromCart(cart.id, itemId);
      setCart({
        ...cart,
        cart_items: cart.cart_items.filter(item => item.id !== itemId)
      });
    } catch (err) {
      setError('Failed to remove item');
      console.error(err);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (!cart || newQuantity < 1) return;

    try {
      await updateItemQuantity(cart.id, itemId, newQuantity);
      setCart({
        ...cart,
        cart_items: cart.cart_items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      });
    } catch (err) {
      setError('Failed to update quantity');
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    if (!cart) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      await closeCart(cart.id);
      await createCart({ user_id: userId, status: 'open' });
      setOrderSuccess(true);

      setTimeout(async () => {
        setOrderSuccess(false);
        const newCart = await getCartByUser(userId);
        setCart(newCart);
      }, 3000);
    } catch (err) {
      setError('Failed to complete checkout');
      console.error(err);
    }
  };

  if (!token) {
    return <div className="cart-container"><p>Please login to view your cart</p></div>;
  }

  if (loading) {
    return <div className="cart-container"><p>Loading cart...</p></div>;
  }

  if (error) {
    return <div className="cart-container"><p className="error">{error}</p></div>;
  }

  if (orderSuccess) {
    return (
      <div className="cart-container">
        <div className="success-message">
          <h1>Thank you for buying!</h1>
          <p>Your order is on its way</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  const total = cart?.cart_items?.reduce((sum, item) => {
    const itemPrice = parseFloat(item.beer?.price) || 0;
    const itemQty = parseInt(item.quantity) || 0;
    const itemTotal = itemPrice * itemQty;
    console.log(`${item.beer?.name}: $${itemPrice} x ${itemQty} = $${itemTotal}`);
    return sum + itemTotal;
  }, 0) || 0;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      
      <div className="cart-items">
        {cart.cart_items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={`http://localhost:3002/uploads/${item.beer?.image}`} alt={item.beer?.name} />
            </div>

            <div className="item-info">
              <h3>{item.beer?.name}</h3>
              <p className="item-price">{item.beer?.price}€</p>
            </div>

            <div className="quantity-control">
              <button 
                className="qty-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <input 
                type="number" 
                className="qty-input"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                min="1"
              />
              <button 
                className="qty-btn"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="item-total">
              <p className="total-price">{(item.beer?.price * item.quantity).toFixed(2)}€</p>
            </div>

            <button 
              className="btn btn-danger"
              onClick={() => handleRemoveItem(item.id)}
              title="Remove item"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total-divider"></div>

      <div className="cart-total-section">
        <h2>Total : {total.toFixed(2)}€</h2>
      </div>

      <div className="cart-checkout">
        <button className="btn btn-primary btn-checkout" onClick={handleCheckout}>Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
