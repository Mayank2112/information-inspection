const mongoose = require('mongoose');
const blk=require('../classes/Block');


// mongoose.connect('mongodb://localhost:27017/infoSpec', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const productChainSchema = new Schema({
    companyName:String,
    prod:Array
});

const ProductChain = mongoose.model('ProductChain', productChainSchema);

module.exports = ProductChain;
