const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/infoSpec', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:String,
    email:String,
    company:String,
    username:String,
    hash:String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
