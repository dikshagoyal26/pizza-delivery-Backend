const express = require("express");
const passport = require("passport");
const appCodes = require("../../utils/appcodes");
const authRoute = express.Router();

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get("/dashboard", passport.authenticate("google"), (req, res) => {
  console.log("Request ", req, "response", res);

  const sendMail = require("../../utils/mail"); //nodemailer
  //sendMail(userObject.userid, "register");

  res
    .status(appCodes.OK)
    .json({ status: appCodes.SUCCESS, message: "Record Added" });
});
module.exports = authRoute;
