import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js"

dotenv.config()
mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Conection Successful");
    })
    .catch(err=>{
        console.log("Failed DB Connection, ",err);
    })

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    
    res.status(200).json({
        "status":200,
        "message":"testing"
    })
})

app.use("/users",userRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port:${process.env.PORT}`)
})