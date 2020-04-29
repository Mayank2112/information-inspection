const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/infoSpec', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName:String,
    privateKey:String,
});
console.log('yes');
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
