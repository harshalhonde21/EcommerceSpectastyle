import express from "express";
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from "../Controller/product-controller.js";

const routers = express.Router();

routers.get('/', getAllProducts);
routers.get('/products/:productId', getProductById);
routers.post('/products', addProduct);
routers.put('/products/:productId', updateProduct);
routers.delete('/products/:productId', deleteProduct);

export default routers;