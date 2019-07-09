const bcrypt = require("bcrypt");
const encryptOperations = {
  salt: 10,
  encryptPassword(password) {
    return bcrypt.hashSync(password, this.salt); //return hashed pwd
  },
  compareHash(password, hashPwd) {
    return bcrypt.compareSync(password, hashPwd); //return boolean
  }
};
// console.log(encryptOperations.encryptPassword("admin123"));
module.exports = encryptOperations;
