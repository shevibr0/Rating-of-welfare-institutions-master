import mongoose from "mongoose";
import { secret } from "../config/secret.js";

try {
  await mongoose.connect(secret.MONGO_URL);
  console.log("Connected successfully to database");
} catch (error) {
  console.log("error connecting to database:", error);
}
