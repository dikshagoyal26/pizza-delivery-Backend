const express = require("express");
const cartRoute = express.Router();

//@route Post /cart/add
//@desc add products to cart route
//@access Public
cartRoute.post("/add", (req, res) => {
  const json = req.body;
  const cartCrud = require("../../db/helpers/cartCrud");
  cartCrud.add(json, res);
});

//@route Post /cart/search
//@desc search products in cart route
//@access Public
cartRoute.post("/search", (req, res) => {
  const json = req.body;
  const cartCrud = require("../../db/helpers/cartCrud");
  cartCrud.search(json, res);
});

//@route Delete /cart/delete
//@desc Delete product from cart route
//@access Public
cartRoute.delete("/delete", (req, res) => {
  const json = req.body;
  const cartCrud = require("../../db/helpers/cartCrud");
  cartCrud.delete(json, res);
});

//@route Put /cart/update
//@desc Update cart route
//@access Public
cartRoute.put("/update", (req, res) => {
  const json = req.body;
  const cartCrud = require("../../db/helpers/cartCrud");
  cartCrud.delete(json, res);
});
module.exports = cartRoute;
