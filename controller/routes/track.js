const express = require('express');
const blkch = require('../../model/classes/Blockchain');
const renderPage = require('../renderPage');
const router = express.Router();

router.post('/', async function (req, res) {
  let bc = await blkch.run_getchain(req.body.companyName, req.body.id);
  const blockchain = JSON.stringify(bc);

  if (blockchain.length === 0) {
    const message = 'No product available for these details'
    return renderPage.renderPageWithMessage(req, res, 'pages/track', message);
  }
  return renderPage.renderPageWithMessage(req, res, 'pages/image', bc);
});

router.get('/', (req, res) => {
  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/track', message);
});

module.exports = router;
