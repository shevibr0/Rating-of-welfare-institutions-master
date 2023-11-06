import usersR from "./users.routes.js";
import reviewsR from "./reviews.routes.js";
import institutesR from "./institutes.routes.js"

import { config } from "dotenv"
config();


import express from "express"
const router=express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "server is work" });
    });

router.use("/users", usersR);
router.use("/reviews", reviewsR);
router.use("/institutes", institutesR);

// error handler

router.use((err,req,res,next)=>{
    console.log({errorHandler:err})
    const { status, message, stack } = err;
    const error = {
        message: message ? message : "internal error",
        status: status ? status : "500"
    }
    if (stack) error.stack = stack;

    if (process.env.MODE == "production") {
        error.message = "there is error";
        delete error.stack;
    }
    return res.status(status ?? 500).json(
        error
    )
})
export default router;