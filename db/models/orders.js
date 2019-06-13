var connection = require("../connection");
const Schema = connection.Schema;
var OrderSchema = new Schema({
  products: [
    {
      productid: {
        type: String
      },
      qty: {
        type: Number
      }
    }
  ],
  userid: {
    type: String, //value will be _id of usermodel
    required: true // ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  paymentmode: {
    type: String,
    required: true
  },
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
  ],
  name: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String
  }
});

const OrderModel = connection.model("users", OrderSchema);
module.exports = OrderModel;
