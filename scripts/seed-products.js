import mongoose from "mongoose";
import { config } from "dotenv";
 import productModel from "../src/models/products.model.js";

 import dns from "dns";
 config();
 
 dns.setServers(["8.8.8.8", "1.1.1.1"]);

const sampleProducts = [
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI.",
    price: { amount: 899, currency: "INR" },
  },
  {
    title: "Mechanical Keyboard",
    description: "Compact mechanical keyboard with tactile switches.",
    price: { amount: 3499, currency: "INR" },
  },
  {
    title: "USB-C Charger",
    description: "Fast 30W USB-C wall charger.",
    price: { amount: 1299, currency: "INR" },
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with rich stereo sound.",
    price: { amount: 2499, currency: "INR" },
  },
  {
    title: "Laptop Stand",
    description: "Adjustable aluminum stand for laptops.",
    price: { amount: 1599, currency: "INR" },
  },
  {
    title: "Noise-Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation.",
    price: { amount: 5999, currency: "INR" },
  },
  {
    title: "Webcam",
    description: "Full HD webcam with a built-in microphone.",
    price: { amount: 2199, currency: "INR" },
  },
  {
    title: "Smart LED Bulb",
    description: "Wi-Fi enabled dimmable LED bulb with adjustable color.",
    price: { amount: 699, currency: "INR" },
  },
  {
    title: "Power Bank",
    description: "10000mAh portable power bank with USB-C charging.",
    price: { amount: 1799, currency: "INR" },
  },
  {
    title: "Fitness Tracker",
    description: "Water-resistant fitness tracker with heart-rate monitoring.",
    price: { amount: 2999, currency: "INR" },
  },
];

try {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set. Add it to your environment or .env file.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existingProducts = await productModel
    .find({ title: { $in: sampleProducts.map(({ title }) => title) } })
    .select("title")
    .lean();
  const existingTitles = new Set(existingProducts.map(({ title }) => title));
  const productsToInsert = sampleProducts.filter(
    ({ title }) => !existingTitles.has(title),
  );

  if (productsToInsert.length > 0) {
    await productModel.insertMany(productsToInsert);
  }

  console.log(
    `Product seeding complete: ${sampleProducts.length} sample products available; ${productsToInsert.length} inserted.`,
  );
} catch (error) {
  console.error("Product seeding failed:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
