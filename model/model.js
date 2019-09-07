const mongoose = require('mongoose');
var SALT_FACTOR = 10;
var bcrypt = require("bcrypt-nodejs");

//mongoDb collection schema for register users
var UsersSchema = mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Name: { type: String, required: true },
    CreatedOn: { type: Date, default: Date.now() }
});

//mongoDb collection schema for post An Article
var CreatejobSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    designation: { type: String, required: true },
    uid: { type: String, required: true },
    date: { type: String, default: Date.now() },
});

UsersSchema.pre("save", function (done) {
    var user = this;

    if (!user.isModified("Password")) {
        return done();
    }
    //generating a hash password using bcrypt
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            console.log(err, 'salt err');
            //catch the error
            return done(err);
        }
        bcrypt.hash(user.Password, salt, function () { }, function (err, hashedPassword) {
            if (err) {
                //if error
                //catch the error
                return done(err);
            }
            // console.log(hashedPassword, 'hashedPassword')
            //if success
            //set user password to generated encrypt password 
            user.Password = hashedPassword;
            done();
        });
    });
});

//users schema
const Users = mongoose.model('Users', UsersSchema);
//articles schema
const Jobs = mongoose.model('job', CreatejobSchema);



const obj = {
    Users,
    Jobs,
}
//export object contain users,articles
module.exports = obj;