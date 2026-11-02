import mongoose from "mongoose";

const productSchema  = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        amount:{
            type:Number,
            require:true
        },
        currency:{
            type:String,
            default:"INR"
        }
    }
},{timestamps:true})


const productModel = mongoose.model("products",productSchema);


export default productModel;