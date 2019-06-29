const feedbackModel = require("../models/feedback");
const appCodes = require("../../utils/appcodes");
const sendMail = require("../../utils/mail"); //nodemailer
const uuid = require("uuid");

const feedbackOperations = {
  add(feedbackObject, response) {
    feedbackObject.feedbackid = uuid("feedback", feedbackObject.userid);
    feedbackModel.create(feedbackObject, (err) => {
      if (err) {
        console.log("Error in Record Add", err);
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        console.log("Record Added..");
        sendMail(feedbackObject.userid, "feedback");

        response
          .status(appCodes.OK)
          .json({
            status: appCodes.SUCCESS,
            message: "Record Added",
            feedbackid: feedbackObject.feedbackid
          });
      }
    });
  },
  update(feedbackObject, response) {
    feedbackModel.findOneAndUpdate(
      { feedbackid: feedbackObject.feedbackid },
      { $set: feedbackObject },
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
  delete(feedbackObject, response) {
    feedbackModel.findOneAndRemove(
      { feedbackid: feedbackObject.feedbackid },
      (err) => {
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
      }
    );
  },
  search(feedbackObject, response) {
    feedbackModel.find({ userid: feedbackObject.userid }, (err, doc) => {
      //match userid
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Feedback recorded for " + doc.userid,
            record: doc
          });
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
module.exports = feedbackOperations;
