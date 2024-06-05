import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
// import Cursor from "./Components/Cursor";
import "./App.css";
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
import Success from "./Pages/Success"
import PageNotFound from "./Pages/404page";
import Faq from './Pages/FAQ';

function App() {
  return (
    <>
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
        <Route path="/address-payment-placeOrder/confirmOrder" element={<ConformOrder />} ></Route>
        <Route path="/success" element={<Success />} ></Route>
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      <Toaster position="top-left" reverseOrder={false} />
    </>
  );
}

export default App;
