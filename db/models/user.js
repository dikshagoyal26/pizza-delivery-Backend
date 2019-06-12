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
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  date: {
    type: Date,
    default: Date.now()
  },
  picture: {
    type: String
  },
  // address: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Addresses"
  // }
  address: [
    {
      type: {
        type: String,
        required: true
      },
      houseNo: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      town: {
        type: String,
        required: true
      },
      society: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pin: {
        type: String,
        required: true
      }
    }
  ]
});

const userModel = connection.model("users", userSchema);
module.exports = userModel;
