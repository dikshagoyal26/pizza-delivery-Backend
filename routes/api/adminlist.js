const express = require("express");
const adminRoute = express.Router();
const adminCrud = require("../../db/helpers/adminCrud");

//@route Get /admin/adminlist
//@desc get all admins list
//@access Private
adminRoute.get("/adminlist", (req, res) => {
  adminCrud.search(res);
});

//@route Post /admin/add
//@desc add admins to admin route
//@access Private
adminRoute.post("/add", (req, res) => {
  const json = req.body;
  adminCrud.add(json, res);
});

//@route Delete /admin/delete
//@desc delete admin from admin route
//@access Private
adminRoute.delete("/delete", (req, res) => {
  const json = req.body;
  adminCrud.delete(json, res);
});

//@route Put /admin/update
//@desc update admin to admin route
//@access Private
adminRoute.put("/update", (req, res) => {
  const json = req.body;
  adminCrud.update(json, res);
});

module.exports = adminRoute;
