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
    orderModel
      .find({ userid: userid })
      .populate("products.product_id")
      .exec(function(err, data) {
        if (err) {
          response.status(appCodes.SERVER_ERROR).json({
            status: appCodes.ERROR,
            message: "Error in DB During Find Operation"
          });
        } else {
          if (data) {
            console.log("data", data);
            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              message: "Orders ",
              record: data
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid details  "
            });
          }
        }
      });
  }
};
module.exports = orderOperations;
