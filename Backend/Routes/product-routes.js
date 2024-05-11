import express from "express";
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById, addProductToCart, getProductFromCart, deleteProductFromCart, addReviewToProduct } from "../Controller/product-controller.js";

const routers = express.Router();

routers.get('/', getAllProducts);
routers.get('/products/:productId', getProductById);
routers.post('/products', addProduct);
routers.put('/products/:productId', updateProduct);
routers.delete('/products/:productId', deleteProduct);
routers.post('/addProductToCart/:userId', addProductToCart);
routers.get('/shopping-cart/:userId', getProductFromCart);
routers.delete('/shopping-cart/:userId/:productId', deleteProductFromCart);
routers.post('/products/:productId/reviews/:userId', addReviewToProduct);

export default routers;