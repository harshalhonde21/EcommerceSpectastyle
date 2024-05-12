import Product from "../Models/Product.js";
import User from "../Models/User.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve products" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve product by ID" });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Unable to add product" });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
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
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(
      req.params.productId
    );
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete product" });
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId; 

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
};


export const getProductFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate({
      path: 'shoppingCart.product', // Populate the 'product' field in shoppingCart
      model: 'Product', // The name of the Product model
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const shoppingCart = user.shoppingCart;

    res.status(200).json({ shoppingCart });
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve shopping cart" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the cart item with the specified productId
    const itemIndex = user.shoppingCart.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Remove the item from the shoppingCart array
    user.shoppingCart.splice(itemIndex, 1);

    await user.save();

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Unable to remove product from cart" });
  }
};

// for adding review to my product spectastyle

export const addReviewToProduct = async (req, res, next) => {
  try {
    const userId = req.params.userId; 
    const reviewText = req.body.reviewText; 
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.reviews.push({
      user: userId,
      text: reviewText,
    });

    await product.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add review to product', error });
  }
};


