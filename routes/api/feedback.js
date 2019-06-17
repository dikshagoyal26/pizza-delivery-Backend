const express = require("express");
const feedbackRoute = express.Router();
const feedbackCrud = require("../../db/helpers/feedbackCrud");

//@route Post /feedback/add
//@desc add products to feedback route
//@access Private
feedbackRoute.post("/add", (req, res) => {
  const json = req.body;
  feedbackCrud.add(json, res);
});

//@route Get /feedback/search
//@desc search products in feedback route
//@access Private
feedbackRoute.get("/search", (req, res) => {
  let json = { userid: req.query.userid };
  feedbackCrud.search(json, res);
});

//@route Delete /feedback/delete
//@desc Delete product from feedback route
//@access Private
feedbackRoute.delete("/delete", (req, res) => {
  const json = req.body;
  feedbackCrud.delete(json, res);
});

//@route Put /feedback/update
//@desc Update feedback route
//@access Private
feedbackRoute.put("/update", (req, res) => {
  const json = req.body;
  feedbackCrud.delete(json, res);
});
module.exports = feedbackRoute;
