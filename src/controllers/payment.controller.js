import _config from "../config/config.js";
import razorpay from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import productModel from "../models/products.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

export const productOrderController = async (req, res) => {
  const { productId } = req.params;
  console.log("helo", productId);

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(401).json({
      success: false,
      message: "ProductId is not found",
    });
  }
  const order = await razorpay.orders.create({
    amount: Math.floor(product.price.amount * 1000),
    currency: product.price.currency,
    receipt: `order_receiptId ${productId}`,
    notes: {
      productId: productId,
      productTitle: product.title,
    },
  });

  const payment = (
    await paymentModel.create({
      orderId: order.id,
      productId: productId,
      amount: product.price.amount,
      currency: product.price.currency,
      status: "pending",
    })
  ).toObject();

  return res.status(201).json({
    success: true,
    message: "success",
    ...payment,
    keyId: razorpay.key_id,
  });
};

export const orderVerifyController = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log("🚀 ~ orderVerifyController ~ signature:", signature)
  console.log("🚀 ~ orderVerifyController ~ paymentId:", paymentId)
  console.log("🚀 ~ orderVerifyController ~ orderId:", orderId)
  if (!orderId || !paymentId || !signature) {
    return res.status(401).json({
      success: false,
      message: "all field are required",
    });
  }

  const order = await paymentModel.findOne({
    orderId: orderId,
    status: "pending",
  });

  if (!order) {
    return res.status(401).json({
      success: false,
      message: "orderId not found",
    });
  }

  const isValid = validatePaymentVerification(
    {
      order_id: orderId,
      payment_id: paymentId,
    },
    signature,

    _config.RAZORPAY_TEST_KEY_SECRET,
  );

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: "payment failed...",
    });
  }

 const result = await paymentModel.updateOne(
    {
        orderId: orderId,
        status: "pending"
    },
    {
        $set: {
            status: "completed",
            paymentId: paymentId,
            signature: signature
        }
    }
);

if (result.modifiedCount === 0) {
    return res.status(400).json({
        success: false,
        message: "Payment already verified or order not found"
    });
}
   
};
