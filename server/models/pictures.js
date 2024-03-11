import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    institutionCode: {
        type: String,
        required: true
    },
    cloudinaryPublicId: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    }
}, { timestamps: true });

export const Image = mongoose.model("images", imageSchema);
