var connection = require("../connection");
const Schema = connection.Schema;
var userSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
    // default: "ABCD"
  },
  name: {
    type: String,
    required: true
  }
});

const userModel = connection.model("users", userSchema);
module.exports = userModel;
