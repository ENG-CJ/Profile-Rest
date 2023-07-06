const express = require("express");
const router = express.Router();
const conn = require("../db/Connection");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary=require('cloudinary');
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

router.use(cors(corsOptions))
cloudinary.config({
  cloud_name: "dpejr2cmb",
  api_key: "399845886473875",
  api_secret: "5-dtzeYTK-DFHudpgkqszwsPnfA",
});

// routes

router.post("/create", UploadImage().single("image"), (req, res) => {
  const sqlQuery =
    "INSERT INTO `users`(`FullName`, `Username`, `Followers`, `Following`, `image`,`position`) VALUES (?,?,?,?,?,?)";
  var values = [
    req.body.name,
    req.body.username,
    req.body.Followers,
    req.body.Following,
    req.file.filename,
    req.body.position,
  ];

  conn.getConnection().query(sqlQuery, values, (error, data) => {
    if (error)
      return res.json({
        err: error.code,
        message: error.sqlMessage,
        user_error: "An Error Occurred While Data Uploading, Please Fix it...",
      });

    return res.json({
      status: "true",
      message: "User Profile has been created successfully",
    });
  });
});

router.get("/", (req, res) => {
  const sqlQuery = "SELECT *FROM users ORDER BY ID desc";
  conn.getConnection().query(sqlQuery, (error, data) => {
    if (error)
      return res.json({
        err: error.code,
        message: error.sqlMessage,
        user_error: "An Error Occurred While Data Fetching, Please Fix it...",
      });

    return res.json({ status: "true", data: data });
  });
});
router.get("/search/:name", (req, res) => {
  const sqlQuery = "CALL searchUser(?)";
  conn.getConnection().query(sqlQuery,[req.params.name], (error, data) => {
    if (error)
      return res.json({
        err: error.code,
        message: error.sqlMessage,
        user_error: "An Error Occurred While Data Fetching, Please Fix it...",
      });

    return res.json({ status: "true", data: data });
  });
});

router
  .route("/:id")
  .get((req, res) => {
    const sqlQuery = "SELECT *FROM users where ID=?";
    conn.getConnection().query(sqlQuery, [req.params.id], (error, data) => {
      if (error)
        return res.json({
          err: error.code,
          message: error.sqlMessage,
          user_error: "An Error Occurred While Data Fetching, Please Fix it...",
        });

      return res.json({ status: "true", data: data });
    });
  })
  .put((req, res) => {
    return res.json({
      data: req.body,
      id: req.params.id,
      url: req.originalUrl
    });
  });

router.post("/delete", deleteFileFrom, (req, res) => {
  const sqlQuery = `DELETE FROM users where ID=${req.body.id}`;
  conn.getConnection().query(sqlQuery, (error, data) => {
    if (error)
      return res.json({
        error: error.sqlMessage,
        code: error.code,
        user_error: "an error occured while removing the record",
      });
    return res.json({
      message: "The Profile Record Has been Removed..",
      status: true,
    });
  });
});

router.post(
  "/update",
  (req, res) => {
   
    if (req.body.hasFile) {
      return res.json({ message: "File can't be null" });
    } else {
      const sqlQuery =
        "UPDATE `users` SET  `FullName`=?, Username=?, Followers=?, Following=?, position=? WHERE ID=?";
      var values = [
        req.body.FullName,
        req.body.Username,
        req.body.Followers,
        req.body.Following,
        req.body.position,
        req.body.ID,
      ];
      conn.getConnection().query(sqlQuery, values, (error, data) => {
        if (error)
          return res.json({
            error: error.sqlMessage,
            code: error.code,
            user_error: "an error occured while removing the record",
          });
        return res.json({
          message: "The Profile Record Has been Updated..",
          status: true,
        });
      });
    }
  }
);

// storage engine

function UploadImage(req, res, next) {
  // code
  var storageEngine = multer.diskStorage({
    destination: {}
    // filename: (req, file, cb) => {
    //   cb(
    //     null,
    //     `${file.fieldname}_${new Date().getTime()}` +
    //       path.extname(file.originalname)
    //   );
    // },
  });

  const upload = multer({
    storage: storageEngine,
  });

  return upload;
}

function deleteFileFrom(req, res, next) {
 
    const sql = "SELECT image from users where ID=?";
    conn.getConnection().query(sql, [req.body.id], (err, data) => {
      if (err)
        return res.json({ message: "error ocuured while image fetching..." });

      if (fs.existsSync(`./public/profile/${data[0].image}`)) {
        fs.unlink(`./public/profile/${data[0].image}`, (err) => {
          if (err)
            return res.json({
              message: "An Error Occurred While unlining the file",
              error: err.code,
              code_error: err.message,
            });
          else next();
        });
      } else
        return res.json({
          message: "Error Occurred While Reading the filename",
          data: {
            status: false,
            file: fs.existsSync(`../public/profile/${req.body.file_name}`),
            file: req.params.id,
          },
        });
    });
  
  
}

module.exports.router = router;
