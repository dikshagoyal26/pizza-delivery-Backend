const tokenOpr = require("./token");
const appcodes = require("./appcodes");
function checkToken(request, response, next) {
  var token = request.headers["auth-token"];
  if (token) {
    let decoded = tokenOpr.verifyToken(token);
    console.log("After Token Verified ", decoded);
    if (!decoded) {
      console.log("After Token Verified invalid token");

      response
        .status(401)
        .json({ status: appcodes.ERROR, message: "Invalid Token" });
    } else {
      console.log("After Token Verified verifed");

      next();
    }
  } else {
    console.log("After Token Verified unauth");

    response.status(401).json({
      status: appcodes.ERROR,
      message: "U r UnAuthorized to access this Page"
    });
  }
}
module.exports = checkToken;
