import { Router } from "express";
import { orderVerifyController, productOrderController } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/verify",orderVerifyController)

paymentRouter.post("/:productId/",productOrderController);




export default paymentRouter;