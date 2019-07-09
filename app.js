const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const googleSetup = require("./utils/googlepassport");
app.use(express.static("public"));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["thisismagiccode"]
  })
);
app.use(passport.initialize());
//app.use(require("./utils/cors"));
app.use(cors());
app.use("/admin", require("./routes/api/admin"));
app.use("/user", require("./routes/api/user"));
app.use("/auth", require("./routes/api/auth"));

app.use(require("./utils/tokenmiddleware"));

app.use("/admin/admins", require("./routes/api/adminlist"));
app.use("/admin/order", require("./routes/api/adminOrder"));
app.use("/admin/feedback", require("./routes/api/adminFeedback"));
app.use("/admin/sales", require("./routes/api/sales"));
app.use("/product", require("./routes/api/product"));
app.use("/feedback", require("./routes/api/feedback"));
app.use("/cart", require("./routes/api/cart"));
app.use("/orders", require("./routes/api/order"));

// const fileStorage = multer.diskStorage({
//   destination: (req, file, next) => {
//     //folder kha bnega
//     console.log("file destination", file);
//     next(null, "./uploads"); //null means no error
//   },
//   filename: (req, file, next) => {
//     console.log("file is", file); //to give file path nd name //file ka naam
//     next(null, "sample" + "_" + new Date().toISOString() + ".xlsx");
//   }
// });
// const fileFilterFn = (req, file, next) => {
//   console.log("file is", file);
//   let error = null;
//   let isMimeMatch;
//   if (
//     !file.mimeType ==
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//     file.mimeType == "application/msexcel" ||
//     file.mimeType == "application/vnd.ms-excel"
//   ) {
//     isMimeMatch = true;
//     next(error, isMimeMatch);
//   } else {
//     isMimeMatch = false;
//     console.log("mime not match", error, "ismimematch", isMimeMatch);
//     next(error, isMimeMatch);
//   }
// };

// app.post("/upload", upload.single("image"), (req, res) => {
//   // require("./utils/multer");
//   res.send(req.image);
//   //const file = req.image;
//   //upload.single("image");
//   //res.json({ status: "S" });
// });
app.use((req, res) => {
  res.send("you have typed something wrong");
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server start at ${PORT}`);
  }
});
