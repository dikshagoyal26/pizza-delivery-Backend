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
  },
  firstname: {
    type: String
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
  googleID: {
    type: String
  },
  address: [
    {
      typeof: {
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
