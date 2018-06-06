'use strict';

import mongoose from 'mongoose';
import config from '../config';
import path from 'path';
function modelPathFunction(){
    config.floder.models.forEach(models => {
        require(path.resolve(models))
        console.log(models)
    })
}

export async function databaseMongoose(){
    mongoose.set('debug',config.env.debug);
    let error = null;
    let db;
    try {
        db = await mongoose.connect(config.env.DB);
        modelPathFunction();
    } catch (err) {
        error = err;
    }

    return new Promise((resolve , reject) => {
        if(error == null){
            resolve(`connect ${config.env.DB}`);
        }else{
            reject(`Mongoose File : ${error}`)
        }
    })
}