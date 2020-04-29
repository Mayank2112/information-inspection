const Company = require('../schema/company');
const blkch = require('../classes/Blockchain');
const mail = require('../classes/mailer')

module.exports.addProductToChain = newProduct => {
  return new Promise((resolve, reject) => {
    console.log(newProduct.companyName);
    
    Company.findOne({ companyName: newProduct.companyName }, async function (err, result) {
      console.log(result+ "123456789");
      console.log(err);

      if (result) {
        let ne = await blkch.run_addblock(newProduct);
        message = ne.comment;
        console.log(message)
        if(message === 'Product already exists in Product chain of this Company'){
          const resp = await mail.run_mail('Warning','Product already exists in Product chain of this Company')
        }
        return resolve(message);
      }
      return resolve('Company not registeredsss');
    });
  });
}
