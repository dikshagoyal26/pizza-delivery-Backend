const express = require("express");
const adminRoute = express.Router();
const adminCrud = require("../../db/helpers/adminCrud");

//@route Get /admin/order/search
//@desc Display all orders to admin route
//@access Private
adminRoute.get("/search", (req, res) => {
  adminCrud.orderSearch(res);
});

//@route Put /admin/order/update
//@desc update order to admin route
//@access Private
adminRoute.put("/update", (req, res) => {
  const json = req.body;
  adminCrud.orderUpdate(json, res);
});

module.exports = adminRoute;
