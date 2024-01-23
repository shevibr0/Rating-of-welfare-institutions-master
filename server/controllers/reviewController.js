import { Reviews } from '../models/reviewsModel.js'
import Institutes from '../models/Institute.js';


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
      const institutId = body.institutId;

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

  async deleteReview({ query, body, payload }, res, next) {
    try {
      const userId = payload._id;
      const reviewId = query.reviewId;
      const institutId = body.institutId;
      console.log("institutIddddd", institutId)
      console.log("reviewIddd", reviewId)
      console.log("userId", userId)

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
  async getReviewDetails({ query, body, payload }, res, next) {
    try {
      const reviewId = query.reviewId;
      console.log("reviewId", reviewId);
      const reviewDetails = await Reviews.findById(reviewId).populate({ path: "userId", select: "name" });
      console.log("reviewDetails", reviewDetails);

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