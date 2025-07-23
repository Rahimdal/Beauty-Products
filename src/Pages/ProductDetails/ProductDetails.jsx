import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Shield, Truck, RotateCcw, Award, ChevronDown, ChevronUp } from 'lucide-react';
import Buy from '../../component/Buy/Buy';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [showIngredients, setShowIngredients] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Generate multiple product images
  const generateProductImages = (baseImage) => [
    baseImage,
    baseImage?.replace('w=400', 'w=500'),
    baseImage?.replace('h=400', 'h=500'),
    baseImage?.replace('fit=crop', 'fit=cover')
  ];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        
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

        const foundProduct = data.find(p => p.id === parseInt(id));
        if (foundProduct) {
          const index = foundProduct.id - 1;
          const transformedProduct = {
            id: foundProduct.id,
            title: beautyNames[index] || `Beauty Product ${index + 1}`,
            price: Math.floor(foundProduct.price * 80),
            description: foundProduct.description,
            image: beautyImages[index % beautyImages.length],
            rating: foundProduct.rating,
            category: categories[index % categories.length]
          };
          setProduct(transformedProduct);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const productImages = product ? generateProductImages(product.image) : [];

  const sizes = ['30ml', '50ml', '100ml', '150ml'];
  const ingredients = [
    'Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'Retinol', 'Peptides',
    'Ceramides', 'Aloe Vera Extract', 'Green Tea Extract', 'Jojoba Oil'
  ];

  const reviews = [
    { name: 'Priya S.', rating: 5, comment: 'Amazing product! My skin feels so much better.', date: '2 weeks ago' },
    { name: 'Anita M.', rating: 4, comment: 'Good quality, will definitely repurchase.', date: '1 month ago' },
    { name: 'Ravi K.', rating: 5, comment: 'Excellent results, highly recommended!', date: '3 weeks ago' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Products</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className="w-full h-96 sm:h-[500px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating.rate)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-700 ml-1">
                  {product.rating.rate}
                </span>
              </div>
            </motion.div>

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
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-pink-500/20"></div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                  <div className="text-sm text-gray-500 mt-1">
                    {product.rating.count} reviews • In Stock
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-pink-100 text-pink-600 p-4 rounded-full hover:bg-pink-200 transition-colors"
                >
                  <Heart className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description} This premium beauty product is carefully formulated with natural ingredients to provide exceptional results. Perfect for daily use and suitable for all skin types.
              </p>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-xl"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg text-gray-900 bg-white min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-xl"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="text-3xl font-bold text-pink-600">₹{(product.price * quantity).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Buy 
                  className="flex-1"
                  product={{...product, quantity}}
                  onClick={() => console.log(`Adding ${quantity} x ${product.title} to cart`)}
                  showIcon={false}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Buy>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>

            {/* Product Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: 'Dermatologically Tested' },
                  { icon: Award, text: 'Premium Quality' },
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: RotateCcw, text: '30-Day Returns' }
                ].map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <highlight.icon className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-700 font-medium">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <button
                onClick={() => setShowIngredients(!showIngredients)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">Key Ingredients</h3>
                {showIngredients ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <AnimatePresence>
                {showIngredients && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">
                          {ingredient}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                {showReviews ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <AnimatePresence>
                {showReviews && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-4"
                  >
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


