import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/user/cart');
    return response.data;
  },

  addToCart: async (medicineId, quantity) => {
    const response = await api.post('/user/cart/add', { medicineId, quantity });
    return response.data;
  },

  updateCartItem: async (medicineId, quantity) => {
    const response = await api.put('/user/cart/update', { medicineId, quantity });
    return response.data;
  },

  removeFromCart: async (medicineId) => {
    const response = await api.delete(`/user/cart/remove/${medicineId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/user/cart/clear');
    return response.data;
  },
};