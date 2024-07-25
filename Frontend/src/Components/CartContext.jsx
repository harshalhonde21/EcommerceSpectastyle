// CartContext.js
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //changes
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(''); // Add user data state
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  

  //Changes 

  const fetchCartItems = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData ? userData._id : null;

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/shopping-cart/${userId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const shoppingCart = response.data.shoppingCart;
        // setCartItems(shoppingCart);
        setCart(shoppingCart);

        const initialQuantities = {};
        shoppingCart.forEach((item) => {
          initialQuantities[item._id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect (() => {
    fetchCartItems();
  }, []);


  return (

    // changes in exprting children
    <CartContext.Provider
      value={{
        cart,
        fetchCartItems,
        setCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        userData, // Include user data in the context
        setUserData, // Function to set user data
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
