const express = require("express");
const authRoute = express.Router();
const userCrud = require("../../db/helpers/userCrud");

//@route Post /user/register
//@desc Register users route
//@access Public
authRoute.post("/register", (request, response) => {
  var json = request.body;
  userCrud.add(json, response);
});

//@route Post /user/login
//@desc Login users route
//@access Public
authRoute.post("/login", (request, response) => {
  const json = request.body;
  userCrud.login(json, response);
});

//@route Post /user/findbyid
//@desc forget password find email id users route
//@access Public
authRoute.post("/findbyid", (request, response) => {
  const json = request.body;
  userCrud.findid(json, response);
});

//@route Put /user/resetpwd
//@desc forget password reset password users route
//@access Public
authRoute.put("/resetpwd", (req, res) => {
  let data = req.body;
  userCrud.resetpwd(data, res);
});

//@route Put /user/changepwd
//@desc change password users route
//@access Private
authRoute.put("/changepwd", (req, res) => {
  let data = req.body;
  userCrud.changepwd(data, res);
});

//@route Post /user/deleteone
//@desc delete user account users route
//@access Private
authRoute.post("/deleteone", (req, res) => {
  let data = req.body;
  userCrud.delteone(data, res);
});

//@route Put /user/update
//@desc update user account users route
//@access Private
authRoute.put("/update", (req, res) => {
  let data = req.body;
  userCrud.update(data, res);
});

module.exports = authRoute;
