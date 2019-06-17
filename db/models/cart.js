var connection = require("../connection");
const Schema = connection.Schema;
var cartSchema = new Schema({
  userid: {
    type: String //value will be _id of usermodel
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
        type: Number
      },
      total: {
        type: Number
      }
    }
  ] //Products ka array

  // },
  // total:{
  //     type: String,
  //     required: true,
  //     unique: true
  // }
});

const cartModel = connection.model("carts", cartSchema);
module.exports = cartModel;
