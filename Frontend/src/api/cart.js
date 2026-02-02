import axios from "axios";

const API_URL = 'http://localhost:3002';
const token = () => localStorage.getItem('token');

export const getCartByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/carts/user/${userId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return response.data;
};

export const createCart = async (cartData) => {
  const response = await axios.post(`${API_URL}/carts`, cartData, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return response.data;
};

export const addItemToCart = async (cartId, itemData) => {
  const response = await axios.post(`${API_URL}/carts/${cartId}/items`, itemData, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return response.data;
};

export const removeItemFromCart = async (cartId, itemId) => {
  await axios.delete(`${API_URL}/carts/${cartId}/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};

export const updateItemQuantity = async (cartId, itemId, quantity) => {
  const response = await axios.put(
    `${API_URL}/carts/${cartId}/items/${itemId}`,
    { quantity },
    {
      headers: { Authorization: `Bearer ${token()}` },
    }
  );
  return response.data;
};

export const closeCart = async (cartId) => {
  const response = await axios.put(
    `${API_URL}/carts/${cartId}`,
    { status: 'completed' },
    {
      headers: { Authorization: `Bearer ${token()}` },
    }
  );
  return response.data;
};
