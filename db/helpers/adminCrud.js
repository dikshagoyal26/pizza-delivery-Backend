const AdminModel = require("../models/admin");
const appCodes = require("../../utils/appcodes");
const encryptOperations = require("../../utils/encrypt");
const tokenOperations = require("../../utils/token");
const sendMail = require("../../utils/mail"); //nodemailer

const adminOperations = {
  add(adminObject, response) {
    adminObject.password = encryptOperations.encryptPassword(
      //password encryption
      adminObject.password
    );
    AdminModel.create(adminObject, err => {
      if (err) {
        console.log("Error in Record Add");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        console.log("Record Added..");
        sendMail(adminObject.adminid, "register");

        response
          .status(appCodes.OK)
          .json({ status: appCodes.SUCCESS, message: "Record Added" });
      }
    });
  },
  update(adminObject, response) {
    adminObject.password = encryptOperations.encryptPassword(
      //password encryption
      adminObject.password
    );
    AdminModel.findOneAndUpdate(
      { adminid: adminObject.adminid },
      { $set: adminObject },
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
              adminid: doc.adminid
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
  delete(adminObject, response) {
    AdminModel.findOneAndRemove({ adminid: adminObject.adminid }, err => {
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
  search(response) {
    AdminModel.find({}, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Docs Found ",
            record: doc
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid adminid or Password "
          });
        }
      }
    });
  }
};
module.exports = adminOperations;
