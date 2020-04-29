const nodemailer = require("nodemailer");

async function mail(to_mail, mail_subject, mail_content) {

  const mail_footer = '<p>Thanks & Regards,<br/>Team Information Inspection</p>';

  const mailOptions = {
    to: to_mail,
    from: 'kamalobrothers@gmail.com',
    subject: mail_subject,
    html: mail_content + mail_footer
  };

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kamalobrothers@gmail.com',
      pass: 'ka@ma@lo@'
    }
  });

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, function (err, result) {

      if (err) {
        reject(0);
      }
      else {
        resolve(1)
      }
    })
  })
}

async function run_mail(mail_subject, mail_content) {
  const res = await mail('lmvirufan319@gmail.com', mail_subject, mail_content)
  return res
}

module.exports = {
  run_mail,
}
