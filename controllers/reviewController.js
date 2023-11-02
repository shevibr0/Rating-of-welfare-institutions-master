import { Reviews } from '../models/reviewsModel.js'


const reviewCtrl = {
  async getInstitutes(){

  },
  async getReviews({ query, body, payload },res,next){
    const { limit, offset } = query
  try {
      let reviews = []
      if (limit) {
          reviews = await Reviews.find({}).sort({ createdAt: -1 }).limit(limit).skip(offset || 0)
      }
      else {
          reviews = await Reviews.find({}).sort({ createdAt: -1 })
          return res.status(200).json(reviews)
      }
      return res.status(200).json({
          reviews,
          next: process.env.SERVER_URL +`reviews/getReviews/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}`
      })
  } catch (error) {
      next({ stack: error, message: "faild to get" })
  }
  },
  async addReview({ query, body, payload }, res, next) {
    try {
      // Extract data from the request body
      const { StringReview } = body;

      // Create a new review document
      const newReview = new Reviews({
        userId: payload._id, // Use the user ID from the payload
        InstitutesId: query.institutId, // Assuming you want to use the "institutId" from the query
        StringReview,
      });
      console.log("newReview", newReview)
      // Save the review to the database
      await newReview.save();

      res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      next({ stack: error })
    }
  },



  async deleteReview({ query, payload }, res,next) {
    try {
      // Extract userId from the payload
      const userId = payload._id;

      // Extract userId from the query parameters (if it's included in the request)
      const reviewId = query.reviewId;
      const { deletedCount } = await Reviews.deleteOne({ _id: reviewId, userId })

      if (deletedCount) {
        return res.status(200).json({msg:"deleted successful"})
      }
    else{
      next(true)
    }}
       catch (stack) {
        next({ stack })
      }
    }
}

export default reviewCtrl