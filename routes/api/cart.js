const express = require("express");
const cartRoute = express.Router();
const cartCrud = require("../../db/helpers/cartCrud");

//@route Post /cart/add
//@desc add products to cart route
//@access Private
cartRoute.post("/add", (req, res) => {
  const json = req.body;
  cartCrud.add(json, res);
});

//@route Get /cart/search
//@desc search products in cart route
//@access Private
cartRoute.get("/search", (req, res) => {
  // const userid = req.query.userid;
  let json = { userid: req.query.userid };
  cartCrud.search(json, res);
});

//@route Delete /cart/delete
//@desc Delete product from cart route
//@access Private
cartRoute.delete("/deleteOne", (req, res) => {
  const json = req.body;
  cartCrud.delete(json, res);
});

//@route Delete /cart/delete
//@desc Delete product from cart route
//@access Private
cartRoute.delete("/deleteAll", (req, res) => {
  const json = req.body;
  cartCrud.deleteAll(json, res);
});

// //@route Put /cart/update
// //@desc Update cart route
// //@access Private
// cartRoute.put("/update", (req, res) => {
//   const json = req.body;
//   cartCrud.update(json, res);
// });
module.exports = cartRoute;
