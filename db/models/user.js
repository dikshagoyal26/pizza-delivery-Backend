var connection = require("../connection");
const Schema = connection.Schema;
var userSchema = new Schema({
  userid: {
    //or googleID in case of auth register
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
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: String,
    default: Date.now()
  },
  picture: {
    type: String
  }
});

const userModel = connection.model("users", userSchema);
module.exports = userModel;
