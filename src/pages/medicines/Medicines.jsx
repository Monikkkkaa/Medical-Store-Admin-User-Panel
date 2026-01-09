import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, Star, ShoppingCart, Filter, Grid, List, SlidersHorizontal, Sparkles, Zap, Pill, Stethoscope, Heart, Shield, Truck } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    dispatch(fetchMedicines({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  useEffect(() => {
    filterMedicines();
  }, [medicines, priceRange, category]);

  const filterMedicines = () => {
    let filtered = [...medicines];

    if (priceRange) {
      filtered = filtered.filter(medicine => {
        const price = parseFloat(medicine.price);
        switch (priceRange) {
          case 'under10': return price < 10;
          case '10-50': return price >= 10 && price <= 50;
          case '50-100': return price >= 50 && price <= 100;
          case 'over100': return price > 100;
          default: return true;
        }
      });
    }

    if (category) {
      filtered = filtered.filter(medicine => 
        medicine.name.toLowerCase().includes(category.toLowerCase()) ||
        medicine.description.toLowerCase().includes(category.toLowerCase())
      );
    }

    setFilteredMedicines(filtered);
  };

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

  const displayMedicines = filteredMedicines.length > 0 ? filteredMedicines : medicines;

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Pill className="mr-1" size={12} />
              Trusted Online Pharmacy
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black mb-3 text-gray-800">
              Premium <span className="text-blue-600">Medicines</span>
            </h1>
            
            <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
              Discover authentic medicines with fast delivery
            </p>
            
            <div className="flex justify-center gap-4 text-xs">
              <div className="bg-red-50 px-3 py-1 rounded-lg text-red-700 font-medium">Pain Relief</div>
              <div className="bg-blue-50 px-3 py-1 rounded-lg text-blue-700 font-medium">Antibiotics</div>
              <div className="bg-green-50 px-3 py-1 rounded-lg text-green-700 font-medium">Vitamins</div>
              <div className="bg-purple-50 px-3 py-1 rounded-lg text-purple-700 font-medium">Cold & Flu</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Controls */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search medicines..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  showFilters 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal size={20} />
                <span>Filters</span>
              </button>
              
              <div className="flex bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Panel */}
        {showFilters && (
          <div className="mb-12 animate-slideDown">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100">
              <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center">
                <Filter className="mr-3" size={24} />
                Filter Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">Price Range</label>
                  <select 
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="">All Prices</option>
                    <option value="under10">Under $10</option>
                    <option value="10-50">$10 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="over100">Over $100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="pain">Pain Relief</option>
                    <option value="antibiotic">Antibiotics</option>
                    <option value="vitamin">Vitamins</option>
                    <option value="cold">Cold & Flu</option>
                    <option value="diabetes">Diabetes</option>
                  </select>
                </div>
              </div>
              {(priceRange || category) && (
                <div className="mt-6">
                  <button
                    onClick={() => { setPriceRange(''); setCategory(''); }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative">
                <Loader size="lg" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Medicine Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10' 
                : 'space-y-8'
            }`}>
              {displayMedicines.map((medicine, index) => (
                <div 
                  key={medicine._id} 
                  className={`group medicine-card animate-slideUp stagger-${(index % 8) + 1} relative overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row md:items-center md:space-x-8 p-8' : 'p-8'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className={`relative ${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : ''}`}>
                    <Link to={`/medicine/${medicine._id}`}>
                      <div className="relative overflow-hidden rounded-2xl mb-6">
                        <img
                          src={`http://localhost:5000/${medicine.image.replace('src\\', '').replace('src/', '').replace(/\\/g, '/')}`}
                          alt={medicine.name}
                          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                            viewMode === 'list' ? 'w-full h-40' : 'w-full h-56'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
                          ✓ In Stock
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  <div className={`relative flex-1 ${viewMode === 'list' ? 'p-0' : ''}`}>
                    <Link to={`/medicine/${medicine._id}`}>
                      <h3 className="font-black text-gray-900 mb-3 text-xl group-hover:text-blue-600 transition-colors">
                        {medicine.name}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{medicine.description}</p>
                    </Link>
                    
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${medicine.price}
                      </span>
                      {medicine.averageRating > 0 && (
                        <div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-xl border border-yellow-200">
                          <Star className="text-yellow-500 fill-current" size={18} />
                          <span className="text-sm text-gray-800 ml-2 font-bold">
                            {medicine.averageRating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(medicine._id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="mr-2" size={20} />
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {displayMedicines.length === 0 && !loading && (
              <div className="text-center py-20 animate-fadeIn">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 max-w-2xl mx-auto">
                  <Search size={64} className="mx-auto mb-6 text-gray-400" />
                  <h3 className="text-3xl font-bold mb-4 text-gray-700">No medicines found</h3>
                  <p className="text-gray-500 mb-8 text-lg">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => { setSearch(''); setPriceRange(''); setCategory(''); }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Enhanced Pagination */}
            {pagination && pagination.totalPages > 1 && !priceRange && !category && (
              <div className="flex justify-center mt-16 animate-fadeIn">
                <div className="flex space-x-3">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl'
                          : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
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
    </div>
  );
};

export default Medicines;