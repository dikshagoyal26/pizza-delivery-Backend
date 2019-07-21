var connection = require("../connection");
const Schema = connection.Schema;
var FeedbackSchema = new Schema({
  feedbackid: {
    type: String,
    required: true
  },
  userid: {
    type: String, //value will be _id of usermodel
    required: true // ref: 'users'
  },
  description: {
    type: String,
    max: 250
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const FeedbackModel = connection.model("feedbacks", FeedbackSchema);
module.exports = FeedbackModel;
