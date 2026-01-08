import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/user/orders', orderData);
    return response.data;
  },

  getOrders: async (params = {}) => {
    const response = await api.get('/user/orders', { params });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/user/orders/${id}`);
    return response.data;
  },
};