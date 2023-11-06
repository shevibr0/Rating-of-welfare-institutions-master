import mongoose from "mongoose";

//? create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
},{timestamps:true}
);


//? create model (collection, schema)
export const User = mongoose.model("users", userSchema);