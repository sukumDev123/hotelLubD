import mongoose from 'mongoose';
import path from 'path';
import jwt from 'jsonwebtoken';
//const User = mongoose.model('User');


export function checkUserLogin(req,res,next) {

    console.log(req.header());
    
}