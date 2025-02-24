import mongoose, { Schema } from "mongoose";
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
async function createUser(userData) {
    try {
        const existingUser = await User.findOne({
            $or: [{ Email: userData.Email }, { Num: userData.Num }],
        });
        if (existingUser) {
            console.log("User already exists with the same Email or Phone Number");
            throw new Error("User already exists with the same Email or Phone Number");
        }
        const newUser = new User(userData);
        await newUser.save();
        console.log("User created successfully");
    } catch (error) {
        console.error("Error creating user", error);
        throw new Error(error)
    }
}
export default createUser
