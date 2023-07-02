const express=require("express");
const conn=require('./db/Connection');
const multer=require("multer");

const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(express.urlencoded({extended: false}))

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
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