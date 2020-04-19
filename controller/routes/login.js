const express = require('express');
const router = express.Router();
const employeeOperations = require('../../model/operations/employeeOperations');
const redirector = require('../redirections/redirector');
const renderPage = require('../renderPage');

// Post method for handling login end point
router.post('/', redirector.redirectHome, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  employeeOperations.verifyUser(username, password)
    .then(isUserValid => {

      // If user is valid
      if (isUserValid) {
        const message = "Welcome: " + req.body.username;
        req.session.user = req.body.username;
        return renderPage.renderPageWithMessage(req, res, 'pages/home', message);
      }

      //If entered credentials are not valid
      const message = 'Invalid Credentials';
      return renderPage.renderPageWithMessage(req, res, 'pages/login', message);
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/', redirector.redirectHome, (req, res) => {
  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/login', message);
});

module.exports = router;
