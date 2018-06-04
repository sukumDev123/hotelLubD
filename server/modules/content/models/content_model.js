'use stricnt';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    adminId : {
        type: Schema.ObjectId,
        ref: 'User'
    },
    tital : {
        type : String , 
        required : true ,
        unique : true
    },
    detail : {
        type : String,
        required : true
    },
    create_at : {
        type : Date,
        default : Date.now
    },
    update_at : String
})


mongoose.model('Content' , ContentSchema );

