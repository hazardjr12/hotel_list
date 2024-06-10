import express from "express";
import hotel from "./hotel.js";
import Cors from "cors";

const app = express();

app.use(Cors({ origin: "*"})
const allData = [...hotel]
const port = 4000;


app.get("/", (req, res) => {
  res.send(allData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
