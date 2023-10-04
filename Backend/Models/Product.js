import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    type : String,
  },
  productDescription:{
    type: String,
  },
  productImage:{
    type: String,
  },
  status:{
    type:String,
  }
});

export default mongoose.model("Product", productSchema)
