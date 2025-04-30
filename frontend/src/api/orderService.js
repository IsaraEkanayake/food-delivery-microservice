import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const getAllOrders = () => axios.get(`${API_BASE}/orders`);
export const createOrder = (order) => axios.post(`${API_BASE}/orders`, order);
export const deleteOrder = (id) => axios.delete(`${API_BASE}/orders/${id}`);
