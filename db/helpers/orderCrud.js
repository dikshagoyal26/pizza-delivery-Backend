const orderModel = require("../models/order");
const appCodes = require("../../utils/appcodes");
const tokenOperations = require("../../utils/token");
const sendMail = require("../../utils/mail"); //nodemailer

const orderOperations = {
  add(orderObject, response) {
    orderModel.create(orderObject, err => {
      if (err) {
        console.log("Error in Record Add");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        console.log("Record Added..");
        sendMail(userObject.userid, "orderr");

        response
          .status(appCodes.OK)
          .json({ status: appCodes.SUCCESS, message: "Record Added" });
      }
    });
  },
  update(orderObject, response) {
    orderModel.findOneAndUpdate(
      { userid: orderObject.userid },
      { $set: orderObject },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in Record Update");
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
  search(orderObject, response) {
    orderModel.findOne({ userid: orderObject.userid }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Welcome " + doc.userid,
            record: doc
          });
        }
      }
    });
  }
};
module.exports = orderOperations;
