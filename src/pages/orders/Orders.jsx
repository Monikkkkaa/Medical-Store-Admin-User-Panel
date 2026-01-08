import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import { fetchOrders } from '../../store/slices/orderSlice';
import Loader from '../../components/common/Loader';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, pagination, loading } = useSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders({ page: currentPage }));
    }
  }, [dispatch, isAuthenticated, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
        <p className="text-gray-600 mb-8">You need to login to view your orders</p>
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

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
        <Link to="/medicines" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order.orderId}
                </h3>
                <p className="text-sm text-gray-500">
                  Placed on {formatDate(order.bookingDate)}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <Link
                  to={`/orders/${order._id}`}
                  className="text-primary-600 hover:text-primary-800 flex items-center space-x-1"
                >
                  <Eye size={16} />
                  <span>View Details</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item._id} className="flex items-center space-x-3">
                      {item.medicine?.image && (
                        <img
                          src={`http://localhost:5000/${item.medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}`}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600">
                  <p>{order.deliveryAddress.street}</p>
                  <p>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                  <p>{order.deliveryAddress.zipCode}</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-lg font-semibold text-gray-900">
                    Total: {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  page === currentPage
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;