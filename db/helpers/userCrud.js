const UserModel = require("../models/user");
const appCodes = require("../../utils/appcodes");
const encryptOperations = require("../../utils/encrypt");
const tokenOperations = require("../../utils/token");
const sendMail = require("../../utils/mail"); //nodemailer

const userOperations = {
  //to register new user
  add(userObject, response) {
    //password encryption
    userObject.password = encryptOperations.encryptPassword(
      userObject.password
    );
    UserModel.create(userObject, (err) => {
      if (err) {
        console.log("Error in Record Add");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        console.log("Record Added..");
        sendMail(userObject.userid, "register");

        response
          .status(appCodes.OK)
          .json({ status: appCodes.SUCCESS, message: "Record Added" });
      }
    });
  },
  // to find email id of user if he forget pwd
  findid(userObject, response) {
    UserModel.findOne({ userid: userObject.userid }, (err, doc) => {
      if (err) {
        console.log("Error in Email Search");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Email Not Searched Due to Error"
        });
      } else {
        if (doc) {
          console.log("Email found");

          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            userid: doc.userid,
            record: doc
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid Userid "
          });
        }
      }
    });
  },
  //to reset forgotten pwd
  resetpwd(userObject, response) {
    console.log("reset pwd");
    userObject.password = encryptOperations.encrypt(userObject.password);
    UserModel.findOneAndUpdate(
      { userid: userObject.userid },
      { $set: { password: userObject.password } },
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
            sendMail(userObject.userid, "reset");

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
  //to update details
  update(userObject, response) {
    UserModel.findOneAndUpdate(
      { userid: userObject.userid },
      { $set: userObject },
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
  //to remove user
  delteone(userObject, response) {
    UserModel.findOneAndRemove({ userid: userObject.userid }, (err) => {
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
  //user login
  login(userObject, response) {
    UserModel.findOne({ userid: userObject.userid }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          if (
            encryptOperations.compareHash(userObject.password, doc.password)
          ) {
            token = tokenOperations.generateToken({
              userid: userObject.userid
            });
            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              message: "Welcome " + doc.userid,
              record: doc,
              token: token
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Userid or Password "
            });
          }
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid Userid or Password "
          });
        }
      }
    });
  },
  //to change pwd
  changepwd(userObject, response) {
    UserModel.findOne({ userid: userObject.userid }, (err, doc) => {
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
            encryptOperations.compareHash(userObject.oldpassword, doc.password)
          ) {
            userObject.password = encryptOperations.encryptPassword(
              userObject.password
            );
            UserModel.findOneAndUpdate(
              { userid: userObject.userid },
              { $set: userObject },
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
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Password "
            });
          }
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid Userid "
          });
        }
      }
    });
  }
};
module.exports = userOperations;
