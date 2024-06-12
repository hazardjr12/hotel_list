import mongoose from "mongoose";

const userSechma = new mongoose.Schema(
    {
        name : String,
        email: String,
        password: String,
        phone: String,
        verify: Boolean,
        gender: String,
    },
    {timestamps: true}
)

const User = mongoose.model("user", userSechma)
export default User