import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PathPhoto = new Schema({
    photoMain : String ,
    photosub : [] ,
    created_at : {
        type:Date,
        default : Date.now
    } ,
    update_at : Date
})

mongoose.model("PhotoPath" , PathPhoto) 