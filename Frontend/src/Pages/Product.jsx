import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Product.css";
import Loader from "../Components/Loader";
import ProductDetail from "../Components/ProductDetail";
import toast from "react-hot-toast";
import CustomDropdown from "./CustomDropdown";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortByDate, setSortByDate] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-0wr7.onrender.com/ecommerce/product")
      .then((response) => {
        setProducts(response.data);
        const uniqueCategories = Array.from(
          new Set(response.data.map((product) => product.category))
        );
        setCategories(uniqueCategories);
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
    let filteredProducts = products;

    if (searchText) {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          product.productName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase()) ||
          product.productPrice.toString().includes(searchText)
        );
      });
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === "price-asc") {
          return a.productPrice - b.productPrice;
        } else if (sortOrder === "price-desc") {
          return b.productPrice - a.productPrice;
        }
        return 0;
      });
    }

    if (sortByDate) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortByDate === "date-asc") {
          return new Date(a.publishDate) - new Date(b.publishDate);
        } else if (sortByDate === "date-desc") {
          return new Date(b.publishDate) - new Date(a.publishDate);
        }
        return 0;
      });
    }

    return filteredProducts;
  };

  // Sorting the products on the basis of views
  const sortMostViewed = () => {
    const sortedProducts = products.slice().sort((a, b) => b.views - a.views);
    setProducts(sortedProducts);
  };

  return (
    <Fragment>
      <div className="product-container">
        <h1 className="product-heading">Products</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Name, category or price..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="filters">
          <CustomDropdown
            className="filterSelect"
            options={[
              { value: "", label: "Sort by Price" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
            ]}
            onChange={(value) => setSortOrder(value)}
            value={sortOrder}
            isOpen={openDropdown === "sortOrder"}
            setIsOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "sortOrder" : null)
            }
          />
          <CustomDropdown
            className="filterSelect"
            options={[
              { value: "", label: "Filter by Category" },
              ...categories.map((category) => ({
                value: category,
                label: category,
              })),
            ]}
            onChange={(value) => setSelectedCategory(value)}
            value={selectedCategory}
            isOpen={openDropdown === "selectedCategory"}
            setIsOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "selectedCategory" : null)
            }
          />
          <CustomDropdown
            className="filterSelect"
            options={[
              { value: "", label: "Sort by Publish Date" },
              { value: "date-asc", label: "Date: Oldest to Newest" },
              { value: "date-desc", label: "Date: Newest to Oldest" },
            ]}
            onChange={(value) => setSortByDate(value)}
            value={sortByDate}
            isOpen={openDropdown === "sortByDate"}
            setIsOpen={(isOpen) =>
              setOpenDropdown(isOpen ? "sortByDate" : null)
            }
          />
        </div>
        {loading ? (
          <Loader />
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
