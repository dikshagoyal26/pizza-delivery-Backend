var connection = require("../connection");
const Schema = connection.Schema;
var cartSchema = new Schema({
  userid: {
    type: String
  },
  name: {
    type: String
  },
  products: [
    {
      type: Object,
      productid: {
        type: String
      },
      name: {
        type: String
      },
      price: {
        type: Number
      },
      toppings: {
        type: String
      },
      qty: {
        type: Number,
        default: "0"
      },
      total: {
        type: Number
      },
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    }
  ]
});

const cartModel = connection.model("carts", cartSchema);
module.exports = cartModel;
