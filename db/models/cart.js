var connection = require("../connection");
const Schema = connection.Schema;
var cartSchema = new Schema({
  productid: {
    type: String, //value will be _id of productmodel
    required: true,
    unique: true
    // type: Schema.Types.ObjectId,
    // ref: 'users'
  },
  userid: {
    type: String, //value will be _id of usermodel
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true,
    unique: true
  },
  toppings: {
    type: String,
    required: true
    //unique: true
  },
  qty: {
    type: String,
    required: true,
    unique: true
  }
  // },
  // total:{
  //     type: String,
  //     required: true,
  //     unique: true
  // }
});

const cartModel = connection.model("carts", cartSchema);
module.exports = cartModel;
