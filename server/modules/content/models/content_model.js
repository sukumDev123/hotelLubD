'use stricnt';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    adminId : {
        type: Schema.ObjectId
    },
    photo : {
        type : String ,
        required : true
        
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
    update_at : Date
})


mongoose.model('Content' , ContentSchema );

