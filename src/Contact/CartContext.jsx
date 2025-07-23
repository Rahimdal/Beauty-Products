import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedCartCount = localStorage.getItem('cartCount');
    
    if (savedCartItems) {
      const items = JSON.parse(savedCartItems);
      setCartItems(items);
      setCartCount(parseInt(savedCartCount) || 0);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartItems, cartCount]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
    
    setCartCount(prev => prev + 1);
  };

  const removeFromCart = (index) => {
    const item = cartItems[index];
    setCartCount(prev => prev - item.quantity);
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }

    const updatedItems = [...cartItems];
    const oldQuantity = updatedItems[index].quantity;
    updatedItems[index].quantity = newQuantity;
    
    setCartItems(updatedItems);
    setCartCount(prev => prev + (newQuantity - oldQuantity));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('₹', '')) 
        : item.price;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartCount');
  };

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems, 
      isCartOpen,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      toggleCart,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};




