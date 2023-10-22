// user-model.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
  }
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shoppingCart: [cartItemSchema], // Array of cart items
});

export default mongoose.model("ecommerceUser", userSchema);
