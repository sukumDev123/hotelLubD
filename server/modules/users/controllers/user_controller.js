import mongoose from 'mongoose';
import config from '../../../config/config';
import passport from "passport";
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const check_remember = (user, remember) => new Promise(async (res, rej) => {

    try {
        if (remember) {
            const token = await jwt.sign(user, config.env.secret , {
                expiresIn : config.env.expremember
            } ) 
            res(token)

        } else {
            const token = await jwt.sign(user, config.env.secret, {
                expiresIn: config.env.exp
            })
            res(token)
        }


    } catch (error) {
        rej(error)
    }
})

function loginUser(user, req, remember) {
    return new Promise((res, rej) => {
        user.password = undefined
        user.salt = undefined

        req.login(user, async err => {
            if (err) {
                rej(err)
            } else {
                try {
                    const token = await check_remember(user.toObject(), remember)
                    res({
                        id_token: token
                    })
                } catch (error) {
                    rej(error)
                }
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
                rej({
                    status: 404,
                    err
                })
            } else {
                res(user)
            }
        })
    })
}

function userSignInF(req, res, next) {
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
        let remember = req.body.remember
        req.body.remember = undefined
        let user = await userSignInF(req, res, next)
        let signinSuccess = await loginUser(user, req, remember)
        res.json(signinSuccess);
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error)
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
        let loginSuccess = await loginUser(userData, req, false)
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