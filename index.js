import express from "express";
import hotel from "./hotel.js";

const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send(hotel);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
