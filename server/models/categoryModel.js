import mongoose from "mongoose";

//? create schema
const categorySchema = new mongoose.Schema({
    categoryName: String
});
//? create model (collection, schema)
export const Category = mongoose.model("categories", categorySchema);