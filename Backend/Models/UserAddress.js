import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserAddress = new Schema({
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    },
    phoneNumber:{
        type: Number,
        require: true,
    },
    country: {
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
    }
})

export default mongoose.model("userAddress", UserAddress)