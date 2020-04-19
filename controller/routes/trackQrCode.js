const express = require('express');
const QRImg = require('qr-image');
const path = require('path');
const fs = require('fs');
const renderPage = require('../renderPage');
const blkch = require('../../model/classes/Blockchain');
const router = express.Router();

router.post('/', async (req, res) => {

  let bc = await blkch.run_getchain(req.body.companyName, req.body.id);
  const bc1 = JSON.stringify(bc);
  const companyDetails = JSON.parse(bc1);

  if (bc1.length === 0) {
    const message = 'No product available for these details';
    return renderPage.renderPageWithMessage(req, res, 'pages/track', message);
  }

  const qr = 'Company Name : ' + companyDetails.companyName + '\nProduct ID : ' + companyDetails.P_ID + '\nProduct Name : ' + companyDetails.name + '\nManufacturing Date : ' + companyDetails.manufacturingDate + '\nExpiry Date : ' + companyDetails.expiryDate + '\nStage : ' + companyDetails.stage;

  const qr_png = QRImg.imageSync(qr, { type: 'png' });
  let warranty_qrcode_file = companyDetails.P_ID + "warranty" + '.png';
  fs.writeFileSync("./qrCodes/"+warranty_qrcode_file, qr_png);

  const message = 'QR Code generated successfully'
  res.download(path.join(__dirname , "../../qrCodes/"+ warranty_qrcode_file));
  // res.render('pages/home', {
  //   message
  // });
});

module.exports = router;
