import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";
import FeedbackButton from "./Components/Feedbtn";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="758500021538-7tm7mv4tas3ouma9bb0uau1ia209al78.apps.googleusercontent.com">
    <CartProvider>
      <BrowserRouter>
        <App />
        <FeedbackButton />        
      </BrowserRouter>
    </CartProvider>
       </GoogleOAuthProvider>
  </React.StrictMode>
);
