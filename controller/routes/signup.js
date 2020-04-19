const express = require('express');
const bcrypt = require('bcryptjs');
const Employee = require('../../model/schema/employee');
const Company = require('../../model/schema/company');
const renderPage = require('../renderPage');
const router = express.Router();

router.post('/', async function (req, res) {
  let newUser = {
  "name" : req.body.name,
  "email" : req.body.email,
  "company" : req.body.company,
  "username" : req.body.username
  };
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  if (password === confirm_password) {
    newUser.hash = bcrypt.hashSync(req.body.password, 10);

    if (await Employee.findOne({ userName: req.body.username })) {
      const message = 'Username "' + req.body.username + '" is already taken'
      return renderPage.renderPageWithMessage(req, res, 'pages/signup_page', message);
    } else {
      Company.findOne({ companyName: req.body.company }, function (err, result) {

        if (req.body.key === "0000") {
          let employee = new Employee(newUser);
          employee.save()
            .then(data => {
              const message = '';
              return renderPage.renderPageWithMessage(req, res, 'pages/home', message);
            }).catch(error => {
              const message = 'An error occured. Try Again';
              return renderPage.renderPageWithMessage(req, res, 'pages/signup_page', message);
            });
        }
        else {
          const message = 'Keys doesnot match'
          return renderPage.renderPageWithMessage(req, res, 'pages/signup_page', message);
        }
      });
    }
  }
  else {
    const message = 'Password and Confirm Password doesnot match'
    return renderPage.renderPageWithMessage(req, res, 'pages/signup_page', message);
  }
})

router.get('/', (req, res) => {
  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/signup_page', message);
});

module.exports = router;
