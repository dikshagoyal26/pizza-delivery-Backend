const express = require("express");
const adminRoute = express.Router();
const adminCrud = require("../../db/helpers/adminCrud");

//@route Get /admin/feedback/search
//@desc Display all feedbacks to admin route
//@access Private
adminRoute.get("/search", (req, res) => {
  adminCrud.feedbackSearch(res);
});

module.exports = adminRoute;
