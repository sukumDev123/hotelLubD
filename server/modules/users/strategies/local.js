'use strict'
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User')


export function passportLocal() {
    passport.use(new LocalStrategy(function (username, password, done) {

        User.find({ username: username }).then(user => {
            if (!!user || !user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid username or password.'
                })
            }
            return done(null, user);

        }).catch(err => console.log(err));

    }))

}