var connection = require("../connection");
const Schema = connection.Schema;

var OrderSchema = new Schema({
  orderid: {
    type: String,
    required: true
  },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "products"
      },
      qty: {
        type: Number,
        default: 1
      }
    }
  ],
  userid: {
    type: String,
    required: true
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
      addtype: {
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

const OrderModel = connection.model("orders", OrderSchema);
module.exports = OrderModel;
