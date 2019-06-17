const AdminModel = require("../models/admin");
const appCodes = require("../../utils/appcodes");
const encryptOperations = require("../../utils/encrypt");
const tokenOperations = require("../../utils/token");
const sendMail = require("../../utils/mail"); //nodemailer

const adminOperations = {
  login(adminObject, response) {
    AdminModel.findOne({ adminid: adminObject.adminid }, (err, doc) => {
      //match adminid
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          if (
            encryptOperations.compareHash(adminObject.password, doc.password) //match pwd
          ) {
            token = tokenOperations.generateToken({
              adminid: adminObject.adminid
            });
            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              message: "Welcome " + doc.adminid,
              record: doc,
              token: token
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid adminid or Password "
            });
          }
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid adminid or Password "
          });
        }
      }
    });
  },
  add(adminObject, response) {
    if (adminObject.password) {
      adminObject.password = encryptOperations.encryptPassword(
        //password encryption
        adminObject.password
      );
    }
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
    var adminid;
    if (adminObject.password) {
      adminObject.password = encryptOperations.encryptPassword(
        //password encryption
        adminObject.password
      );
    } else {
      adminObject.password =
        "$2b$10$LK4Pszkjusj7a6CebW5NquirrVu6MdyiVtZMkZf7gidreQMEr5R5y";
    }
    if (adminObject.newadminid) {
      adminid = adminObject.newadminid;
    } else {
      adminid = adminObject.adminid;
    }
    AdminModel.findOneAndUpdate(
      { adminid: adminObject.adminid },
      {
        $set: {
          adminid: adminid,
          name: adminObject.name,
          password: adminObject.password,
          isFirstTym: false
        }
      },
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
    AdminModel.findOne({ adminid: adminObject.adminid }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          AdminModel.remove({ adminid: adminObject.adminid }, err => {
            if (err) {
              response.status(appCodes.SERVER_ERROR).json({
                status: appCodes.ERROR,
                message: "Error in DB During Delete Operation"
              });
            } else {
              response.status(appCodes.OK).json({
                status: appCodes.SUCCESS,
                message: "Record Deleted "
              });
            }
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid adminid or Password "
          });
        }
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
            message: "No record Found "
          });
        }
      }
    });
  },
  orderSearch(response) {
    const OrderModel = require("../models/orders");

    OrderModel.find({}, (err, doc) => {
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
            message: "Error "
          });
        }
      }
    });
  },
  orderUpdate(orderObject, response) {
    const OrderModel = require("../models/orders");

    OrderModel.findOneAndUpdate(
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
  feedbackSearch(response) {
    const FeedbackModel = require("../models/feedback");

    FeedbackModel.find({}, (err, doc) => {
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
            message: "No feedback found"
          });
        }
      }
    });
  }
};
module.exports = adminOperations;
