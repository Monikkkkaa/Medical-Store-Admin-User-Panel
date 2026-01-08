export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ORDER_STATUS = {
  PENDING: 'Pending',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MEDICINES: '/medicines',
  MEDICINE_DETAIL: '/medicine/:id',
  CART: '/cart',
  ORDERS: '/orders',
  PROFILE: '/profile',
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  CART_ADDED: 'Item added to cart',
  ORDER_PLACED: 'Order placed successfully',
};