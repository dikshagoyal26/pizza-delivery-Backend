const ProductModel = require("../models/product");
const productOperations = {
  getAll() {
    ProductModel.find()
      .then(products => {
        if (!products) {
          return res.status(404).json({ msg: "No products found" });
        }
        res.json("hello");
        res.json(products);
      })
      .catch(err => res.status(404).json(err));
  }
};
module.exports = productOperations;
