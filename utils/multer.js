const multer = require("multer");
// const MimeType = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     const isValid = MimeType[file.mimetype];
//     let error = new Error("invalid file");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");

//     console.log("Going to Store the Data in Disk");
//     cb(null, "./uploads");
//   },
//   filename: function(req, file, cb) {
//     const name = file.originalname.split(" ").join("-");
//     const ext = MimeType[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//     // console.log("File name is ", file.fieldname);
//     // cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//   }
// });
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("Going to Store the Data in Disk");
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    console.log("File name is ", file.fieldname);
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

module.exports = multer({ storage: storage }).single("image");
