import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'ecommerceUser',
  },
  text: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  publishDate: {
    type: String,
  },
  category: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productImage: {
    type: String,
  },
  status: {
    type: String,
  },
  views:{
    type: Number,
    default: 0,
  },
  reviews: [ReviewSchema], // Array of reviews
});

export default mongoose.model('Product', productSchema);
