const express = require("express");
const authRoute = express.Router();
const userCrud = require("../../db/helpers/userCrud");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route Post /register
//@desc Register users route
//@access Public
authRoute.post("/register", (request, response) => {
  // console.log("request is", request.body);
  // const { errors, isValid } = validateRegisterInput(request.body);
  // if (!isValid) {
  //   return response.status(400).json(errors);
  // }
  var json = request.body;
  userCrud.add(json, response);
});

//@route Post /login
//@desc Login users route
//@access Public
authRoute.post("/login", (request, response) => {
  // const { errors, isValid } = validateLoginInput(request.body);
  // if (!isValid) {
  //   return response.status(404).json(errors);
  // }
  const json = request.body;
  userCrud.search(json, response);
});

//@route Post /findbyid
//@desc forget password find email id users route
//@access Public
authRoute.post("/findbyid", (request, response) => {
  const json = request.body;
  userCrud.findbyid(json, response);
});

//@route Put /resetpwd
//@desc forget password reset password users route
//@access Public
authRoute.put("/resetpwd", (req, res) => {
  let data = req.body;
  userOperations.resetpwd(data, res);
});

//@route Post /deleteone
//@desc delete user account users route
//@access Public
authRoute.delete("/deleteone", (req, res) => {
  let data = req.body;
  userOperations.delteone(data, res);
});

//@route Put /update
//@desc update user account users route
//@access Public
authRoute.put("/update", (req, res) => {
  let data = req.body;
  userOperations.update(data, res);
});

module.exports = authRoute;
