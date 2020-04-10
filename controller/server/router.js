const express = require('express');
const warrantyQrCode = require('../routes/warrantyQrCode');
const ProductChain = require('../../model/schema/ProductChain');
const trackQrCode = require('../routes/trackQrCode');
const warranty = require('../routes/warranty');
const Employee = require('../../model/schema/employee');
const Company = require('../../model/schema/company');
const append = require('../routes/append');
const signup = require('../routes/signup');
const login = require('../routes/login');
const logout = require('../routes/logout');
const track = require('../routes/track');
const renderPage = require('../renderPage');

const router = express.Router();

router.use('/track', track);
router.use('/login', login);
router.use('/logout', logout);
router.use('/signup', signup);
router.use('/append', append);
router.use('/warranty', warranty);
router.use('/trackqrcode', trackQrCode);
router.use('/warrantyqrcode', warrantyQrCode);

router.get('/index', (req, res) => {
  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/home', message);
});

router.get('/home', (req, res) => {
  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/home', message);
});

router.get('/employees', (req, res) => {
  Employee.find({}, function (err, users) {
    res.send(users);
  });
});

router.get('/productchain', (req, res) => {
  ProductChain.find({}, function (err, users) {
    res.send(users);
  });
});

router.get('/company', (req, res) => {
  // let newData ={
  //   "companyName" : "Sony",
  //   "privateKey" : 4321
  // }
  // let company = new Company(newData);
  //         company.save()
  //           .then(data => {
  //             const message = '';
  //             res.render('pages/home', {
  //               message
  //             });
  //           }).catch(error => {
  //             const message = 'An error occured. Try Again';
  //             res.render('pages/signup_page', {
  //               message
  //             });
  //           });
  Company.find({}, function (err, users) {
    res.send(users);
  });
});

router.get('/', function (req, res) {
  console.log("Welcome to the new world !!")

  const message = ''
  return renderPage.renderPageWithMessage(req, res, 'pages/home', message);
});

module.exports = router;
