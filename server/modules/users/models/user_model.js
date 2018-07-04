import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';
const Schema = mongoose.Schema;
const owasp = require('owasp-password-strength-test')
owasp.config({
    allowPassphrases: true,
    maxLength: 128,
    minLength: 10,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4,
});


const User = new Schema({
    firstname: {
        type: String,
        required: 'Please input your firstname'

    },
    lastname: {
        type: String,
        required: 'Please input your lastname '
    },
    displayname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Please input your email',
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    },
    salt: String,
    provider: {
        type: String,
        required: true
    },
    prividerId: String,
    providerData: {},
    username: {
        type: String,
        unique: true,
        required: 'Please input your username'
    },
    password: {
        type: String,
        required: 'Please input your password'
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        //default: ['user'],
        required: 'Please provide at least one role'
    },
    phone: {
        type: String,
        unique: true,
        required: "Plase input you phone number."
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    reserveNum: {
        type: Number,
        default: 0
    }
});



User.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        let owaspTest = this.owaspTestFunction(this.password);
        if (owaspTest.status) {
            this.salt = crypto.randomBytes(256).toString('base64');
            this.password = this.hashPassword(this.password);
        } else {
            next(owaspTest.msg)
        }
    }
    next();

})

User.methods.hashPassword = function (password) {
    if (password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
    }
}

User.methods.authenticate = function (password) {

    return this.password === this.hashPassword(password);
}

User.methods.owaspTestFunction = function (password) {
    let test = owasp.test(password);
    if (test.strong == true) {
        return {
            status: true
        }
    } else {
        return {
            status: false,
            msg: test.errors[0]
        }
    }
}

User.statics.findUniqueUsername = function (username, suffix) {
    let _this = this;
    let possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) callback(possibleUsername);
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null)
        }
    })
}



mongoose.model('User', User);