const express=require("express");
const conn=require('./db/Connection');
const multer=require("multer");

const app = express();
const cors = require('cors');


app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.get("/", (req, res) => {
  return res.json({ message: "Server is running and ready to cook" });
});



// rooutes 
const router=require('./routes/profiles');
app.use("/profile",router.router)







app.listen(8000,()=>{
    console.log("Running...");
})