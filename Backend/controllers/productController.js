import Product from "../Models/Product.js";
import User from "../Models/User.js";

// Product-related controllers
export const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve products" });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve product by ID" });
    }
  },

  // Add a new product
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: "Unable to add product" });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Unable to update product" });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndRemove(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: "Unable to delete product" });
    }
  },

  // Add a review to a product
  addReviewToProduct: async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const { reviewText } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product.reviews.push({
        user: userId,
        text: reviewText,
      });

      await product.save();
      res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Unable to add review to product", error });
    }
  },
};

// User-related controllers
export const userController = {
  // Add a product to the user's cart
  addProductToCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const { productId } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const cartItem = {
        product: productId,
      };

      user.shoppingCart.push(cartItem);
      await user.save();

      res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
      res.status(500).json({ error: "Unable to add product to cart" });
    }
  },

  // Get the user's shopping cart
  getProductFromCart: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).populate({
        path: "shoppingCart.product",
        model: "Product",
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const shoppingCart = user.shoppingCart;
      res.status(200).json({ shoppingCart });
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve shopping cart" });
    }
  },

  // Remove a product from the user's cart
  deleteProductFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const itemIndex = user.shoppingCart.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ error: "Product not found in the cart" });
      }

      user.shoppingCart.splice(itemIndex, 1);
      await user.save();

      res.json({ message: "Product removed from cart" });
    } catch (error) {
      res.status(500).json({ error: "Unable to remove product from cart" });
    }
  },
};