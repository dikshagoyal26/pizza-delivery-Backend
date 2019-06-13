var connection = require("../connection");
const Schema = connection.Schema;
var userSchema = new Schema({
  userid: {
    //Email
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
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  phone: {
    type: Number
  },
  dob: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now()
  },
  picture: {
    type: String
  },
  address: [
    {
      type: {
        type: String
      },
      houseNo: {
        type: String
      },
      street: {
        type: String
      },
      town: {
        type: String
      },
      society: {
        type: String
      },
      state: {
        type: String
      },
      pin: {
        type: String
      }
    }
  ]
});

const userModel = connection.model("users", userSchema);
module.exports = userModel;
