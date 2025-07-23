import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../Contact/CartContext';

export default function Buy({ 
  children = "Add to Cart", 
  onClick, 
  className = "", 
  disabled = false,
  size = "md",
  product,
  showIcon = true
}) {
  const { addToCart } = useCart();
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const handleClick = (e) => {
    e.stopPropagation();
    
    if (product) {
      addToCart(product);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden bg-black text-white border-2 border-transparent
        font-semibold rounded-xl transition-all duration-300 hover:bg-white hover:text-black hover:border-black
        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
        ${sizeClasses[size]} ${className}
      `}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Conditionally show cart icon */}
      {showIcon && (
        <motion.div
          className="relative z-10"
          whileHover={{
            rotate: [0, -5, 5, -3, 3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut"
          }}
        >
          <ShoppingCart className="w-5 h-5" />
        </motion.div>
      )}
    </motion.button>
  );
}








