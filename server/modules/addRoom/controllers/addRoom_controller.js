'use strict'

import mongoose from 'mongoose'


const Room = mongoose.model("Room")

function findByIdAsync(param) {
    return new Promise((res, rej) => {
        Room.findById(param).then(suc => {
            if (!suc) {
                rej("Not Found room.")
            } else {
                res(suc)
            }


        }).catch(err => rej("error : " + err))
    })
}

function getRoomFunction(data) {
    return new Promise((res, rej) => {
        let room = new Room(data.body)
        room.userCreate = data.user._id
        room.save(err => {
            if (err) {
                rej("get Room is Error : " + err)
            } else {
                res(room)
            }
        })
        

    })
}

function checkDataUnique(data) {
    return new Promise((res, rej) => {
        Room.find({
            number: data.body.number
        }).then(suc => {
            if (suc.length > 0) {
                rej("Room already exist.")
            } else {
                res(data)
            }
        }).catch(err => rej("Problem is find Room : " + err))
    })
}

/************************************************************** */
export async function addNewRoom(req, res) {
    try {
        let checkData = await checkDataUnique(req)
        let getRoom = await getRoomFunction(checkData)
        res.json(getRoom)
    } catch (error) {
        res.json({
            message : "add room not save : " +error
        })
    }
}

export async function deleteRoom(req, res) {
    try {

        let deleteIn = await Room.findByIdAndRemove(req.roomFound._id)

        res.json({
            message: "Delete Room Success."
        })
    } catch (error) {
        res.json({
            message: "Have problem : " + error
        })
    }
}
export async function updateRoom(req, res) {
    try {
        let updateRoom_ = await Room.findByIdAndUpdate(req.roomFound._id , req.body)
        let getNewRoom = await Room.findById(updateRoom_._id)
        res.json(getNewRoom)
    } catch (error) {
        res.json({
            message: "Update is : " + error
        })

    }
}

export function showRoom(req, res) {

    res.json(req.roomFound)

}
export async function showRooms(req, res) {
    try {
        let rooms = await Room.find()
        res.json(rooms)

    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

export async function getParamRoom(req, res, next, param) {
    try {
        let room = await findByIdAsync(param)
        req.roomFound = room
        next()
    } catch (error) {
        res.json("Params is problem : " + error)
    }
}