const ProductModel = require("../models/product");
const appCodes = require("../../utils/appcodes");
const validateProductInput = require("../../validation/product");

const productOperations = {
  //Get the list of all the products
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
            list: products,
            prodObject: prodObject
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
  //Get products with the product_id
  getById(prodObject, res, product_id) {
    ProductModel.find({ productid: product_id })
      .then(product => {
        if (product.length == 0) {
          res.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.ERROR,
            msg: "No product found"
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
  //Adding a product
  add(prodObject, res) {
    const { errors, isValid } = validateProductInput(prodObject);

    if (!isValid) {
      return res.status().json();
    }
    const newProduct = new ProductModel({
      productid: prodObject.productid,
      name: prodObject.name,
      price: prodObject.price
    });

    newProduct
      .save()
      .then(product => {
        console.log("Record Added..");
        res.status(appCodes.OK).json({
          status: appCodes.SUCCESS,
          message: "Product Added",
          product: product
        });
      })
      .catch(err => {
        console.log("Error in Record Add");
        res.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error",
          error: err
        });
      });
  },
  //Delete the product
  delete(prodObject, res) {
    ProductModel.findOneAndRemove({ productid: prodObject.productid })
      .then(product => {
        product.remove().then(() => {
          console.log("deleted");
        });
      })
      .catch(err => console.log("EEEEEEEERRRRRR" + err));
  },
  update(prodObject, res) {}
};
module.exports = productOperations;
