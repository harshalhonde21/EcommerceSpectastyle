import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Product.css";
import Loader from "../Components/Loader";
import ProductDetail from "../Components/ProductDetail";
import toast from "react-hot-toast";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(''); 

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-0wr7.onrender.com/ecommerce/product")
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
    toast("Nice Choice Just Take It For You!", {
      icon: "😁",
      style: {
        borderRadius: "rgb(189, 224, 254)",
        background: "rgb(70, 11, 70)",
        color: "rgb(255, 210, 255)",
      },
    });
    setSelectedProductId(productId);
  };

  const closeProductDetail = () => {
    setSelectedProductId(null);
  };

  const filterProducts = () => {
    return products.filter((product) => {
      return (
        (product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase()) ||
        product.productPrice.toString().includes(searchText))&&
        (selectedCategory=='' || product.category.toLowerCase()===selectedCategory.toLocaleLowerCase())
      );
    });
  };

  // Get unique categories using Set
  const uniqueCategories = [...new Set(products.map((product) => product.category))]; 

  const handleCategory = (category) => {
    setSelectedCategory(category);
  }

  //Sorting the products on the basis of views
  const sortMostViewed = () => {
    const sortedProducts = products.slice().sort((a, b) => b.views - a.views);
    setProducts(sortedProducts);
  }

  
  return (
<Fragment>
  <div className="product-container">
    <h1 className="product-heading">Products</h1>
    <input
      type="text"
      placeholder="Search by Name, category or price..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
    {loading ? (
      <div className="loader-container">
        <Loader />
      </div>
    ) : (
      <div className="product-all-container">
        {filterProducts().map((product) => (
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
