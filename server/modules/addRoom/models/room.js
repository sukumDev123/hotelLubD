
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
   
   
    liveDate : {
        type : Date 
    },
    liveLatest : {
        type : Date 
    },
    liveNum : {
        type : Number ,
        default : 0
    },
    userCreate : {
        type : Schema.ObjectId 
    }, 
    priceRoom : {
        type : Number , 
        default : 0 
    },
    type : String
})



mongoose.model('Room' , RoomSchema)

