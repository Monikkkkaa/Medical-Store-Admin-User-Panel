import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/user/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/user/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('userToken');
  },

  getProfile: async () => {
    const response = await api.get('/user/auth/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/user/auth/profile', userData);
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('userToken');
  },
};