const express = require("express");
const adminRoute = express.Router();
const adminCrud = require("../../db/helpers/adminCrud");

//@route Post admin/login
//@desc Login admin route
//@access Public
adminRoute.post("/login", (request, response) => {
  const json = request.body;
  adminCrud.login(json, response);
});

module.exports = adminRoute;
