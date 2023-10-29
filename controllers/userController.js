import { User } from "../models/userModel.js";

export const userCtrl = {
    myProfile: async(req, res) => {
        try {
            const { _id } = req.payload;
            const user = await User.findById(_id).select('-password')

                // const user = await User.findOne({ _id },{ password: 0 })
            return res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}