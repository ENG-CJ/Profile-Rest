const express=require("express");
const conn=require('./db/Connection');
const multer=require("multer");

const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(express.static("public"));

require('dotenv').config();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://hirehero.000webhostapp.com"
    );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get("/", (req, res) => {
  return res.json({ message: "Server is running and ready to cook" });
});


// rooutes 
const router=require('./routes/profiles');
app.use("/profile",router.router)





var PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("Running...");
})