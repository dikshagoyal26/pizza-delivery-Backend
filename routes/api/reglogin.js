const express = require("express");
const authRoute = express.Router();

authRoute.post("/register", (request, response) => {
  console.log("request is", request.body);
  var json = request.body;
  const userCrud = require("../../db/helpers/userCrud");
  console.log("json is", json);
  userCrud.add(json, response);
});
authRoute.post("/login", (request, response) => {
  const json = request.body;
  const userCrud = require("../../db/helpers/userCrud");
  userCrud.search(json, response);
});
// Route.delete("/delete", (request, response) => {
//   const json = request.body;
//   const userCrud = require("../../../db/helpers/userCrud");
//   userCrud.delete(json, response);
// });
// Route.put("/update", (request, response) => {});

module.exports = authRoute;
