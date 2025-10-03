import axios from 'axios';

const API_URL = 'http://localhost:3002';

const token = () => localStorage.getItem('token');

export const getAllBeer = async () => {
  const response = await axios.get('http://localhost:3002/beers');
  return response.data; 
};

export const getBeerById = (id) => {
  return axios.get(`${API_URL}/beer/${id}`);
};

export const addBeer = (formData) => {
  return axios.post(`${API_URL}/add-beer`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token()}`,
    },
  });
};
