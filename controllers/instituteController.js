import Institutes from "../models/Institute.js"

const instituteCtrl = {
    async addRating({query,body,payload}, res, next) {
        
        try {
          const resp=await Institutes.updateOne({_id:query.institutId},
           {
                $push:{Rating:{userId:payload._id,count:body.count}},
                $inc:{"avgRating.sum":body.count,"avgRating.count":body.count}
            })  
            console.log(resp)
            return res.status(200).send("rating dded succsess")
        } catch (error) {
            next({stack:error})
        }
    },
    async updateRating(req,res,next) {

    },
    async deleteRating(req,res,next) {

    }
}

export default instituteCtrl