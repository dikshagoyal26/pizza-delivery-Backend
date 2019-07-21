const jwt = require("jsonwebtoken");
const tokenOperations = {
  SECRETKEY: "UCANTSEEME",
  generateToken(userid) {
    var token = jwt.sign({ userid }, this.SECRETKEY, { expiresIn: "1h" });
    return token;
  },
  verifyToken(clientTokenNumber) {
    var decoded = jwt.verify(clientTokenNumber, this.SECRETKEY);
    if (decoded) {
      console.log("Verified ", decoded.userid);
      return decoded;
    } else {
      console.log("Token Not Matched...");
    }
  }
};
module.exports = tokenOperations;
