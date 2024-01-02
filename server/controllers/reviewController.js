import { Reviews } from '../models/reviewsModel.js'


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
  }
  ,
  async deleteReview({ query, payload }, res, next) {
    try {
      // Extract userId from the payload
      const userId = payload._id;

      // Extract userId from the query parameters (if it's included in the request)
      const reviewId = query.reviewId;
      const { deletedCount } = await Reviews.deleteOne({ _id: reviewId, userId })

      if (deletedCount) {
        return res.status(200).json({ msg: "deleted successful" })
      }
      else {
        next(true)
      }
    }
    catch (stack) {
      next({ stack })
    }
  }
}

export default reviewCtrl