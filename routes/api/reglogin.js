const express = require("express");
const authRoute = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route Post /register
//@desc Register users route
//@access Public
authRoute.post("/register", (request, response) => {
  // console.log("request is", request.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var json = request.body;
  const userCrud = require("../../db/helpers/userCrud");
  userCrud.add(json, response);
});
//@route Post /login
//@desc Login users route
//@access Public
authRoute.post("/login", (request, response) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }

  const json = request.body;
  const userCrud = require("../../db/helpers/userCrud");
  userCrud.search(json, response);
});
// Route.delete("/delete", (request, response) => {
//   const json = request.body;
//   const userCrud = require("../../../db/helpers/userCrud");
//   userCrud.delete(json, response);
// });
// Route.put("/update", (request, response) => {});

//@route Post /oauth
//@desc Register users using OAUTH route
//@access Public
authRoute.post("/oauth", (request, response) => {});
module.exports = authRoute;
