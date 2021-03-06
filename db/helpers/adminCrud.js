const AdminModel = require("../models/admin");
const appCodes = require("../../utils/appcodes");
const encryptOperations = require("../../utils/encrypt");
const tokenOperations = require("../../utils/token");
const sendMail = require("../../utils/mail"); //nodemailer

const adminOperations = {
  // login
  login(adminObject, response) {
    AdminModel.findOne({ adminid: adminObject.adminid }, (err, doc) => {
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
              record: {
                name: doc.name,
                isFirstTym: doc.isFirstTym,
                adminid: doc.adminid
              },
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
  // to chng pwd as per req
  changepwd(adminObject, response) {
    AdminModel.findOne({ adminid: adminObject.adminid }, (err, doc) => {
      if (err) {
        console.log("Error in Email Search");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Email Not Searched Due to Error"
        });
      } else {
        if (doc) {
          console.log("Email found");

          if (
            encryptOperations.compareHash(adminObject.oldpassword, doc.password)
          ) {
            adminObject.password = encryptOperations.encryptPassword(
              adminObject.password
            );
            AdminModel.findOneAndUpdate(
              { adminid: adminObject.adminid },
              { $set: adminObject },
              { upsert: true },
              (err, doc) => {
                if (err) {
                  console.log("Error in Record Update", err);
                  response.status(appCodes.SERVER_ERROR).json({
                    status: appCodes.ERROR,
                    message: "Record not updated Due to Error"
                  });
                } else {
                  if (doc) {
                    console.log("Record Deleted ");

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
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Password "
            });
          }
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid adminid "
          });
        }
      }
    });
  },
  // admin to add another admin
  add(adminObject, response) {
    if (adminObject.password) {
      //password encryption
      adminObject.password = encryptOperations.encryptPassword(
        adminObject.password
      );
    }
    AdminModel.create(adminObject, (err) => {
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
  // to login first time and set new pwd(firsttym=true)
  updatepwd(adminObject, response) {
    adminObject.password = encryptOperations.encryptPassword(
      //password encryption
      adminObject.password
    );

    AdminModel.findOneAndUpdate(
      { adminid: adminObject.adminid },
      {
        $set: {
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
  //to update details
  update(adminObject, response) {
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
          isFirstTym: true
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
  //detele another admin when(frsttym=false)
  delete(adminObject, response) {
    AdminModel.findOne({ adminid: adminObject.adminid }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          AdminModel.remove({ adminid: adminObject.adminid }, (err) => {
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
            message: "Invalid adminid  "
          });
        }
      }
    });
  },
  //to search for all admins
  search(response) {
    AdminModel.find({}, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          var arr = new Array();
          for (let i = 0; i < doc.length; i++) {
            arr.push({
              name: doc[i].name,
              isFirstTym: doc[i].isFirstTym,
              adminid: doc[i].adminid
            });
          }
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Docs Found ",
            record: arr
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
  //to obtain list of orders
  orderSearch(response) {
    const OrderModel = require("../models/orders");
    OrderModel.find({})
      .populate("products.product_id")
      .exec(function(err, data) {
        if (err) {
          response.status(appCodes.SERVER_ERROR).json({
            status: appCodes.ERROR,
            message: "Error in DB During Find Operation"
          });
        } else {
          if (data) {
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
  },
  //to update any particular order
  orderUpdate(orderObject, response) {
    const OrderModel = require("../models/orders");

    OrderModel.findOneAndUpdate(
      { orderid: orderObject.orderid },
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
              adminid: doc.userid
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
  //to search feedbacks
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
