import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import UserProfile from "./Pages/UserProfile";
import { Toaster } from "react-hot-toast";
import PlaceOrder from "./Pages/PlaceOrder";
import ConformOrder from "./Pages/ConformOrder";
import Success from "./Pages/Success";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/address-payment-placeOrder" element={<PlaceOrder />} />
        <Route path="/address-payment-placeOrder/confirmOrder" element={<ConformOrder />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
    </div>
  );
}

export default App;
