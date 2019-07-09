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

module.exports = adminRoute;
