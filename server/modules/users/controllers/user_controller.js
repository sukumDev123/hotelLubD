'use strict';
import mongoose from 'mongoose';
import config from '../../../config/config';
import passport from "passport";
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

export function signIn(req, res, next) {

    passport.authenticate('local', {
        session: false
    }, function (err, user, info) {
        if (err || !user) {
            res.status(400).json({
                status: 400,
                message: 'Invalid username or password.'
            })
        } else {
            user.password = undefined;
            user.salt = undefined;

            req.login(user, {
                session: false
            }, async function (err) {
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: `You're login not success : ${err}`
                    })
                } else {

                    const token = await jwt.sign(user.toObject(), config.env.secret);
                    user.id_token = token
                    return res.json(user);

                }
            })


        }
    })(req, res, next);
}

export function findType(req, res, next, typeP) {
    if(typeP == 'admin'){
        req.roles = 'admin';
        
        next();
    }else{
        req.roles = 'user';
        next();
    }
    

}
export function singup(req, res, next) {
    delete req.body.password2;
    let user = new User(req.body);
    user.provider = 'local';
    user.roles = req.roles;
    user.displayname = user.firstname + ' ' + user.lastname;
    user.save(err => {
        if(err) { 
            return res.status(404).json({
                status : 404 , 
                error: "Can't save... \n" + err
            })
        }else{
            user.password = undefined;
            user.salt = undefined;
            req.login(user, async err => {
                if (err) {
                    user.remove(err => {
                        return err ? res.status(404).json({
                            status : 404 ,
                            message : "Can't remove \n" + err
                        }) : res.json({
                            status: 200 ,
                            message : 'remove...'
                        })
                    })
                    return res.status(404).json({
                        status : 404 ,
                         message : "Can't login \n" + err
                    });
                } else {
                    const token = jwt.sign(user.toObject(), config.env.secret);
                    return res.json({
                        id_token: token
                    })
                }
            })
        }
    })

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