import { motion } from "framer-motion";
import { Sparkles, Shield, Truck, Heart, Star, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "./img/Amber Essence in Glass.png";
import Pro from "./img/Gemini_Generated_Image_k94d27k94d27k94d.png";
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Create static beauty products with real beauty product images
        const beautyProducts = [
          {
            id: 1,
            title: "Vitamin C Brightening Serum",
            price: 1299,
            description: "Advanced vitamin C serum with hyaluronic acid that brightens skin, reduces dark spots, and provides deep hydration for a radiant, youthful glow.",
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
            rating: { rate: 4.8, count: 245 }
          },
          {
            id: 2,
            title: "Hydrating Face Cream",
            price: 899,
            description: "Rich moisturizing cream with ceramides and peptides that deeply nourishes skin, restores moisture barrier, and provides 24-hour hydration.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
            rating: { rate: 4.6, count: 189 }
          },
          {
            id: 3,
            title: "Gentle Foaming Face Wash",
            price: 599,
            description: "Sulfate-free cleansing foam with natural botanicals that gently removes impurities, makeup, and excess oil without stripping skin's natural moisture.",
            image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop&crop=center",
            rating: { rate: 4.7, count: 312 }
          },
          {
            id: 4,
            title: "Anti-Aging Night Cream",
            price: 1599,
            description: "Luxurious night cream with retinol and collagen that works overnight to reduce fine lines, improve skin texture, and promote cellular renewal.",
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
            rating: { rate: 4.9, count: 156 }
          }
        ];
        
        setProducts(beautyProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      // GSAP animations for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card, 
            {
              y: 100,
              opacity: 0,
              scale: 0.8,
              rotationY: 15
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Hover animation
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    }
  }, [loading, products]);

  return (
    <>
      {/* Hero Section */}
      <div className="h-screen text-black flex items-center justify-center px-6 pt-0 relative overflow-hidden" style={{backgroundColor: '		#FF8C00'}}>
        {/* Minimal Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl w-full h-full grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0 relative z-10">
          {/* Text Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-10 text-center lg:text-left flex flex-col justify-center px-4 lg:px-8 py-8 lg:py-0 order-2 lg:order-1"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              Premium Beauty Collection
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight"
            >
              <span className="text-gray-900">Discover</span>
              <br />
              <span className="text-gray-900">Your</span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Natural Glow
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Transform your skincare routine with our premium collection of organic beauty products, 
              scientifically formulated to enhance your natural radiance.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Shop Collection
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.button>
              </Link>
              
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Watch Story
                </motion.button>
              </Link>
            </motion.div>

            {/* Clean Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 lg:gap-8 pt-8 lg:pt-12 border-t border-gray-100"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-xs lg:text-sm text-gray-500 font-medium">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">100%</div>
                <div className="text-xs lg:text-sm text-gray-500 font-medium">Natural & Organic</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-xs lg:text-sm text-gray-500 font-medium">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Section - Full Height */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[60vh] lg:h-full order-1 lg:order-2"
          >
            {/* Main Product Image - Full Height */}
            <div className="w-full h-full">
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                <img
                  src={heroImg}
                  alt="Premium Beauty Product Collection"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Black line separator for mobile */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black lg:hidden"></div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-4 bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Certified Organic</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 right-4 bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">Dermatologist Approved</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hidden lg:block"
            >
              New Launch
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Beauty Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Beauty Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of luxury beauty essentials crafted for your unique skincare journey
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            /* Product Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  ref={el => cardsRef.current[index] = el}
                  className="bg-black text-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform-gpu h-[500px] flex flex-col"
                  onClick={() => navigate('/products')}
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating.rate)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3 flex-1">
                      {product.description}
                    </p>
                    
                    {/* Price, Rating and Button in same line */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-2xl font-bold text-white">₹{product.price}</span>
                        <div className="text-sm text-gray-400">
                          {product.rating.rate}★ ({product.rating.count} reviews)
                        </div>
                      </div>
                      
                      {/* Buy Button */}
                      <Link to="/products">
                        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-600 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Premium Collection
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Discover Your Perfect
                <span className="block text-pink-500">Beauty Routine</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our carefully curated collection of premium beauty products is designed to enhance your natural glow. From nourishing serums to luxurious creams, each product is formulated with the finest ingredients to deliver exceptional results.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">100% Natural & Organic Ingredients</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Dermatologist Tested & Approved</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Cruelty-Free & Sustainable</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:bg-pink-500 transition-all duration-300 flex items-center gap-2"
              >
                Explore Collection
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Product Images - Right Side */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 h-96">
                {/* Large Image - Top Left */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="row-span-2 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=600&fit=crop&crop=center"
                    alt="Vitamin C Serum"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Small Image - Top Right */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center"
                    alt="Face Cream"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Small Image - Bottom Right */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop&crop=center"
                    alt="Face Wash"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
              >
                Best Sellers
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two Column Text & Image Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Experience the
                <span className="block text-pink-500">Beauty Revolution</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Transform your skincare routine with our premium collection of scientifically-backed beauty products. Each formula is carefully crafted to deliver visible results while nourishing your skin with the finest natural ingredients.
              </p>
            </motion.div>

            {/* Image - Right Side */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=700&fit=crop&crop=center"
                alt="Beauty Products Collection"
                className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
