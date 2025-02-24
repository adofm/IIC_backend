import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new Schema({
    Firstname: String,
    Lastname: String,
    Username: String,
    Password: String,
    Email: { type: String, unique: true },
    Num: { type: Number, unique: true },
    CollageName: String,
});
const User = mongoose.model("User", userSchema);
async function Connection() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}
async function createUser(userData) {
    try {
        const existingUser = await User.findOne({
            $or: [{ Email: userData.Email }, { Num: userData.Num }],
        });
        if (existingUser) {
            console.log("User already exists with the same Email or Phone Number");
            process.exit(2);
        }
        const newUser = new User(userData);
        await newUser.save();
        console.log("User created successfully");
    } catch (error) {
        console.error("Error creating user", error);
        process.exit(3);
    }
}
export { Connection, createUser };
