import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import About from "./pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Cart from "./Pages/Cart/Cart";
import Footer from './component/Footer/Footer';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import { CartProvider } from './Contact/CartContext';
import { AuthProvider } from './context/AuthContext';
import Checkout from "./Pages/Checkout/Checkout";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-black min-h-screen text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;






