import { User } from "../models/userModel.js";
import { createToken } from "../utils/authUtils.js";
import userValidation from "../validations/userValidation.js";
import { hash, compare } from "bcrypt";
//! use return to stop the function


// const object={
//    test(){

//    }
// }
const authCtrl = {
    register: async(req, res,next) => {
        const bodyData = req.body;

        try {
            //? validate the data before create new user
            
            const{error}=userValidation.signUp(bodyData);
            //? if there is an error
            if (error) {
                //? return the error message
                // return res.status(400).json({ erorr: validation.error.details[0].message })
                return next({status:422,stack:error,message:"missinig fields"})
            }
            const user = new User(bodyData);
            //? hash the password
            user.password = await hash(user.password, 10);
            //? save the user in the database
            await user.save();

            //? hide the password
            user.password = "**********";
            res.status(200).json(user)
        } catch (error) {
            //? if the email is already exist
            if (error.code === 11000) {
                return next({status:409,stack:error,message:"email is already exist"})
               
            }
            next(true)
        }

    },
    login: async(req, res,next) => {
        
        // const { email, password } = req.body;
        // const validation = userValidation.login({ email,password });
        try {
            const body = req.body;
            const validation = userValidation.login(body);
            
            if (validation.error) {
                return next({status:422,stack:validation.error,message:"missinig fields"})
            }
            
            const user = await User.findOne({ email: body.email });
           
            //? if the user is not exist
            if (!user) {
                return next({status:403,message:"email or password is incorrect"})

            }
            
            //? compare the password
            const isMatch = await compare(body.password, user.password)
            
            if (!isMatch) {
                return next({status:403,message:"email or password is incorrect"})
            }
            //? create token
            const token = createToken(user, '30d');
            //? save the token in the cookie
            res.cookie('access_token', token,{ httpOnly: true, sameSite: "None", secure: true })
            return res.status(200).json({ msg: "login success" })
        } catch (error) {
            return next({stack:error})
        }
    },
    logout: async(req, res) => {
        res.clearCookie('access_token');
        res.json({ msg: "logout success" })
    },
    checkAuth: async(req, res) => {
        const { _id, role } = req.payload;
        res.json({ msg: "user is authenticated", _id, role })
    }



}

export default authCtrl;



/**
 * ?what is destructuring?
 * const person ={
 * name: "avi",
 * age: 30
 * }
 * 
 * person.name, person['name']
 * !const {shevi} =person
 * !console.log(shevi) ? undefined | null
 * const {name, age} = person
 * console.log(name, age)
 */