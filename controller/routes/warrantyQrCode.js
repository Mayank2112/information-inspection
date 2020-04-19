const express = require('express');
const QRImg = require('qr-image');
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
    return renderPage.renderPageWithMessage(req, res, 'pages/warranty', message);
  }

  const time = companyDetails.expiryDate - companyDetails.manufacturingDate;
  const warranty = Math.abs(time) / 10000;
  bc = {
    "warranty": warranty
  }
  const qr = 'Warranty :' + bc.warranty + ' years';

  const qr_png = QRImg.imageSync(qr, { type: 'png' });
  let warranty_qrcode_file = companyDetails.name + "warranty" + '.png';
  fs.writeFileSync(warranty_qrcode_file, qr_png);

  const message = 'QR Code generated successfully';
  res.download(path.join(__dirname , "../../qrCodes/"+ warranty_qrcode_file));
  // res.render('pages/home', {
  //   message
  // });
});

module.exports = router;
