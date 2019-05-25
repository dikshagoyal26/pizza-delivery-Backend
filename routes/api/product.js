const express = require("express");
const productRoute = express.Router();

//@route GET /product/menu
//@desc displays product list
//@access Private
productRoute.get("/menu", (req, res) => {
  const json = req.body;
  const productCrud = require("../../db/helpers/productCrud");
  productCrud.getAll();
});
module.exports = productRoute;
