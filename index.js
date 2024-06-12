import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import cookieParser from "cookie-parser";
import User from "./model/User.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(Cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    if (
      !data.fname ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.username
    ) {
      res.status(401).send({ message: "Field cannot be empty" });
      return;
    }

    const userExist = await User.findOne({ email: data.email });
    if (userExist) {
      res.status(401).send({ message: "Email already exists" });
      return;
    }

    const payload = { ...data, verify: false };
    await User.create(payload);
    res.send({ message: "Registration Successful", data: payload });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hotelList");
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error");
  }
});
