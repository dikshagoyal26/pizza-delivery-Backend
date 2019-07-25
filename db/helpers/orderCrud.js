const orderModel = require("../models/orders");
const appCodes = require("../../utils/appcodes");
const sendMail = require("../../utils/mail"); //nodemailer
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

const orderOperations = {
  //add order
  add(orderObject, response) {
    orderObject.orderid = shortid.generate();
    orderModel.create(orderObject, (err) => {
      if (err) {
        console.log("Error in Record Add", err);
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        console.log("Record Added..");
        sendMail(orderObject.userid, "order");

        response.status(appCodes.OK).json({
          status: appCodes.SUCCESS,
          message: "Record Added",
          orderid: orderObject.orderid
        });
      }
    });
  },
  //update order
  update(orderObject, response) {
    orderModel.findOneAndUpdate(
      { orderid: orderObject.orderid },
      { $set: orderObject },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in Record Update", err);
          response.status(appCodes.SERVER_ERROR).json({
            status: appCodes.ERROR,
            message: "Record not updated Due to Error"
          });
        } else {
          if (doc) {
            console.log("Record updated ");

            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              userid: doc.userid
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Details "
            });
          }
        }
      }
    );
  },
  //search for orders for any user
  search(userid, response) {
    orderModel.find({ userid: userid }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          console.log("doc is", doc);
          var productarr = new Array();
          var record = new Array();
          for (let i = 0; i < doc.length; i++) {
            for (let j = 0; j < doc[i].products.length; j++) {
              const ProductModel = require("../models/product");
              ProductModel.findOne(
                { _id: doc[i].products[j].product_id },
                (err, data) => {
                  if (err) {
                    response.status(appCodes.SERVER_ERROR).json({
                      status: appCodes.ERROR,
                      message: "Error in DB During Find Operation"
                    });
                  } else {
                    if (data) {
                      productarr.push({
                        productid: data.productid,
                        name: data.name,
                        price: data.price,
                        ingredients: data.ingredients,
                        category: data.category,
                        toppings: data.toppings,
                        description: data.description,
                        qty: doc[i].products[j].qty
                      });
                      record.push({
                        orderid: doc[i].orderid,
                        userid: doc[i].userid,
                        date: doc[i].date,
                        paymentmode: doc[i].paymentmode,
                        address: doc[i].address,
                        name: doc[i].name,
                        total: doc[i].total,
                        status: doc[i].status,
                        productarr: productarr
                      });
                      if (i == doc.length - 1) {
                        response.status(appCodes.OK).json({
                          status: appCodes.SUCCESS,
                          message: "Orders for userid " + userid,
                          record: record
                        });
                      }
                    } else {
                      response.status(appCodes.RESOURCE_NOT_FOUND).json({
                        status: appCodes.FAIL,
                        message: "Invalid vehicleid  "
                      });
                    }
                  }
                }
              );
            }
          }
        }
      }
    });
  }
};
module.exports = orderOperations;
