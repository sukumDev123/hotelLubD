'use strict';

import mongoose from 'mongoose';
import config from '../config';
import path from 'path';
function modelPathFunction(){
    config.floder.models.forEach(models => {
        require(path.resolve(models))
    })
}

export function databaseMongoose(){
    mongoose.set('debug',config.env.debug);
    modelPathFunction();
    return new Promise((res,rej) => {
        mongoose.connect(config.env.DB).then(suv => {
            res("Connect DB success...")
        }).catch(err => {
            rej(err)
        })

    } )
}