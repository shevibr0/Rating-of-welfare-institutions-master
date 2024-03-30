import mongoose, { Document } from "mongoose";



// Define schema for Image Agreement
const ImageSchema = new mongoose.Schema({
    userId: string,
    institutionCode: string,
    cloudinaryPublicId: string,
    images: { type: [String] }
}, { timestamps: true });

// Create model for Image Agreement collection

const Image = mongoose.model("Images", ImageSchema);
export default Image;
