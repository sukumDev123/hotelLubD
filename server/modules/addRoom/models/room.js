'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema


const RoomSchema = new Schema({
    name : {
        type : String 
    } ,
    number : {
        type : Number ,
        unique : true ,
        required : true        
    }
    ,
    create_at : {
        type : Date ,
        default : Date.now
    } ,
    create_from : {
        type : Schema.ObjectId ,
        required : true
    } ,
    live : {
        type : Boolean ,
        default : false
    },
    liveDate : {
        type : Date 
    },
    liveLatest : {
        type : Date 
    },
    liveNum : {
        type : Number ,
        default : 0
    }
})


mongoose.model('Room' , RoomSchema)

