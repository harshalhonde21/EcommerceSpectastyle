import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
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
  shoppingCart: [cartItemSchema],
  
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: "UserAddress",
  }],
});

export default mongoose.model("ecommerceUser", userSchema);
