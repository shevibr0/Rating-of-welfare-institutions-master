import Institutes from "../models/Institute.js"

const instituteCtrl = {
    async getInstitutes({ query, body, payload },res,next){
        const { limit, offset } = query
      try {
          let institutes = []
          if (limit) {
            institutes = await Institutes.find({}).limit(limit).skip(offset || 0)
          }
          else {
            institutes = await Institutes.find({})
              return res.status(200).json(reviews)
          }
          return res.status(200).json({
              institutes,
              next: process.env.SERVER_URL +`Institutes/getInstitutes/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}`
          })
      } catch (error) {
          next({ stack: error, message: "faild to get" })
      }
      },
    async addRating({ query, body, payload }, res, next) {

        try {
            const resp = await Institutes.updateOne({ _id: query.institutId },
                {
                    $push: { Rating: { userId: payload._id, count: body.count } },
                    $inc: { "avgRating.sum": body.count, "avgRating.count": 1 }
                })
            console.log(resp)
            return res.status(200).send("rating adedd succsess")
        } catch (error) {
            next({ stack: error })
        }
    },
    async updateRating({ query, body, payload }, res, next) {

        try {
            const existingRating = await Institutes.findOne({
                '_id': query.institutId,
                'Rating.userId': payload._id
            }).select("Rating avgRating")
            console.log(existingRating)
            const sumRating = existingRating.avgRating.sum;
            existingRating.avgRating.sum -= sumRating;
            existingRating.avgRating.sum += body.count;
            for (const rating of existingRating.Rating) {
                if (rating.userId == payload._id) {
                    rating.count = body.count
                    break;
                }
            }
            await existingRating.save()
            return res.status(200).send("rating updated succsess")
        }
        catch (error) {
            next({ stack: error })
        }
    },

    async deleteRating({ query, body, payload }, res, next) {
        try {
            const existingRating = await Institutes.findOne({
                '_id': query.institutId,
                'Rating.userId': payload._id
            }).select("Rating avgRating")
            console.log(existingRating)
            let countRating=0;
            for (const rating of existingRating.Rating) {
                if (rating.userId == payload._id) {
                    countRating=rating.count
                    break;
                }
            }
            const result = await Institutes.updateOne(
                { _id: query.institutId },
                {
                    $pull: {
                        Rating: { userId: payload._id },
                    },
                    $inc: {
                        'avgRating.count': -1, // Decrease the count by 1
                        'avgRating.sum':-countRating , // Decrease the sum by the user's count
                    },
                }
            );
            console.log(result)

        } catch (error) {
            next({ stack: error });
        }
    },
    async search({ query, body, payload },res,next){
        try {
            const { limit, offset } = query
            let institutes = [];
        const searchValue=new RegExp( query.search, 'i')

        if (limit) {
            institutes =await Institutes.find({
                $or: [
                  { Name: searchValue },
                  { Type_Descr: searchValue },
                  { Head_Department: searchValue },
                  { Region_Descr: searchValue },
                  { City_Name: searchValue }
                ]
              }).limit(limit).skip(offset || 0)
        }
        else{
            institutes =await Institutes.find({
                $or: [
                  { Name: searchValue },
                  { Type_Descr: searchValue },
                  { Head_Department: searchValue },
                  { Region_Descr: searchValue },
                  { City_Name: searchValue }
                ]
              })

              return res.status(200).json(institutes)
        }
        return res.status(200).json({
            institutes,
            next: process.env.SERVER_URL +`Institutes/search/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}&search=${query.search}`
        })
       
        } catch (error) {
         next({stack:error})
        }
    }
}


export default instituteCtrl