const express = require("express");
const adminRoute = express.Router();
const salesCrud = require("../../db/helpers/salesCrud");

//@route Get /admin/sales/month
//@desc Display monthly sales to admin route
//@access Private
adminRoute.get("/month", (req, res) => {
  salesCrud.month(res);
});

//@route Get /admin/sales/product
//@desc Display product wise sales to admin route
//@access Private
adminRoute.get("/product", (req, res) => {
  //const json = req.body;
  salesCrud.product(res);
});

//@route Get /admin/sales/countusers
//@desc Display Count of users to admin route
//@access Private
adminRoute.get("/countusers", (req, res) => {
  users = salesCrud.countusers(res);
});
//@route Get /admin/sales/countproducts
//@desc Display Count of products to admin route
//@access Private
adminRoute.get("/countproducts", (req, res) => {
  products = salesCrud.countproducts(res);
});
module.exports = adminRoute;
