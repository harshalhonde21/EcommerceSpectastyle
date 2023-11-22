import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ConformOrder.css";
import { useLocation } from "react-router-dom";

const ConformOrder = () => {
  const location = useLocation();
  const totalCartValue = location.state.totalCartValue;
  const gstValue = 0.18 * totalCartValue;
  const totalValue = totalCartValue + gstValue;
  const discount = (0.2 * totalValue).toFixed(2);
  const finalValue = (totalValue - Number(discount)).toFixed(2);
  localStorage.setItem("cartValue", finalValue);

  const [userAddresses, setUserAddresses] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const fetchUserAddresses = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/getAddresses/${userId}`;
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        console.log(response.data);
        setUserAddresses(response.data);
        localStorage.setItem("Address", JSON.stringify(response.data));
      } else {
        console.error("Error fetching addresses.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

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
        console.log(shoppingCart);
        setCartItems(shoppingCart);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // fetching the API for the sending payment request 

  const fetchPriceAndSendRequest = async () => {
    const cartValue = localStorage.getItem("cartValue");
    console.log(cartValue);

    const payload = {
      items: [
        {
          price: parseFloat(cartValue), 
        },
      ],
    };

    axios
      .post("https://ecommerce-backend-0wr7.onrender.com/checkout", payload)
      .then((response) => {
        console.log("POST request response:", response.data);

        const { url } = response.data;

        if (url) {
          window.location.href = url;
        } else {
          console.error("Failed to initiate payment");
        }
      })
      .catch((error) => {
        console.error("POST request error:", error);
      });
  };
  return (
    <Fragment>
      <div className="conform-order-container">
        <h2 className="conform-heading">Confirm Order</h2>
        <div className="order-summary">
          <div className="address-details">
            <h3>Shipping Address</h3>
            {userAddresses && userAddresses.length > 0 ? (
              userAddresses.map((address, index) => (
                <div key={index}>
                  <h6
                    style={{
                      fontSize: "1.3rem",
                      color: "rgb(70, 11, 70)",
                      marginBottom: "1rem",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Address: {address.address}, {address.city}, {address.state}{" "}
                    - {address.pincode}, {address.country}
                  </h6>
                  <h6
                    style={{
                      fontSize: "1.1rem",
                      color: "rgb(70, 11, 70)",
                      fontFamily: "cursive",
                    }}
                  >
                    Phone Number: {address.phoneNumber}
                  </h6>
                </div>
              ))
            ) : (
              <p>No shipping addresses available.</p>
            )}
          </div>
          <div className="product-details">
            <h3>Product Details</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="inner-product-confirmOrder">
                <img
                  src={item.product.productImage}
                  alt={item.product.productName}
                />
                <h5>
                  <strong>Name:</strong> {item.product.productName}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h5>
                <h5>Category: {item.product.category}</h5>
              </div>
            ))}
          </div>
          <div className="payment-summary">
            <h3 id="heading-summary-payment">Payment Summary</h3>
            <h3 id="info-summary-payment">
              Hey Harshal, thanks for odering in spectastyle thanks for giving
              us chance to use our service pay the payment and enjoy our
              products 😄🎉
            </h3>
            <h6 id="value-summary-payment">
              Products value : {totalCartValue}
            </h6>
            <h6 id="value-summary-gst">GST of Products (18%): {gstValue}</h6>
            <h6 id="value-summary-gst">Discount Product(20%): {discount}</h6>
            <div className="line"></div>
            <h6 id="value-summary-total">Total Products value: {finalValue}</h6>
            <button
              onClick={fetchPriceAndSendRequest}
              style={{ marginTop: "1rem" }}
            >
              Proced with ₹{finalValue} Rs
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConformOrder;
