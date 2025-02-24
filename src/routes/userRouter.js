import express from "express"
import bcrypt from "bcrypt"
import sanityCheck from "../middlewares.js"
import mongoose from "mongoose"
import { createUser } from "../schemas.js"
const userRouter = express.Router()
import sanityCheck from  "../middlewares";
userRouter.get("/register",(req,res)=>{
    res.json({
        "message":"Send register form"
    })
})

userRouter.post("/register",sanityCheck,async (req,res)=>{
    const userDetails = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    userDetails.password=hashedPassword;
    await createUser(userDetails);

    // Create schema by passing userDetails
})

userRouter.get("/login",(req,res)=>{
    res.json({
        "message":"Send login form"
    })
})

userRouter.post("/login",(req,res)=>{
    res.status(201).json({
        "status":201,
        "message":"Successfully created user"
    })
})


export default userRouter