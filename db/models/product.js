var connection = require("../connection");
const Schema = connection.Schema;

var productSchema = new Schema({
  productid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  toppings: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const productModel = connection.model("products", productSchema);
module.exports = productModel;
