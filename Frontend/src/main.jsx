import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";
import FeedbackButton from "./Components/Feedbtn";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
        <FeedbackButton />        
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
