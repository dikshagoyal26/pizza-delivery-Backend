const ProductModel = require("../models/product");
const appCodes = require("../../utils/appcodes");

const productOperations = {
  getAll(prodObject, res) {
    ProductModel.find()
      .then(products => {
        if (products.length == 0) {
          res.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.ERROR,
            msg: "No products found"
          });
        } else {
          res.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            msg: "Display All Products",
            list: products
          });
        }
      })
      .catch(err => {
        res.status(appCodes.SERVER_ERROR).json({
          status: appCodes.FAIL,
          message: "Error in DB During Find Operation",
          error: err
        });
      });
  },

  getById(prodObject, res, product_id) {
    ProductModel.find({ productid: product_id })
      .then(product => {
        if (product.length == 0) {
          res.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.ERROR,
            msg: "No products found"
          });
        } else {
          res.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            msg: "Display Product with product id ",
            product_id: product_id,
            product: product
          });
        }
      })
      .catch(err =>
        res.status(appCodes.SERVER_ERROR).json({
          status: appCodes.FAIL,
          msg: "Error in DB During Find Operation",
          error: err
        })
      );
  },
  add(prodObject, res) {},
  delete(prodObject, res) {},
  update(prodObject, res) {}
};
module.exports = productOperations;
