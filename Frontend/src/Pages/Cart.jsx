import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import "../CSS/Cart.css";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  const totalCartValue = cartItems.reduce((total, item) => {
    const itemQuantity = itemQuantities[item._id] || 1;
    return total + item.product.productPrice * itemQuantity;
  }, 0);

  useEffect(() => {
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
        setCartItems(shoppingCart);

        const initialQuantities = {};
        shoppingCart.forEach((item) => {
          initialQuantities[item._id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const removeProductFromCart = (itemId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData ? userData._id : null;

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/shopping-cart/${userId}/${itemId}`;

    axios
      .delete(apiUrl)
      .then(() => {
        toast("Item Removed success!", {
          icon: "😞",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        navigate("/product");
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleIncrementQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrementQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[itemId] || 0;
      if (currentQuantity > 1) {
        return {
          ...prevQuantities,
          [itemId]: currentQuantity - 1,
        };
      }
      return prevQuantities;
    });
  };

  const navigateToOther = () => {
    navigate("/address-payment-placeOrder", { state: { totalCartValue } });
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
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="outer-product-container">
              <div className="image-product">
                <img
                  src={item.product.productImage}
                  alt={item.product.productName}
                />
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
                <h1>
                  Rs.{" "}
                  {item.product.productPrice * (itemQuantities[item._id] || 1)}
                </h1>
              </div>
            </div>
          ))}
          <div className="total-cart-value">
            <h2>Total Products Value: Rs. {totalCartValue}</h2>
            {/* <NavLink to="/address-payment-placeOrder"> */}
            <button onClick={navigateToOther}>Buy Now</button>
            {/* </NavLink> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
