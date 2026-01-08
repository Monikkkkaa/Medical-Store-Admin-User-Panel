import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Star } from 'lucide-react';
import { fetchMedicines } from '../../store/slices/medicineSlice';
import Loader from '../../components/common/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { medicines, loading } = useSelector((state) => state.medicines);

  useEffect(() => {
    dispatch(fetchMedicines({ limit: 8 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Buy medicines online with fast delivery and genuine products
            </p>
            <Link to="/medicines" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find medicines quickly with our advanced search</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your medicines delivered to your doorstep</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">100% genuine medicines from trusted manufacturers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Medicines</h2>
            <p className="text-gray-600">Popular and trusted medicines</p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {medicines.slice(0, 8).map((medicine) => (
                <Link
                  key={medicine._id}
                  to={`/medicine/${medicine._id}`}
                  className="medicine-card p-4"
                >
                  <img
                    src={`http://localhost:5000/${medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}`}
                    alt={medicine.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{medicine.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{medicine.description}</p>
                  <div className="flex items-center justify-between">
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
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/medicines" className="btn-primary">
              View All Medicines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;