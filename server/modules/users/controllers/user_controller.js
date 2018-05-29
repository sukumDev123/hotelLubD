'use strict';
import mongoose from 'mongoose';
import config from '../../../config/config';
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

export class UserController {
    signIn(req, res, next) {
        passport.authenticate('local', { session: false }, function (err, user, info) {
            if (err || !user) {
                res.status(400).json(
                    {
                        status: 400,
                        message: 'Invalid username or password.'
                    }
                )
            } else {
                user.password = undefined;
                user.salt = undefined;

                req.login(user, { session: false }, async function (err) {
                    if (err) {
                        return res.status(400).json({
                            status: 400,
                            message: `You're login not success : ${err}`
                        })
                    } else {

                        const token = await jwt.sign(user.toObject(), config.env.secret);
                        return res.json({ id_token: token });

                    }
                })


            }
        })(req, res, next);
    }
    signUp(req, res, next) {
        let user = new User(req.body);
        user.provider = 'local';
        user.displayname = user.firstname + ' ' + user.lastname;
        user.roles = 'user';
        User.create(user).then(userInfo => {
            req.login(userInfo, async err => {
                if (err) {
                    return res.status(404).json(err);
                }
                else {
                    const token = jwt.sign(user.toObject(), config.env.secret);
                    return res.json({
                        id_token: token
                    })
                }
            })
        }).catch(err => {
            return res.status(404).json(344);
        })

    }


    saveOAuthUserProfile(req, profile, done) {
        User.findOne({
            provider: profile.provider,
            providerId: profile.providerId
        }, (err, user) => {
            if (err) {
                return done(err)
            } else {
                if (!user) {
                    let posibleUsername = profile.username || (profile.email ? profile.email.split('@')[0] : '');
                    User.findUniqueUsername(posibleUsername,null , function (availableUsername)  {
                        profile.username = availableUsername;
                        user = new User(profile);
                        user.save(err => {
                            if(err) {
                                return res.status(404).json(err)
                            }
                            return done(err,user)
                        })
                    })
                } else {
                    return done(err, user)
                }
            }
        })
        /** */
    }
}