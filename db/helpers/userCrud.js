const UserModel = require("../models/user");
const appCodes = require("../../utils/appcodes");
const encryptOperations = require("../../utils/encrypt");

const userOperations = {
  add(userObject, response) {
    userObject.password = encryptOperations.encryptPassword(
      //password encryption
      userObject.password
    );
    UserModel.create(userObject, err => {
      if (err) {
        console.log("Error in Record Add");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        console.log("Record Added..");
        response
          .status(appCodes.OK)
          .json({ status: appCodes.SUCCESS, message: "Record Added" });
      }
    });
    // add(userObject) {
    //   userObject.password = encryptOperations.encryptPassword(
    //     //password encryption
    //     userObject.password
    //   );
    //   UserModel.create(userObject, err => {
    //     if (err) {
    //       console.log("err", err);
    //     } else {
    //       console.log("record add");
    //     }
    //   });
  },
  delete() {},
  update() {},
  search(userObject, response) {
    UserModel.findOne({ userid: userObject.userid }, (err, doc) => {
      //match userid
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          if (
            encryptOperations.compareHash(userObject.password, doc.password) //match pwd
          ) {
            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              message: "Welcome " + doc.userid,
              record: doc
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
  }
};
module.exports = userOperations;
// userOperations.add({ userid: "test123", password: "abcd123", name: "testing" });
