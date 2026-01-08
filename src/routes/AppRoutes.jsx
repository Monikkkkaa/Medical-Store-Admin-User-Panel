import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Medicines from '../pages/medicines/Medicines';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/orders/Checkout';
import Orders from '../pages/orders/Orders';
import OrderDetails from '../pages/orders/OrderDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
    </Routes>
  );
};

export default AppRoutes;