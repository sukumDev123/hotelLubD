'use strict';
import mongoose from 'mongoose';
import config from '../../../config/config';
import passport from "passport";
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');


function loginUser(user, req) {
    return new Promise((res, rej) => {
        user.password = undefined
        user.salt = undefined
        
        req.login(user, async err => {
            if (err) {
                rej(err)
            } else {
                const token = await jwt.sign(user.toObject() , config.env.secret , {expiresIn : config.env.exp})
                res({ id_token :  token})
            }
        })
    })
}

function saveUser(data) {
    return new Promise((res, rej) => {
        let user = new User(data.body);
        user.provider = 'local';
        user.roles = data.roles;
        user.displayname = user.firstname + ' ' + user.lastname;
        user.save(err => {
            if (err) {
                rej({ status: 404,err })
            } else {
                res(user)
            }
        })
    })
}

function userSignInF(req,res,next) {
    return new Promise((res, rej) => {
        passport.authenticate('local', {
            session: false
        }, function (err, user, info) {

            if (err || !user) {
                rej({
                    status: 400,
                    message: 'Invalid username or password.'
                })
            } else {
                res(user)
            }
        })(req, res, next);
    })
}


/*------------------------------------------------------------------*/

export async function signIn(req, res, next) {
    try {
        let user = await userSignInF(req,res,next)
        let signinSuccess = await loginUser(user, req)
        res.json(signinSuccess);
    } catch (error) {
        res.status(error.status).json(error)
    }

}

export function findType(req, res, next, typeP) {
    
    if (typeP == 'admin') {
        req.roles = 'admin';
        next();
    } else {
        req.roles = 'user';
        next();
    }
}
export async function singup(req, res, next) {
    delete req.body.password2;
    try {
        let userData = await saveUser(req) 
        let loginSuccess = await loginUser(userData, req)
        res.json(loginSuccess)
    } catch (error) {
        res.status(error.status).json(error)
    }
}


export function saveOAuthUserProfile(req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, user) => {
        if (err) {
            return done(err)
        } else {
            if (!user) {
                let posibleUsername = profile.username || (profile.email ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(posibleUsername, null, function (availableUsername) {
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save(err => {
                        if (err) {
                            return res.status(404).json(err)
                        }
                        return done(err, user)
                    })
                })
            } else {
                return done(err, user)
            }
        }
    })
    /** */

}