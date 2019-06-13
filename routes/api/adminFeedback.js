const express = require("express");
const adminRoute = express.Router();
const adminCrud = require("../../db/helpers/adminCrud");

//@route Put /admin/feedback/search
//@desc Display all feedbacks to admin route
//@access Private
adminRoute.put("/feedback/search", (req, res) => {
  adminCrud.feedbackSearch(res);
});

module.exports = adminRoute;
