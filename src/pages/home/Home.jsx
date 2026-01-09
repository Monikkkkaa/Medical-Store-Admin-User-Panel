import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Star, Zap, Shield, Clock, ArrowRight, Heart, Award, Users, Truck, Stethoscope, Pill } from 'lucide-react';
import { fetchMedicines } from '../../store/slices/medicineSlice';
import Loader from '../../components/common/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { medicines, loading } = useSelector((state) => state.medicines);

  useEffect(() => {
    dispatch(fetchMedicines({ limit: 8 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 relative overflow-hidden">
        <div className="absolute top-20 right-20 opacity-10">
          <Pill className="text-blue-500" size={120} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <Stethoscope className="text-green-500" size={100} />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-5">
          <div className="w-32 h-32 bg-blue-200 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-5xl md:text-7xl font-black mb-8 text-gray-800">
                Your Health,
                <span className="block text-blue-600 mt-2">
                  Our Priority
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed">
                Get authentic medicines delivered to your doorstep with 
                <span className="font-semibold text-blue-600">professional care</span> and 
                <span className="font-semibold text-green-600">fast delivery</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/medicines" className="group bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  <span className="flex items-center justify-center">
                    Shop Medicines
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                  </span>
                </Link>
                
                <Link to="/medicines" className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center">
                  <span className="flex items-center justify-center">
                    <Search className="mr-3" size={24} />
                    Browse Catalog
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slideUp">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <Pill className="text-blue-600 mx-auto mb-3" size={48} />
                    <h3 className="font-bold text-gray-800">Prescription</h3>
                    <p className="text-sm text-gray-600">Medicines</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 text-center">
                    <Heart className="text-green-600 mx-auto mb-3" size={48} />
                    <h3 className="font-bold text-gray-800">Health</h3>
                    <p className="text-sm text-gray-600">Supplements</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 text-center">
                    <Shield className="text-purple-600 mx-auto mb-3" size={48} />
                    <h3 className="font-bold text-gray-800">Verified</h3>
                    <p className="text-sm text-gray-600">Quality</p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-6 text-center">
                    <Truck className="text-orange-600 mx-auto mb-3" size={48} />
                    <h3 className="font-bold text-gray-800">Fast</h3>
                    <p className="text-sm text-gray-600">Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-black text-gray-800 mb-6">Why Choose MediStore?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted healthcare partner with professional service and authentic medicines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp stagger-1">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">Same-day delivery with real-time tracking and instant notifications</p>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp stagger-2">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-green-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">100% Authentic</h3>
              <p className="text-gray-600 leading-relaxed">Verified medicines from licensed manufacturers with quality guarantee</p>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp stagger-3">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="text-purple-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Expert Care</h3>
              <p className="text-gray-600 leading-relaxed">Professional pharmacists available 24/7 for consultation</p>
            </div>
            
            <div className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp stagger-4">
              <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="text-orange-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Trusted Service</h3>
              <p className="text-gray-600 leading-relaxed">Recognized as the best online pharmacy for customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-black text-gray-800 mb-6">Featured Medicines</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most popular and trusted medicines from top pharmaceutical brands
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {medicines.slice(0, 8).map((medicine, index) => (
                <Link
                  key={medicine._id}
                  to={`/medicine/${medicine._id}`}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-${index + 1} border border-gray-100`}
                >
                  <div className="p-6">
                    <div className="relative mb-6 overflow-hidden rounded-xl">
                      <img
                        src={`https://medical-store-admin-server.onrender.com/${medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}`}
                        alt={medicine.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        ✓ Available
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 mb-3 text-lg group-hover:text-blue-600 transition-colors">
                      {medicine.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{medicine.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-blue-600">
                        ${medicine.price}
                      </span>
                      {medicine.averageRating > 0 && (
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
                          <Star className="text-yellow-500 fill-current" size={16} />
                          <span className="text-sm text-gray-700 ml-1 font-medium">
                            {medicine.averageRating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300">
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="mr-2" size={18} />
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16 animate-fadeIn">
            <Link to="/medicines" className="inline-flex items-center bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span>View All Medicines</span>
              <ArrowRight className="ml-3" size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;