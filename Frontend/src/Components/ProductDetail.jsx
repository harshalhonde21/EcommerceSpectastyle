import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/ProductDetail.css";
import { useCart } from "./CartContext";
import ErrorComponent from "../Components/Error";
import toast from "react-hot-toast";
import AddReview from "./AddReview";

const ProductDetail = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const userName =
    (localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).name) ||
    "Demo";

  const userId = localStorage.getItem("userData");

  const clearError = () => {
    setError(null);
    navigate("/profile");
  };

  useEffect(() => {
    axios
      .get(
        `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/products/${productId}`
      )
      .then((response) => {
        const productData = response.data;
        productData.quantity = 1;
        setProduct(productData);
        setReviews(productData.reviews);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Login first to add the product to the cart");
    } else if (!selectedSize) {
      setError("Please select a size");
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;
      axios
        .post(
          `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/addProductToCart/${userId}`,
          { productId: product._id, size: selectedSize }
        )
        .then(() => {
          toast("Item Added To Cart!", {
            icon: "🥳",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          navigate("/cart");
          addToCart({ ...product, size: selectedSize });
        })
        .catch((error) => {
          setError("Error adding the product to the cart");
          console.error("Error adding product to cart:", error);
        });
    }
  };

  return (
    <div className="product-detail-layer">
      <div className="product-detail-container">
        {error ? <ErrorComponent message={error} onClose={clearError} /> : null}

        {product ? (
          <>
            <div className="product-detail-left">
              <img
                src={product.productImage}
                alt={product.productName}
                className="product-detail-image"
              />
              <div className="product-detail-reviews">
                {reviews.slice(0, 2).map((review) => (
                  <div key={review._id} className="product-review-card">
                    <h3 className="customer-name">{userName}</h3>
                    <h5 className="rating">{review.text}</h5>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-detail-right">
              <h2 className="product-detail-name">
                Name: {product.productName}
              </h2>
              <h3 className="product-detail-id">Product ID: {product._id}</h3>
              <h5 className="product-detail-price">
                Price: Rs. {product.productPrice}
              </h5>
              <h3 className="product-detail-description">
                Description: {product.productDescription}
              </h3>
              <h3 className="product-detail-status">
                Status: {product.status}
              </h3>
              <h3 className="product-detail-category">
                Category: {product.category}
              </h3>
              <h3 className="product-date-status">
                Date: {product.publishDate}
              </h3>
              <div className="product-detail-sizes" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <h3>Select Size:</h3>
                {[4, 6, 10, 12, 14, 16].map((size) => (
                  <div key={size} className="product-size-option" style={{ position: 'relative' }}>
                    <input
                      type="radio"
                      id={`size-${size}`}
                      name="size"
                      value={size}
                      style={{ display: 'none' }}
                      onChange={() => setSelectedSize(size)}
                    />
                    <label
                      htmlFor={`size-${size}`}
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        backgroundColor: selectedSize === size ? '#007bff' : '#fff',
                        color: selectedSize === size ? '#fff' : '#000',
                        borderColor: selectedSize === size ? '#007bff' : '#ccc',
                      }}
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
              <button
                className="product-detail-add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <br />
              {/* Updated the onClick handler to toggle the modal */}
              <button
                className="product-detail-close-button"
                onClick={() => {
                  if (userId) {
                    setShowAddReview(!showAddReview);
                  } else {
                    setError("First Login to add the review");
                  }
                }}
              >
                Add review
              </button>
              <div className="close-button" onClick={onClose}>
                <div className="cross-line"></div>
              </div>

              {showAddReview && (
                <AddReview
                  productId={product._id}
                  onClose={() => setShowAddReview(false)}
                />
              )}
            </div>
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
