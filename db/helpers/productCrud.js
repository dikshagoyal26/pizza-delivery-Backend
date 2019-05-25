const ProductModel = require("../models/product");

const productOperations = {
  getAll(prodObject, res) {
    ProductModel.find()
      .then(products => {
        if (!products) {
          res.status(404).json({ msg: "No products found" });
        } else {
          res.json("Display All Products");
          res.json(products);
        }
      })
      .catch(err => res.status(404).json(err));
  },
  getById(prodObject, res, product_id) {
    ProductModel.find({ product: product_id })
      .then(product => {
        if (!product) {
          res.status(404).json({ msg: "No Product found " });
        } else {
          res.json("Display Product with product id " + product_id + product);
        }
      })
      .catch(err => res.status(404).json({ msg: "There is no product" }));
  },
  add(prodObject, res) {},
  delete(prodObject, res) {},
  update(prodObject, res) {}
};
module.exports = productOperations;
