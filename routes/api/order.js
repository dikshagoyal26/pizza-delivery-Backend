const express = require("express"); //create //view //cancel
const orderRoute = express.Router();
const orderCrud = require("../../db/helpers/orderCrud");

//@route Post /order/add
//@desc add order to order route
//@access Public
orderRoute.post("/add", (req, res) => {
  const json = req.body;
  orderCrud.add(json, res);
});

//@route Post /order/search
//@desc search all order in order route
//@access Public
orderRoute.post("/search", (req, res) => {
  const json = req.body;
  orderCrud.search(json, res);
});

//@route Put /order/update
//@desc Update order status route
//@access Public
orderRoute.put("/update", (req, res) => {
  const json = req.body;
  orderCrud.delete(json, res);
});
module.exports = orderRoute;
