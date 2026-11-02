import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
 
     orderId:{
        type:String,
        required:true,
        unique:true
     },
     paymentId:{
        type:String
     },
     signature:{
        type:String
     },
     amount:{
        type:Number,
        required:true
     },
     currency:{
        type:String,
        default:"INR"
     },
     productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"products",
      required:[true,"productId is required"]
     },

 
     status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
     }






},{timestamps:true})



const paymentModel = mongoose.model("payments",paymentSchema);

export default paymentModel;
