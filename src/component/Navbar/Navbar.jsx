import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, X } from "lucide-react";
import { useCart } from "../../Contact/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { cartCount, cartItems, getTotalPrice } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center p-4 px-6 bg-transparent text-black max-w-full overflow-hidden">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold z-50 relative font-serif bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0">
          ShopBrand
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 mr-4">
          {/* Navigation Links */}
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-pink-500 transition duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative hover:text-pink-500 transition duration-300">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            
            <Link to="/login" className="hover:text-pink-500 transition duration-300">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">
          {/* Mobile Cart and Login Icons */}
          <Link 
            to="/cart" 
            className="relative hover:text-pink-500 transition duration-300 p-1"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 - bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>
          <Link 
            to="/login" 
            className="hover:text-pink-500 transition duration-300 p-1"
          >
            <User className="w-6 h-6" />
          </Link>
          
          {/* Hamburger Menu */}
          <div
            className="cursor-pointer z-[60] relative  min-w-[44px] flex justify-center"
            onClick={() => setOpen(!open)}
          >
            <div className="space-y-1">
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
                className={`block w-6 h-0.5 origin-center transition-colors ${
                  open ? 'bg-black' : 'bg-black'
                }`}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                className={`block w-6 h-0.5 transition-colors ${
                  open ? 'bg-black' : 'bg-black'
                }`}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
                className={`block w-6 h-0.5 origin-center transition-colors ${
                  open ? 'bg-black' : 'bg-black'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 w-full sm:w-80 h-screen bg-white text-black flex flex-col items-center justify-center gap-8 z-50"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => setOpen(false)}
                  className="w-full text-center"
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-medium hover:text-gray-500 transition-colors block py-3"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Icons inside menu */}
              <div className="flex items-center gap-8 mt-4">
                <Link 
                  to="/cart" 
                  className="relative hover:text-pink-500 transition duration-300"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart className="w-8 h-8" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/login" 
                  className="hover:text-pink-500 transition duration-300"
                  onClick={() => setOpen(false)}
                >
                  <User className="w-8 h-8" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
