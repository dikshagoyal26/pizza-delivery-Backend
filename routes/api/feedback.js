const express = require("express");
const feedbackRoute = express.Router();

//@route Post /feedback/add
//@desc add products to feedback route
//@access Public
feedbackRoute.post("/add", (req, res) => {
  const json = req.body;
  const feedbackCrud = require("../../db/helpers/feedbackCrud");
  feedbackCrud.add(json, res);
});

//@route Post /feedback/search
//@desc search products in feedback route
//@access Public
feedbackRoute.post("/search", (req, res) => {
  const json = req.body;
  const feedbackCrud = require("../../db/helpers/feedbackCrud");
  feedbackCrud.search(json, res);
});

//@route Delete /feedback/delete
//@desc Delete product from feedback route
//@access Public
feedbackRoute.delete("/delete", (req, res) => {
  const json = req.body;
  const feedbackCrud = require("../../db/helpers/feedbackCrud");
  feedbackCrud.delete(json, res);
});

//@route Put /feedback/update
//@desc Update feedback route
//@access Public
feedbackRoute.put("/update", (req, res) => {
  const json = req.body;
  const feedbackCrud = require("../../db/helpers/feedbackCrud");
  feedbackCrud.delete(json, res);
});
module.exports = feedbackRoute;
