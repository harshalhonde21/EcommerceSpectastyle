import { useState, useEffect } from 'react';
import "../CSS/Cart.css";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Manage cart items locally
  const [itemQuantities, setItemQuantities] = useState({}); // Store item quantities

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData ? userData._id : null;

    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }

    const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/shopping-cart/${userId}`;

    axios.get(apiUrl)
      .then(response => {
        setLoading(false);
        const shoppingCart = response.data.shoppingCart;
        setCartItems(shoppingCart); // Set cartItems to the shoppingCart array

        // Initialize item quantities from shopping cart
        const initialQuantities = {};
        shoppingCart.forEach(item => {
          initialQuantities[item._id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, []);

  const removeProductFromCart = (itemId) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData ? userData._id : null;
    console.log(userId)
    console.log(itemId)

    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }

    const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/shopping-cart/${userId}/${itemId}`;

    axios.delete(apiUrl)
      .then(()=>{
        navigate('/product')
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleIncrementQuantity = (itemId) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1
    }));
  };

  const handleDecrementQuantity = (itemId) => {
    setItemQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[itemId] || 0;
      if (currentQuantity > 1) {
        return {
          ...prevQuantities,
          [itemId]: currentQuantity - 1
        };
      }
      return prevQuantities;
    });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img src="/cartempty.png" alt="Empty Cart" />
          <button onClick={() => navigate("/product")}>Shop the Product</button>
        </div>
      ) : (
        cartItems.map(item => (
          <div key={item._id} className="outer-product-container">
            <div className="image-product">
              <img src={item.product.productImage} alt={item.product.productName} />
            </div>
            <div className="detail-product">
              <h4>Name: {item.product.productName}</h4>
              <h5>Price: Rs. {item.product.productPrice}</h5>
              <input
                type="button"
                value="Remove"
                onClick={() => removeProductFromCart(item.product._id)}
              />
            </div>
            <div className="increase-product">
              <RemoveIcon
                style={{
                  border: "1px solid var(--color-6)",
                  fontSize: "35px",
                  cursor: "pointer",
                }}
                onClick={() => handleDecrementQuantity(item._id)}
              />
              <h3>{itemQuantities[item._id] || 1}</h3>
              <AddIcon
                style={{
                  border: "1px solid var(--color-6)",
                  fontSize: "35px",
                  cursor: "pointer",
                }}
                onClick={() => handleIncrementQuantity(item._id)}
              />
            </div>
            <div className="product-price-cart">
              <h1>Rs. {item.product.productPrice * (itemQuantities[item._id] || 1)}</h1>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
