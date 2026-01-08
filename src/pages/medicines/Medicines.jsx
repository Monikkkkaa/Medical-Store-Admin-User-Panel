import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, Star, ShoppingCart } from 'lucide-react';
import { fetchMedicines } from '../../store/slices/medicineSlice';
import { addToCart } from '../../store/slices/cartSlice';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const Medicines = () => {
  const dispatch = useDispatch();
  const { medicines, pagination, loading } = useSelector((state) => state.medicines);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMedicines({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = async (medicineId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await dispatch(addToCart({ medicineId, quantity: 1 })).unwrap();
      toast.success('Item added to cart');
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Medicines</h1>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search medicines..."
            value={search}
            onChange={handleSearch}
            className="pl-10 input-field"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicines.map((medicine) => (
              <div key={medicine._id} className="medicine-card p-4">
                <Link to={`/medicine/${medicine._id}`}>
                  <img
                    src={`http://localhost:5000/${medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}`}
                    alt={medicine.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{medicine.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{medicine.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary-600">
                      ${medicine.price}
                    </span>
                    {medicine.averageRating > 0 && (
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm text-gray-600 ml-1">
                          {medicine.averageRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToCart(medicine._id)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
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
        </>
      )}
    </div>
  );
};

export default Medicines;