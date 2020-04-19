const express = require('express');
const router = express.Router();
const redirect = require('../redirections/redirector');

// Destroy session and clear cookie for user
router.get('/',redirect.redirectHome, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500);
      return res.redirect('/home');
    }
    res.clearCookie('sid');
    res.status(200);
    return res.redirect('/login');
  });
});

// If request contain any other method than post then error message is sent to user
router.all('/', (req, res) => res.sendStatus(405));

module.exports = router;
