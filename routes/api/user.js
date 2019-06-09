const express = require("express");
const userRoute = express.Router();

userRoute.post("/register", (req, res) => {
  const json = req.body;
  const userCrud = require("../../db/helpers/userCrud");
  userCrud.add(json, res);
});
userRoute.post("/login", (req, res) => {
  const json = req.body;
  const userCrud = require("../../db/helpers/userCrud");
  userCrud.search(json, res);
});
userRoute.delete("/delete", (req, res) => {
  const json = req.body;
  const userCrud = require("../../db/helpers/userCrud");
  userCrud.delete(json, res);
});
userRoute.put("/update", (req, res) => {});

module.exports = userRoute;
