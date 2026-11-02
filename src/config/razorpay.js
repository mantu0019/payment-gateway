import Razorpay from "razorpay";

import _config from "./config.js";
const razorpay = new Razorpay({
  key_id: _config.RAZORPAY_TEST_API_KEY,
  key_secret: _config.RAZORPAY_TEST_KEY_SECRET,
});

export default razorpay;
