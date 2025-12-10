import axios from "axios";

const API_URL = 'http://localhost:3002';
const token = () => localStorage.getItem('token');

// 🔹 Võta kasutaja cart (avatud) või null
export const getCartByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/carts/user/${userId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return response.data;
};

// 🔹 Loo uus cart
export const createCart = async (cartData) => {
  const response = await axios.post(`${API_URL}/carts`, cartData, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return response.data;
};

// 🔹 Lisa item carti
export const addItemToCart = async (cartId, itemData) => {
  // itemData peab olema { beer_id, quantity }
  const response = await axios.post(`${API_URL}/carts/${cartId}/items`, itemData, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return response.data;
};

// 🔹 Kustuta item cartist
export const removeItemFromCart = async (cartId, itemId) => {
  await axios.delete(`${API_URL}/carts/${cartId}/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};
