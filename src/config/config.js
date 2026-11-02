import { config } from "dotenv";
config();

if(!process.env.MONGO_URI){
    throw new Error("invornmental variable:MONGO_URI");
}
if(!process.env.RAZORPAY_TEST_API_KEY){
    throw new Error("invornmental variable:RAZORPAY_TEST_API_KEY");
}
if(!process.env.RAZORPAY_TEST_KEY_SECRET){
    throw new Error("invornmental variable:RAZORPAY_TEST_KEY_SECRET");
 
}


const _config  = {
    RAZORPAY_TEST_KEY_SECRET:process.env.RAZORPAY_TEST_KEY_SECRET,
    RAZORPAY_TEST_API_KEY:process.env.RAZORPAY_TEST_API_KEY,
    MONGO_URI:process.env.MONGO_URI
};
export default _config;