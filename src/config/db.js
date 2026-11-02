import mongoose from "mongoose";
import dns from "dns";
 
import _config from "./config.js";
 
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectToDb = async() => {
  try {
    await mongoose.connect(_config.MONGO_URI);
    console.log("connect to database");
  } catch (error) {
    console.log("something went wrong from database connection ", error);
  }
};

export default connectToDb;
