import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// Products
router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productController.getProductById);
router.post("/products", productController.addProduct);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);

// Shopping Cart
router.post("/users/:userId/cart/products", productController.addProductToCart);
router.get("/users/:userId/cart/products", productController.getProductFromCart);
router.delete("/users/:userId/cart/products/:productId", productController.deleteProductFromCart);

// Reviews
router.post("/products/:productId/reviews/:userId", productController.addReviewToProduct);

export default router;