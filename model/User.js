import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    gender: { type: String },
    password: { type: String },
    username: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
