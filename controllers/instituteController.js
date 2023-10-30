import Institutes from "../models/Institute.js"

const instituteCtrl = {
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
    }

}

export default instituteCtrl