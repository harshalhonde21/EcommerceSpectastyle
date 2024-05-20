import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/ProductDetail.css";
import { useCart } from "./CartContext";
import ErrorComponent from "../Components/Error";
import toast from "react-hot-toast";
import AddReview from "./AddReview";
import prodDefault from "../../public/prodDefault.jpg"

const ProductDetail = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [imgSrc, setImageSrc] = useState()

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
        setImageSrc(productData.productImage);
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
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;
      axios
        .post(
          `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/addProductToCart/${userId}`,
          { productId: product._id }
        )
        .then(() => {
          toast("Item Added To Cart!", {
            icon: "🥳",
            style: {
              borderRadius: "rgb(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            },
          });
          navigate("/cart");
          addToCart(product);
        })
        .catch((error) => {
          setError("Error adding the product to the cart");
          console.error("Error adding product to cart:", error);
        });
    }
  };

  return (
      <div className="product-detail-container">
        {error ? <ErrorComponent message={error} onClose={clearError} /> : null}

        {product ? (
          <>
            <div className="product-detail-left">
              <img
                src={imgSrc}
                alt={product.productName}
                onError={()=>{setImageSrc(prodDefault)}}
                className="product-detail-image"
              />
              <div className="product-detail-reviews">
                {reviews.slice(0, 2).map((review) => (
                  <div key={review._id} className="product-review-card">
                    <div className="customer-name">{userName}</div>
                    <div className="rating">{review.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-detail-right">
              <div className="product-detail-name">
                {product.productName}
              </div>
              <div className="product-detail-id">Product ID: {product._id}</div>
              <div className="product-detail-price">
                ₹{product.productPrice}
              </div>
              <div className="product-detail-description">
                <span>About this item:</span>
                 {product.productDescription} 
              </div>
              <div className="product-detail-status">
                <span>Status:</span>{product.status}
              </div>
              <div className="product-detail-status">
                <span>Category:</span>{product.category}
              </div>
              <div className="product-date-status">
                <span>Date:</span>{product.publishDate}
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
  );
};

export default ProductDetail;
