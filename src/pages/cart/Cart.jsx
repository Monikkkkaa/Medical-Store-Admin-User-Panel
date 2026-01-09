import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { fetchCart, updateCartItem, removeFromCart } from '../../store/slices/cartSlice';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = async (medicineId, newQuantity) => {
    try {
      await dispatch(updateCartItem({ medicineId, quantity: newQuantity })).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRemoveItem = async (medicineId) => {
    try {
      await dispatch(removeFromCart(medicineId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
        <p className="text-gray-600 mb-8">You need to login to view your cart</p>
        <Link to="/login" className="btn-primary">
          Login Now
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader size="lg" />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some medicines to get started</p>
        <Link to="/medicines" className="btn-primary">
          Shop Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.medicine._id} className="card flex items-center space-x-4">
                <img
                  src={item.medicine.image ? `https://medical-store-admin-server.onrender.com/${item.medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyOFY1Mk0yOCA0MEg1MiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4='}
                  alt={item.medicine.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyOFY1Mk0yOCA0MEg1MiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=';
                  }}
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.medicine.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.medicine._id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.medicine._id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item.medicine._id)}
                    className="text-red-500 hover:text-red-700 mt-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cart.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;