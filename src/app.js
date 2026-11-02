import express from "express";
import morgan from "morgan";
import paymentRouter from "./routes/payment.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "m.html"));
});

app.use("/api/payment", paymentRouter);

export default app;