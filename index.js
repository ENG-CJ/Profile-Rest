const express = require("express");
const conn = require("./db/Connection");
const multer = require("multer");

const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "https://hirehero.000webhostapp.com",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
require("dotenv").config();

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
