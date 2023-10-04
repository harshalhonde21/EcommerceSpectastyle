import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Product.css";
import Loader from "../Components/Loader";
import ProductDetail from "../Components/ProductDetail"; // Import the ProductDetail component

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5500/ecommerce/product")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const openProductDetail = (productId) => {
    setSelectedProductId(productId);
  };

  const closeProductDetail = () => {
    setSelectedProductId(null);
  };

  return (
    <Fragment>
      <div className="product-container">
        <h1 className="product-heading">Products</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="product-all-container">
            {products.map((product) => (
              <div
                className="product-card"
                key={product._id}
                onClick={() => openProductDetail(product._id)}
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-image"
                />
                <h2 className="product-name">{product.productName}</h2>
                <h5 className="product-price">Rs. {product.productPrice}</h5>
                <h4 className="product-status">{product.status}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onClose={closeProductDetail}
        />
      )}
    </Fragment>
  );
};

export default Product;
