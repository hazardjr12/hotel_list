import express from "express";
import hotel from "./hotel.js"; // Ensure this module is used somewhere or remove it
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "./model/User.js";
import bcrypt from "bcryptjs";
import sendMail from "./model/email/sendMail.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "*" }));

const allData = [...hotel];
app.get("/", (req, res) => {
  res.send(allData);
});

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    if (
      data.name == "" ||
      data.email == "" ||
      data.phone == "" ||
      data.gender == "" ||
      data.password == ""
    ) {
      res.status(401).send({
        message: "Field cannot be empty",
      });
      return;
    }

    const userExist = await User.findOne({ email: data.email });
    if (userExist) {
      res.status(401).send({
        message: "Email exists",
      });
      return;
    }

    const hashpass = await bcrypt.hash(data.password, 10);
    const payload = {
      ...data,
      verify: false,
      password: hashpass,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    const subject = "Welcome to HazardiousTech, we're glad to have you";
    const url = `http://localhost:5173/activation/${token}`;
    const html = `<div><h1>HazardiousTech</h1><a href="${url}">Confirm Email</a></div>`;

    await sendMail(html, data.email, subject);

    res.send({
      message: "Registration Successful",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Registration Failed",
    });
  }
});

app.post("/activation", async (req, res) => {
  const token = req.body.token;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    await User.create(decode);
    res.send({
      message: "Activation Successful",
      data: decode,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Invalid token",
    });
  }
});

app.post("/login", async (req, res) => {
  const data = req.body;
  try {
    if (data.email == "" || data.password == "") {
      res.status(401).send({
        message: "Fields cannot be empty",
      });
      return;
    }

    const userExist = await User.findOne({ email: data.email });
    if (!userExist) {
      res.status(401).send({
        message: "User does not exist",
      });
      return;
    }

    const checkPass = await bcrypt.compare(data.password, userExist.password);
    if (!checkPass) {
      res.status(401).send({
        message: "Invalid credential",
      });
      return;
    }

    res.status(201).send({
      message: "Login Successful",
      data: userExist,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Login Failed",
    });
  }
});

app.listen(4000, async () => {
  console.log("Server is running on port 4000");
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
});
