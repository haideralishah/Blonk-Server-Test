const express = require("express");
const app = express.Router();
const newUsers = require('../model/model');
var bcrypt = require("bcrypt-nodejs");


//POST REQUEST
//register new user in database

app.post("/register", function (req, res) {
    var userCreate = new newUsers.Users({
        Email: req.body.email,
        Password: req.body.password,
        Name: req.body.name,
    })

    userCreate.save(function (err, succes) {
        if (!err) {
            res.send(succes)
        }
        else {
            res.send({ ErrMessage: err })
        }
    });
});

//signing and check the user is available in database

app.post("/signIn", function (req, res) {

    newUsers.Users
        .findOne({ Email: req.body.email }, function (err, success) {
            if (!err && success !== null) {
                bcrypt.compare(req.body.password, success.Password, function (error, isMatch) {
                    if (!error && isMatch === true) {
                        res.send(success);
                    }
                    else if (isMatch && isMatch === false) {
                        res.send(success);
                    }
                    else {
                        res.send({ message: 'Incorrect Password' });
                    }
                })
            }
            else if (success === null) {
                res.send({ message: 'incorrect useremail or password' });
            }
            else {
                res.send({ message: 'Something went wrong' });
            }

        })

})


module.exports = app;