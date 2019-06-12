const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProductInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.toppings = !isEmpty(data.toppings) ? data.toppings : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.productid = !isEmpty(data.productid) ? data.productid : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Product name is required";
  }
  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = "Product ingredients is required";
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = "Product category is required";
  }
  if (Validator.isEmpty(data.toppings)) {
    errors.toppings = "Product toppings is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Product description is required";
  }
  if (Validator.isEmpty(data.productid)) {
    errors.description = "Product ID is required";
  }
  if (Validator.isEmpty(data.price)) {
    errors.description = "Price is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
