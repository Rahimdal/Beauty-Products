import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-purple-50 text-gray-700 py-16 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-30 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100 rounded-full opacity-30 translate-y-24 -translate-x-24"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Info */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Glowify
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Elevate your beauty with our premium range of skincare and cosmetic products. 
            Discover the perfect blend of nature and science.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Trusted by 50K+ customers worldwide
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative">
            Quick Links
            <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">Shop</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">About Us</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative">
            Customer Support
            <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group">
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">FAQs</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group">
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">Shipping & Returns</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group">
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">Privacy Policy</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1 inline-block group">
                <span className="group-hover:border-b-2 group-hover:border-pink-500 pb-1">Terms & Conditions</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 relative">
            Follow Us
            <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
          </h3>
          <div className="flex space-x-4 mb-6">
            <a 
              href="#" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <FaPinterestP className="text-xl" />
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Join our community for beauty tips & exclusive offers
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 relative z-10">
        <div className="text-center mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Stay Updated</h4>
          <p className="text-gray-600 mb-4">Subscribe to get special offers and beauty tips</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 pt-8 border-t border-gray-200 text-center relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Glowify Beauty. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
