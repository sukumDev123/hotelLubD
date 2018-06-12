'use strict'

import mongoose from 'mongoose'


const Room = mongoose.model("Room")


export function showRoom() {

}
export function showRooms(req, res) {
    try {
        let rooms = await Room.find()
        res.json(rooms)
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}