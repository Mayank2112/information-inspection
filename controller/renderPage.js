module.exports.renderPageWithMessage = (req, res, page, message) => {
  if (req.session.user) {
    res.render(page, { messageHolder : { message, user: req.session.user }})
  }
  res.render(page, { messageHolder : { message }})
};
