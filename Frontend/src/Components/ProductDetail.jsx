import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ProductDetail.css"; 

const ProductDetail = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  return (
    <div className="product-detail-container">
      {product ? (
        <>
          <div className="product-detail-left">
            <img
              src={product.productImage}
              alt={product.productName}
              className="product-detail-image"
            />
            <div className="product-detail-reviews">
              <div className="product-review-card">
                <h3 className="customer-name">Harshal Honde</h3>
                <h5 className="rating">★★★★★</h5>
              </div>
              <div className="product-review-card">
                <h3 className="customer-name">Kunal Honde</h3>
                <h5 className="rating">★★★★★</h5>
              </div>
            </div>
          </div>
          <div className="product-detail-right">
            <h2 className="product-detail-name">
              Name : - &nbsp;{product.productName}
            </h2>
            <h3 className="product-detail-id">
              Product ID : - &nbsp; {product._id}
            </h3>
            <h5 className="product-detail-price">
              Price :- Rs. {product.productPrice}
            </h5>
            <h3 className="product-detail-description">
              Description : - {product.productDescription}
            </h3>
            <h3 className="product-detail-status">Status:- {product.status}</h3>
            <h3 className="product-detail-status">category:- {product.category}</h3>
            <h3 className="product-date-status">
              Date :- {product.publishDate}
            </h3>
            <button className="product-detail-add-to-cart">Add to Cart</button>
            <br />
            <button className="product-detail-close-button">Add review</button>
            <div className="close-button" onClick={onClose}>
              <div className="cross-line"></div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetail;
