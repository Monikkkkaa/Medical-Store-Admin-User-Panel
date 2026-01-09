import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Calendar } from 'lucide-react';
import { orderService } from '../../services/order.service';
import Loader from '../../components/common/Loader';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrderById(id);
        setOrder(response.order);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link to="/orders" className="btn-primary">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/orders"
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Orders</span>
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.orderId}
            </h1>
            <p className="text-gray-600 mt-1">
              Placed on {formatDate(order.bookingDate)}
            </p>
          </div>
          <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(order.status)} mt-4 sm:mt-0`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="text-primary-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  {item.medicine?.image && (
                    <img
                      src={`https://medical-store-admin-server.onrender.com/${item.medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: {formatCurrency(item.price)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-primary-600">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="text-primary-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
            </div>
            
            <div className="text-gray-600">
              <p className="font-medium">{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
              <p>{order.deliveryAddress.zipCode}</p>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-primary-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Order Timeline</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Order Placed</p>
                  <p className="text-sm text-gray-500">{formatDate(order.bookingDate)}</p>
                </div>
              </div>
              
              {order.status === 'Delivered' && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Delivered</p>
                    <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                  </div>
                </div>
              )}
              
              {order.status === 'Cancelled' && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Cancelled</p>
                    <p className="text-sm text-gray-500">{formatDate(order.updatedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;