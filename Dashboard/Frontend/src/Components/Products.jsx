import { Fragment, useState } from "react";
import "../css/Products.css";
import Errors from "../Components/Errors";
import axios from "axios";

const Products = () => {

  const initialFormData = {
    productName: "",
    productPrice: "",
    publishDate: "",
    category: "",
    productDescription: "",
    productImage: "",
    status: "In Status",
  };


  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/products",
        formData
      );

      if (response.status === 201) {
        setError("Form Submitted")
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <Fragment>
      <div className="outer-products">
        <h1 style={{ textAlign: "center" }}>Products Manipulation</h1>
        <br />
        <div className="product-form">
          <h2>Add a New Product</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Product Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder="Product Price"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="publishDate"
                name="publishDate"
                placeholder="Publish Date"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Category of product"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                id="productDescription"
                name="productDescription"
                placeholder="Product Description"
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="productImage"
                name="productImage"
                placeholder="Product Image URL"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" required>
                <option value="Out Status">Out Status</option>
                <option value="In Status">In Status</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>
      {error && <Errors message={error} onClose={closeError} />}
      </div>
    </Fragment>
  );
};

export default Products;
