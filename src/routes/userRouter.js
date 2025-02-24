import express from "express"
const userRouter = express.Router()
import sanityCheck from  "../middlewares";
userRouter.get("/register",(req,res)=>{
    res.json({
        "message":"Send register form"
    })
})

userRouter.get("/login",(req,res)=>{
    res.json({
        "message":"Send login form"
    })
})

userRouter.post("/login",sanityCheck,(req,res)=>{
    const {username, password, email, phone} = req.body;



    res.status(201).json({
        "status":201,
        "message":"Successfully created user"
    })
})


module.exports = userRouter