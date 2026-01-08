import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, User, LogOut, Pill, Package } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Pill className="text-primary-500" size={32} />
            <span className="text-xl font-bold text-gray-900">MediStore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link to="/medicines" className="text-gray-700 hover:text-primary-500 transition-colors">
              Medicines
            </Link>
            {isAuthenticated && (
              <Link to="/orders" className="text-gray-700 hover:text-primary-500 transition-colors">
                Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-500 transition-colors">
              <ShoppingCart size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/orders" className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors">
                  <Package size={20} />
                  <span className="hidden sm:block">Orders</span>
                </Link>
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={20} />
                  <span className="hidden sm:block">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-500 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;