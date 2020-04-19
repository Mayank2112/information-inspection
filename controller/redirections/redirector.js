// Redirect to login page if session is not active
module.exports.redirectLogin = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401);
  return res.redirect('/login');
};

// Redirect to dashboard if user is already logged in
module.exports.redirectHome = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/home');
  }
  return next();
};
