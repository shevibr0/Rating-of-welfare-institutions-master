import { Reviews } from '../models/reviewsModel.js'
import Institutes from '../models/Institute.js';
import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv"
import { Image } from "../models/pictures.js"
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const reviewCtrl = {
  async getReviews({ query, body, payload }, res, next) {
    const { limit, offset, institutId } = query
    try {
      let reviews = []
      if (limit) {
        reviews = await Reviews.find({ InstitutesId: institutId }).populate({ path: "userId", select: "name" }).sort({ createdAt: -1 }).limit(limit).skip(offset || 0)
      }
      else {
        reviews = await Reviews.find({ InstitutesId: institutId }).populate({ path: "userId", select: "name" }).sort({ createdAt: -1 })
        return res.status(200).json(reviews)
      }
      return res.status(200).json({
        reviews,
        next: process.env.SERVER_URL + `reviews/getReviews/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}`
      })
    } catch (error) {
      next({ stack: error, message: "faild to get" })
    }
  },
  async addReview({ query, body, payload }, res, next) {
    try {
      const userId = payload._id;
      const institutId = query.institutId;


      // Check if the user has already added a review
      const existingReview = await Reviews.findOne({ institutId, userId });

      if (existingReview) {
        return res.status(400).json({ msg: "User has already added a review" });
      }
      // Extract data from the request body
      const {
        Collaboration,
        Maintenance,
        ReligiousLevel,
        AdjacentPsychiatrist,
        HostFamilyOption,
        StayOnSaturdaysAndHolidays,
        isBoardingSchool,
        emotionalResponse,
        afternoonClasses
      } = body;
      const religiousLevels = ['religious', 'secular', 'orthodox'];
      // Create a new review document
      const newReview = new Reviews({
        userId: payload._id, // Use the user ID from the payload
        InstitutesId: query.institutId, // Assuming you want to use the "institutId" from the query
        Collaboration: {
          comment: Collaboration.comment || '',
          rating: Collaboration.rating || null, // Set rating to null if not provided
        },
        Maintenance: {
          comment: Maintenance.comment || '',
          rating: Maintenance.rating || null,
        },
        ReligiousLevel: {
          comment: ReligiousLevel.comment || '',
          enum: ReligiousLevel.enum.length > 0 ? [ReligiousLevel.enum] : null,
          rating: null, // No rating for ReligiousLevel in the addReview function
        },
        AdjacentPsychiatrist: {
          comment: AdjacentPsychiatrist.comment || '',
          response: AdjacentPsychiatrist.response || false,
          rating: null, // No rating for AdjacentPsychiatrist in the addReview function
        },
        HostFamilyOption: {
          comment: HostFamilyOption.comment || '',
          response: HostFamilyOption.response || false,
          rating: null, // No rating for HostFamilyOption in the addReview function
        },
        StayOnSaturdaysAndHolidays: {
          comment: StayOnSaturdaysAndHolidays.comment || '',
          response: StayOnSaturdaysAndHolidays.response || false,
          rating: null, // No rating for StayOnSaturdaysAndHolidays in the addReview function
        },
        isBoardingSchool: {
          comment: isBoardingSchool.comment || '',
          response: isBoardingSchool.response || false,
          rating: null,
        },
        emotionalResponse: {
          comment: emotionalResponse.comment || '',
          response: emotionalResponse.response || false,
          rating: emotionalResponse.rating || null,
        },
        afternoonClasses: {
          comment: afternoonClasses.comment || '',
          response: afternoonClasses.response || false,
          rating: afternoonClasses.rating || null,
        },
      });

      newReview.averageRating = newReview.get('averageRating');

      // Save the review to the database
      await newReview.save();

      res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      next({ stack: error });
    }
  },
  async uploadImages(req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const uploadedImages = req.files; // Storing uploaded files in uploadedImages variable
      if (!uploadedImages) {
        return res.status(400).json({ error: 'No images uploaded' });
      }

      const uploadedImageUrls = await Promise.all(Object.values(uploadedImages).map(async (image) => {
        try {
          // Upload image to Cloudinary
          const uploadOptions = {
            upload_preset: 'smqqbj8u',
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
          };
          const upload = await cloudinary.uploader.upload(image.tempFilePath, uploadOptions);
          // Check if an image document exists for the given institution ID
          let imageDocument = await Image.findOne({ institutionCode: req.body.institutId });

          if (imageDocument) {
            // If an image document exists, update the existing document by pushing the new image URL
            imageDocument.images.push(upload.secure_url);
          } else {
            // If no image document exists, create a new document with the institution ID and the new image URL
            imageDocument = new Image({
              userId: req.payload._id,
              institutionCode: req.body.institutId,
              cloudinaryPublicId: upload.public_id,
              images: [upload.secure_url]
            });
          }

          // Save the updated or new Image document to the database
          await imageDocument.save();
          // Return the secure_url
          return upload.secure_url;
        } catch (error) {
          console.error("Error uploading image:", error);
          throw error;
        }
      }));

      res.status.json({ imageUrls: uploadedImageUrls });

    } catch (error) {
      console.error("Error during image upload:", error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  }
  ,
  async getImages({ query }, res, next) {
    try {
      const institutId = query.institutId;
      // Find images by institution ID
      const imagesData = await Image.find({ institutionCode: institutId });

      // Extract image URLs from the imagesData
      const imageUrls = imagesData.map(image => image.images).flat();

      // Send the image URLs as a response
      res.status(200).json({ imageUrls });
    } catch (error) {
      next({ stack: error });
    }
  }
  ,

  async hasImages({ query }, res, next) {
    try {
      const id = query.institutId;
      console.log("idd", id)
      // Check if there are any images associated with the institution ID
      const imageDocument = await Image.findOne({ institutionCode: id });
      console.log("imageDocument", imageDocument)
      return !!imageDocument; // Return true if imageDocument exists, false otherwise
    } catch (error) {
      next({ stack: error });
    }
  }
  ,
  async deleteReview({ query, body, payload }, res, next) {
    try {
      const userId = payload._id;
      const reviewId = query.reviewId;
      const institutId = body.institutId;


      const existingReview = await Reviews.findOne({ _id: reviewId, userId });

      if (!existingReview) {
        return res.status(404).json({ msg: "Review not found" });
      }

      // Check if 'Rating' property exists before accessing it
      if (existingReview.Rating) {
        // Call the deleteRating function to update the average and count
        await deleteRating({ query: { institutId }, body, payload }, res, next);
      }

      // Delete the review
      const { deletedCount } = await Reviews.deleteOne({ _id: reviewId, userId });

      if (deletedCount) {
        // Update the Institutes collection
        const existingRating = await Institutes.findOne({
          '_id': institutId,
          'Rating.userId': userId
        }).select("Rating avgRating");

        // Check if 'existingRating' is truthy before accessing its properties
        if (existingRating) {
          let countRating = 0;

          for (const rating of existingRating.Rating) {
            if (rating.userId == userId) {
              countRating = rating.count;
              break;
            }
          }

          const result = await Institutes.updateOne(
            { _id: institutId },
            {
              $pull: {
                Rating: { userId },
              },
              $inc: {
                'avgRating.count': -1, // Decrease the count by 1
                'avgRating.sum': -countRating, // Decrease the sum by the user's count
              },
            }
          );

          if (result.ok === 1) {
            return res.status(200).json({ msg: "Deleted successfully" });
          } else {
            return res.status(500).json({ msg: "Failed to update Institutes collection" });
          }
        } else {
          return res.status(404).json({ msg: "Institute not found" });
        }
      } else {
        return res.status(404).json({ msg: "Review not found" });
      }
    } catch (error) {
      next({ stack: error });
    }
  }
  ,
  async getReviewIdByInstitutesId(req, res, next) {
    try {
      const { instituteId, userId } = req.query;
      let query = {};

      if (instituteId) {
        query.InstitutesId = instituteId;
      }

      if (userId) {
        query.userId = userId;
      }

      const review = await Reviews.findOne(query, '_id');

      if (review) {
        res.status(200).json({ reviewId: review._id });
      } else {
        res.status(404).json({ message: 'Review not found for the given parameters' });
      }
    } catch (error) {
      console.error('Error fetching review id:', error);
      next(error);
    }
  },
  async getReviewDetails({ query, body, payload }, res, next) {
    try {
      const reviewId = query.reviewId;
      const reviewDetails = await Reviews.findById(reviewId).populate({ path: "userId", select: "name" });


      if (!reviewDetails) {
        return res.status(404).json({ msg: "Review details not found" });
      }

      // Wrap the result in an array before sending the response
      res.status(200).json([reviewDetails]);
    } catch (error) {
      next({ stack: error, message: "Failed to get review details" });
    }
  }
}


export default reviewCtrl