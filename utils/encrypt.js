const bcrypt = require("bcrypt");
const encryptOperations = {
  salt: 10,
  encryptPassword(password) {
    return bcrypt.hashSync(password, this.salt);
  },
  compareHash(password, hashPwd) {
    return bcrypt.compareSync(password, hashPwd);
  }
};
// console.log(encryptOperations.encryptPassword("admin123"));
module.exports = encryptOperations;
