import React from "react";

import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
