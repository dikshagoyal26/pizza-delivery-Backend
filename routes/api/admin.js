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

//@route Put /admin/changepwd
//@desc change password admin route
//@access Private
adminRoute.put("/changepwd", (request, response) => {
  let json = request.body;
  adminCrud.changepwd(json, response);
});
module.exports = adminRoute;
