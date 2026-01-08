import api from './api';

export const medicineService = {
  getMedicines: async (params = {}) => {
    const response = await api.get('/public/medicines', { params });
    return response.data;
  },

  getMedicineById: async (id) => {
    const response = await api.get(`/public/medicines/${id}`);
    return response.data;
  },

  addReview: async (medicineId, reviewData) => {
    const response = await api.post(`/reviews/medicine/${medicineId}`, reviewData);
    return response.data;
  },

  getReviews: async (medicineId, params = {}) => {
    const response = await api.get(`/reviews/medicine/${medicineId}`, { params });
    return response.data;
  },
};