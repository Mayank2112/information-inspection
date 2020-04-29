const Employee = require('../schema/employee');
const bcrypt = require('bcryptjs');

module.exports.verifyUser = (username, password) => {
  return new Promise((resolve, reject) => {
    Employee.findOne({ username: username }, function (err, result) {
      if (result) {
        const isPasswordCorrect = bcrypt.compareSync(password, result.hash);
        return resolve(isPasswordCorrect);
      } 
      return resolve(false);
    });
  });
};
