import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchMedicineDetail();
  }, [id]);

  const fetchMedicineDetail = async () => {
    try {
      const response = await fetch(`https://medical-store-admin-server.onrender.com/api/public/medicines/${id}`);
      const data = await response.json();
      if (data.success) {
        setMedicine(data.medicine);
      } else {
        toast.error('Medicine not found');
      }
    } catch (error) {
      toast.error('Failed to fetch medicine details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await dispatch(addToCart({ medicineId: id, quantity })).unwrap();
      toast.success('Item added to cart');
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Medicine not found</h2>
          <button onClick={() => navigate('/medicines')} className="btn-primary">
            Back to Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 animate-fadeIn"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="animate-slideUp">
            <div className="card p-8">
              <img
                src={medicine.image ? `https://medical-store-admin-server.onrender.com/${medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTQwVjI2ME0xNDAgMjAwSDI2MCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4='}
                alt={medicine.name}
                className="w-full h-96 object-cover rounded-xl"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTQwVjI2ME0xNDAgMjAwSDI2MCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=';
                }}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="animate-slideUp stagger-1">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-4">{medicine.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  {medicine.averageRating > 0 && (
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                      <Star className="text-yellow-400 fill-current" size={20} />
                      <span className="text-lg font-medium text-gray-700 ml-1">
                        {medicine.averageRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-lg">
                    In Stock
                  </span>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  ${medicine.price}
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{medicine.description}</p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Quantity</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 text-lg py-4"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="w-14 h-14 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="w-14 h-14 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;