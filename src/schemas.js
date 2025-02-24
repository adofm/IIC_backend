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
}
export default createUser
// not able to see the data properly but its checking is the user is alredy there or no 