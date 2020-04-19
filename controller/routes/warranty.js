const express = require('express');
const renderPage = require('../renderPage');
const blkch = require('../../model/classes/Blockchain');
const router = express.Router();

router.post('/', async function (req, res) {
  console.log(req.body);
  
  let blockchain = await blkch.run_getchain(req.body.companyName, req.body.id);
  const bc1 = JSON.stringify(blockchain);
  const companyDetails = JSON.parse(bc1);
console.log(bc1);

  if (bc1.length === 0) {
    const message = 'No product available for these details';
    return renderPage.renderPageWithMessage(req, res, 'pages/warranty', message);
  }
  const time = companyDetails.expiryDate - companyDetails.manufacturingDate;
  const warranty = Math.abs(time) / 10000;
  blockchain = {
    "warranty": warranty
  }
  return renderPage.renderPageWithMessage(req, res, 'pages/image', blockchain);
});

router.get('/', (req, res) => {
  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/warranty', message);
});

module.exports = router;
