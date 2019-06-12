var connection = require("../connection");
const Schema = connection.Schema;
var AdminSchema = new Schema({
  adminid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: "admin123"
  },
  isFirstTym: {
    type: Boolean,
    default: true
  }
});

const AdminModel = connection.model("users", AdminSchema);
module.exports = AdminModel;
