const userModel = require('../model/employee')
const mail = require('../utility/mail')
const bcrypt = require('bcryptjs')

async function registerUser(req, res) {
    let newUser = {};
    newUser.userName = req.body.username;
    newUser.email = req.body.email;
    newUser.hash = bcrypt.hashSync(req.body.pwd1, 10);

    if (await userModel.findOne({ userName: req.body.username })) {
        return res.send('Username "' + req.body.username + '" is already taken')
    }
    else {
        let user = new userModel(newUser);
        mail.sendMail(newUser)
        user.save()
            .then(data => {
                return res.send("User: " + data.userName + " registered!")
            }).catch(err => {
                res.send(error)
            });
    }
}

function authenticateUser(req, res) {
    userModel.findOne({ userName: req.body.username }, function (err, result) {
        isPasswordCorrect = bcrypt.compareSync(req.body.pwd1, result.hash)
        if (isPasswordCorrect)
            return res.send("Welcome: " + req.body.username)
        else
            return res.send("Username or password invalid");
    })
}

function viewAllUsers(req, res) {
    userModel.find()
        .then(product => {
            return res.send(product);
        }).catch(err => {
            return res.send(err)
        });
};

module.exports = {
    registerUser, viewAllUsers, authenticateUser
}
