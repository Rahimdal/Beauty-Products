import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Eye, Search, Filter, X, Menu, Grid, List, Sparkles, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Buy from '../../component/Buy/Buy';

export default function Products() {
  const navigate = useNavigate();
  // Add state variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileFilters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        
        const beautyProducts = data.slice(0, 20).map((product, index) => {
          const beautyNames = [
            'Herbal Hydration Gel', 'Green Glow Clay Mask', 'Rose Essence Facial Oil',
            'Aloe Calm Soothing Gel', 'Nature Nectar Lip Balm', 'Coconut Cloud Body Butter',
            'MintFresh Face Wash', 'Botanica Bright Toner', 'Lavender Luxe Body Lotion',
            'Chamomile Calm Cleanser', 'Vitamin C Brightening Serum', 'Hyaluronic Acid Moisturizer',
            'Retinol Night Repair Cream', 'Niacinamide Pore Minimizer', 'Peptide Anti-Aging Serum',
            'Ceramide Barrier Repair Balm', 'Salicylic Acid Gentle Exfoliant', 'Argan Oil Hair Treatment',
            'Shea Butter Hand Cream', 'Tea Tree Spot Treatment'
          ];

          const beautyImages = [
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop'
          ];

          const categories = ['Skincare', 'Moisturizers', 'Cleansers', 'Serums', 'Treatments'];

          return {
            id: product.id,
            title: beautyNames[index] || `Beauty Product ${index + 1}`,
            price: Math.floor(product.price * 80),
            description: product.description.length > 100 
              ? product.description.substring(0, 100) + '...' 
              : product.description,
            image: beautyImages[index % beautyImages.length],
            rating: product.rating,
            category: categories[index % categories.length]
          };
        });

        setProducts(beautyProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (priceFilter === 'all' || 
       (priceFilter === 'under500' && product.price < 500) ||
       (priceFilter === '500-1000' && product.price >= 500 && product.price <= 1000) ||
       (priceFilter === 'over1000' && product.price > 1000)) &&
      (categoryFilter === 'all' || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      return a.title.localeCompare(b.title);
    });

  const FilterSection = ({ isMobile = false }) => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {['all', 'Skincare', 'Moisturizers', 'Cleansers', 'Serums', 'Treatments'].map((category) => (
            <label key={category} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={category}
                checked={categoryFilter === category}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
              />
              <span className="ml-3 text-gray-700 group-hover:text-pink-600 transition-colors capitalize">
                {category === 'all' ? 'All Categories' : category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Prices' },
            { value: 'under500', label: 'Under ₹500' },
            { value: '500-1000', label: '₹500 - ₹1000' },
            { value: 'over1000', label: 'Over ₹1000' }
          ].map((price) => (
            <label key={price.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="price"
                value={price.value}
                checked={priceFilter === price.value}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
              />
              <span className="ml-3 text-gray-700 group-hover:text-pink-600 transition-colors">
                {price.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setSearchTerm('');
          setPriceFilter('all');
          setCategoryFilter('all');
          setSortBy('name');
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors"
      >
        Clear All Filters
      </button>

      {isMobile && (
        <button
          onClick={() => setShowMobileFilters(false)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
        >
          Apply Filters
        </button>
      )}
    </div>
  );

  const ProductCard = ({ product, index }) => (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 cursor-pointer ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}
    >
      {/* Product Image */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'h-48 sm:h-56 md:h-64'
      }`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating.rate)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            console.log('Added to wishlist');
          }}
          className="absolute top-3 right-12 bg-white/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-6 flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{product.price}</span>
            <div className="text-xs sm:text-sm text-gray-500">
              {product.rating.rate}★ ({product.rating.count} reviews)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Buy 
            className="flex-1"
            size="sm"
            product={product}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Add to Cart
          </Buy>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="bg-gray-100 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // Product Preview Modal Component
  const ProductModal = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    // Generate multiple product images for gallery
    const productImages = [
      selectedProduct?.image,
      selectedProduct?.image?.replace('w=400', 'w=500'),
      selectedProduct?.image?.replace('h=400', 'h=500'),
      selectedProduct?.image?.replace('fit=crop', 'fit=cover')
    ];

    return (
      <AnimatePresence>
        {showProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setShowProductModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowProductModal(false)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 z-30 bg-white/90 backdrop-blur-sm shadow-lg p-2 sm:p-3 rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>

              {/* Mobile Layout - Single Column */}
              <div className="block lg:hidden overflow-y-auto max-h-[95vh]">
                {/* Mobile Image Section */}
                <div className="relative bg-gray-50 p-4">
                  {/* Main Image */}
                  <div className="relative mb-3 rounded-xl overflow-hidden bg-white shadow-lg">
                    <img
                      src={productImages[selectedImageIndex]}
                      alt={selectedProduct.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {selectedProduct.category}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(selectedProduct.rating.rate)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-medium text-gray-700 ml-1">
                        {selectedProduct.rating.rate}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Thumbnail Gallery */}
                  <div className="grid grid-cols-4 gap-2">
                    {productImages.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all duration-300 ${
                          selectedImageIndex === index 
                            ? 'border-pink-500 shadow-lg' 
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0 bg-pink-500/20"></div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mobile Product Details */}
                <div className="p-4 space-y-4">
                  {/* Title & Price */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {selectedProduct.title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">₹{selectedProduct.price}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {selectedProduct.rating.count} reviews • In Stock
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-pink-100 text-pink-600 p-3 rounded-full hover:bg-pink-200 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-500" />
                      Description
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedProduct.description.replace('...', '')} This premium beauty product is carefully formulated with natural ingredients.
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Natural & Organic',
                        'Dermatologically Tested',
                        'All Skin Types',
                        'Cruelty-Free'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100">
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                          <span className="text-gray-700 text-xs font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button className="p-2 hover:bg-gray-50 transition-colors">
                          <span className="text-lg font-semibold">-</span>
                        </button>
                        <span className="px-3 py-2 font-semibold">1</span>
                        <button className="p-2 hover:bg-gray-50 transition-colors">
                          <span className="text-lg font-semibold">+</span>
                        </button>
                      </div>
                      <span className="text-gray-500 text-xs">50+ available</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Buy 
                      className="w-full"
                      onClick={() => {
                        console.log(`Buying ${selectedProduct.title}`);
                        setShowProductModal(false);
                      }}
                    >
                      Add to Cart • ₹{selectedProduct.price}
                    </Buy>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
                    >
                      Add to Cart
                    </motion.button>
                  </div>

                  {/* Guarantee */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-100">
                    <div className="flex items-center gap-2 text-pink-700">
                      <Shield className="w-4 h-4" />
                      <span className="font-semibold text-sm">30-Day Money Back Guarantee</span>
                    </div>
                    <p className="text-pink-600 text-xs mt-1">Free shipping on orders over ₹999</p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Two Columns */}
              <div className="hidden lg:grid lg:grid-cols-2 h-full">
                {/* Left Side - Image Gallery */}
                <div className="relative bg-gray-50 p-6 lg:p-8">
                  {/* Main Image */}
                  <div className="relative mb-4 rounded-2xl overflow-hidden bg-white shadow-lg">
                    <img
                      src={productImages[selectedImageIndex]}
                      alt={selectedProduct.title}
                      className="w-full h-80 lg:h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {selectedProduct.category}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating.rate)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {selectedProduct.rating.rate}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-4 gap-3">
                    {productImages.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                          selectedImageIndex === index 
                            ? 'border-pink-500 shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.title} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0 bg-pink-500/20"></div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Right Side - Product Details */}
                <div className="p-6 lg:p-8 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Product Title & Price */}
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                        {selectedProduct.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-4xl font-bold text-gray-900">₹{selectedProduct.price}</span>
                          <div className="text-sm text-gray-500 mt-1">
                            {selectedProduct.rating.count} reviews • In Stock
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-pink-100 text-pink-600 p-4 rounded-full hover:bg-pink-200 transition-colors shadow-lg"
                        >
                          <Heart className="w-6 h-6" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-pink-500" />
                        Product Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProduct.description.replace('...', '')} This premium beauty product is carefully formulated with natural ingredients to provide exceptional results. Perfect for daily use and suitable for all skin types.
                      </p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Natural & Organic',
                          'Dermatologically Tested',
                          'All Skin Types',
                          'Cruelty-Free'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-xl">
                          <button className="p-3 hover:bg-gray-50 transition-colors">
                            <span className="text-lg font-semibold">-</span>
                          </button>
                          <span className="px-4 py-3 font-semibold">1</span>
                          <button className="p-3 hover:bg-gray-50 transition-colors">
                            <span className="text-lg font-semibold">+</span>
                          </button>
                        </div>
                        <span className="text-gray-500">Available: 50+ items</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Buy 
                        className="flex-1"
                        onClick={() => {
                          console.log(`Buying ${selectedProduct.title}`);
                          setShowProductModal(false);
                        }}
                      >
                        Add to Cart • ₹{selectedProduct.price}
                      </Buy>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
                      >
                        Add to Cart
                      </motion.button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
                      <div className="flex items-center gap-2 text-pink-700">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">30-Day Money Back Guarantee</span>
                      </div>
                      <p className="text-pink-600 text-sm mt-1">Free shipping on orders over ₹999</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-16 sm:pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading beautiful products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Beauty Collection
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of luxury beauty essentials for your skincare routine
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white px-3 sm:px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base w-full sm:w-auto"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' 
                : 'space-y-4'
            }`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 sm:py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setShowMobileFilters(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative bg-white h-full w-80 max-w-[85vw] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSection isMobile={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Preview Modal */}
      <ProductModal />
    </div>
  );
}
