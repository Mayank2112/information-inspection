const express = require('express');
const session = require('express-session');
const path = require('path');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

const db = require('../auth/keys').MongoURI

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB Connected Globally.....'))
    .catch(err=> console.log(err))

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '../../views/img/core-img')));

app.use(express.static(path.join(__dirname, '../../views/stylesheets/css')));

app.use(express.static(path.join(__dirname, '../../views/stylesheets/scss')));

// Set options for cookie
const cookieObject = {
  secure: false,
  httpOnly: true,
  maxAge: 5000 * 60,
};

// Set session Object
app.use(session({
  name: 'sid',
  secret: '36216584213541It\'s!a!secret',
  resave: false,
  saveUninitialized: false,
  cookie: cookieObject
}));

app.use('/', router);

app.listen(8080, () => {
  console.log(`Listening on port : 8080`);
});
