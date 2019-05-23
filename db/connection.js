const mongoose = require("mongoose");
const env = require("../config/env");
mongoose.connect(env.mongo);
mongoose.connection.on("open", () => {
  console.log("connection established");
});
module.exports = mongoose;
