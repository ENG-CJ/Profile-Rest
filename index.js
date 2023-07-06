const express = require("express");
const conn = require("./db/Connection");
const multer = require("multer");

const app = express();
const cors = require("cors");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
require("dotenv").config();


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.get("/", (req, res) => {
  return res.json({ message: "Server is running and ready to cook" });
});

// rooutes
const router = require("./routes/profiles");
app.use("/profile", router.router);

var PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Running...");
});
