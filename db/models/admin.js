var connection = require("../connection");
const Schema = connection.Schema;
var AdminSchema = new Schema({
  adminid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: "$2b$10$LK4Pszkjusj7a6CebW5NquirrVu6MdyiVtZMkZf7gidreQMEr5R5y" //admin123
  },
  isFirstTym: {
    type: Boolean,
    default: true
  }
});

const AdminModel = connection.model("admins", AdminSchema);
module.exports = AdminModel;
