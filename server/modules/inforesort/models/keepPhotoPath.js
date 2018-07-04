import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PathPhoto = new Schema({
    photoMain : String ,
    photosub : []
})

mongoose.model("PhotoPath" , PathPhoto) 