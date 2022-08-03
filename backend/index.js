const cors = require("cors");
const category = require("./category");
const product = require("./product");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/mern-task")
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch(() => console.log("Couldn't connect to MongoDB'"));
app.use(express.json());

app.use(express.static('uploads'))
app.use(cors());
app.use("/category", category);
app.use("/product", product);
app.listen(3000, () => {
  console.log("Listing Part 3000");
});
