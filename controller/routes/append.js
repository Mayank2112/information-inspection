const express = require('express');
const router = express.Router();
const companyOperations = require('../../model/operations/companyOperations');
const redirect = require('../redirections/redirector');
const renderPage = require('../renderPage');

// Post method for append end point
router.post('/', redirect.redirectLogin, async function (req, res) {
  let newProduct = {
    "name": req.body.name,
    "companyName": req.body.companyName,
    "P_ID": req.body.id,
    "manufacturingDate": req.body.manufacturingDate,
    "expiryDate": req.body.expiryDate,
    "stage": req.body.stage
  };
  companyOperations.addProductToChain(newProduct)
    .then(message => {
      renderPage.renderPageWithMessage(req, res, 'pages/home', message);
    })
    .catch(err => {
      console.error(err);
    })
});

router.get('/',redirect.redirectLogin, (req, res) => {
  res.render('pages/append')
});

module.exports = router;
