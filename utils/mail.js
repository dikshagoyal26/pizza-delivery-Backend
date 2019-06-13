var nodemailer = require("nodemailer");
var mailKeys = require("../config/mail");
function sendMail(userid, type) {
  if (type === "register") {
    template = require("../template/registertemplate")(userid);
    subjectdata = "Pizza Delivery";
  } else if (type === "reset") {
    template = require("../template/foregtTemplate")(userid);
    subjectdata = "Reset Password for Pizza Delivery";
  } else if (type === "feedback") {
    template = require("../template/feedbackTemplate")(userid);
    subjectdata = "Feedback Recorded for Pizza Delivery";
  } else if (type === "order") {
    template = require("../template/orderTemplate")(userid);
    subjectdata = "Order Confirmed for Pizza Delivery";
  }
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailKeys.user,
      pass: mailKeys.pass
    }
  });

  const mailOptions = {
    from: mailKeys.user, // sender address
    to: userid, // list of receivers
    subject: subjectdata, // Subject line
    html: template
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
module.exports = sendMail;
