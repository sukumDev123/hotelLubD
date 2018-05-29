'use strict';

import passport from 'passport';
import mongoose from 'mongoose';
import path from 'path';

export function passportFunction() {
    const User = mongoose.model('User');
    passport.serializeUser(function (user, done){
        done(null, user.id)
    });
    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }, '-password -salt', function (err, user)  {
            done(err, user)
        })
    })
    let { passportLocal } = require(path.resolve('./modules/users/strategies/local.js'));
    
    passportLocal()
}