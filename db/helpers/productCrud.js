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
      return res
        .status(404)
        .json({ msg: "Product info not valid", errors: errors });
    }
    const newProduct = new ProductModel({
      productid: prodObject.productid,
      name: prodObject.name,
      price: prodObject.price,
      ingredients: prodObject.ingredients,
      category: prodObject.category,
      toppings: prodObject.toppings,
      description: prodObject.description
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
    ProductModel.findOneAndRemove({ productid: prodObject.productid }, err => {
      if (err) {
        response.status(appCodes.RESOURCE_NOT_FOUND).json({
          status: appCodes.FAIL,
          message: "Error in record delete "
        });
      } else {
        console.log("Record Deleted");
        response.status(appCodes.OK).json({
          status: appCodes.SUCCESS,
          message: "Record Deleted"
        });
      }
    });
  },
  //Updating the product if exists
  update(prodObject, res) {
    const { errors, isValid } = validateProductInput(prodObject);

    if (!isValid) {
      return res
        .status(404)
        .json({ msg: "Product info not valid", errors: errors });
    }

    ProductModel.findOne({ productid: prodObject.productid })
      .then(product => {
        if (product) {
          ProductModel.findOneAndUpdate(
            { productid: prodObject.productid },
            { $set: prodObject },
            { new: true }
          )
            .then(product =>
              res.json({ msg: "Product Updated", product: product })
            )
            .catch(err => res.json({ msg: "Error in updating", error: err }));
        } else {
          res.json({
            msg: "Product not found and Nothing Updated"
          });
        }
      })
      .catch(err => {
        res.json({ msg: "Error in FindOne", error: err });
      });
  }
};

module.exports = productOperations;
