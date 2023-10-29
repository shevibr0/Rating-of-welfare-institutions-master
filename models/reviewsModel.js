import mongoose from "mongoose";

//? create schema
const reviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    InstitutesId: String,
    StringReview: String,
}, { timestamps: true }
);


//? create model (collection, schema)
export const Reviews = mongoose.model("reviews", reviewsSchema);