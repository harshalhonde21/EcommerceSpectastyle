import { Fragment, useEffect, useState } from 'react';
import '../css/AllProducts.css';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    // get re products
    axios.get('https://ecommerce-backend-0wr7.onrender.com/ecommerce/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (productId) => {
    if (!productId) {
      console.error('Invalid product ID');
      return;
    }
    // delete re product by id
    axios.delete(`https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/products/${productId}`)
      .then(() => {
        fetchProducts(); 
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const openUpdateForm = (product) => {
    setIsUpdating(true);
    setUpdateProduct(product);
  };

  const closeUpdateForm = () => {
    setIsUpdating(false);
    setUpdateProduct({});
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    // update re product by id
    axios.put(`https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/products/${updateProduct._id}`, updateProduct)
      .then(() => {
        fetchProducts(); 
        closeUpdateForm(); 
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <div className="outer-allproducts">
        <h1 style={{ textAlign: 'center' }}>
          All&nbsp;&nbsp;Products&nbsp;&nbsp;(Deletion & Update)
        </h1>
        <br />

        <input
          className='search-barss'
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>product-Name</th>
              <th>product-Price</th>
              <th>publish-Date</th>
              <th>Category</th>
              <th>product-Description</th>
              <th>product-Image</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.publishDate}</td>
                <td>{product.category}</td>
                <td>{product.productDescription}</td>
                <td>{product.productImage}</td>
                <td>{product.status}</td>
                <td>
                  <button className='button-updele' onClick={() => handleDelete(product._id)}>Delete</button>
                  <button className='button-updele' onClick={() => openUpdateForm(product)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isUpdating && (
          <div className="update-form">
            <h2>Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                placeholder="Product Id"
                value={updateProduct._id || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, _id: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Product Name"
                value={updateProduct.productName || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, productName: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Product Price"
                value={updateProduct.productPrice || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, productPrice: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Publish Date"
                value={updateProduct.publishDate || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, publishDate: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={updateProduct.category || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Product Description"
                value={updateProduct.productDescription || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, productDescription: e.target.value })}
              />
              <input
                type="text"
                placeholder="Product Image"
                value={updateProduct.productImage || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, productImage: e.target.value })}
              />
              <input
                type="text"
                placeholder="Product Description"
                value={updateProduct.status || ''}
                onChange={(e) => setUpdateProduct({ ...updateProduct, status: e.target.value })}
              />
              
              <button type="submit">Update</button>
              <button type="button" onClick={closeUpdateForm}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AllProducts;
