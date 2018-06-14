'use strict'
import mongoose from "mongoose";
const Booking = mongoose.model('Booking')
const User = mongoose.model('User')


function userOrNotFunc(data) {
    return new Promise((res, rej) => {

        User.find({
            email: data.body.userBooking.email
        }).then(suc => {
            if (!suc.length) {
                res(false)
            } else {
                res(suc[0])
            }
        }).catch(err => rej({
            status: 403,
            message: "Check User or Not User have problem :" + err
        }))
    })
}

function updateAsync(data) {
    return new Promise(async (res, rej) => {
        try {
            let userUpdate = await User.findByIdAndUpdate(data._id, data)
            let getUser = await User.findById(data._id).select("displayname _id email phone reserveNum")

            res(getUser)
        } catch (error) {
            rej(error)
        }
    })
}

function reserveNowFunc(data) {
    return new Promise((res, rej) => {
        let booking = new Booking(data.body)
        booking.checkIn = new Date(booking.checkIn)
        booking.checkOut = new Date(booking.checkOut)

        booking.save(err => {
            if (err) {
                rej(err)
            } else {
                res(booking)
            }
        })



    })
}

/*********** */

export function showA_reser(req, res) {
    if (req.bookingParam) {
        res.json(req.bookingParam)
    }
}
export async function updateReserveRoom(req, res) {
    try {
        let updateBooking = await Booking.findByIdAndUpdate(req.bookingParam._id , req.body)
        let findUser = await Booking.findById(req.bookingParam._id)
        res.json(findUser)
    } catch (error) {
        res.status(403).json(error)
    }
}
export async function deleteReserveRoom(req, res) {
    try {
        let removeBooking = await Booking.findByIdAndRemove(req.bookingParam._id)
        res.json({
            message : "Delete list booking success."
        })
    } catch (error) {
        res.status(403).json(error)
        
    }
}
export async function reserveRoom(req, res) {

    try {
        let userOrNot = await userOrNotFunc(req)
        if (userOrNot) {
            userOrNot.reserveNum += 1
            let checkture = await updateAsync(userOrNot)
            req.body.userBooking = checkture
        }

        let reserveNow = await reserveNowFunc(req)
        res.json(reserveNow)

    } catch (error) {

        console.log(error)
        // res.status(error.status).json(error)

    }
}
export async function historyRoom(req, res) {
    try {
        let bookings = await Booking.find({
            "userBooking._id": req.user._id
        }).sort('-create_at')
        res.json(bookings)
    } catch (error) {
        console.log(error)
    }
}
export async function getParamRoom(req, res, next, paramReser) {

    try {
        let bookParam = await Booking.findById(paramReser)
        if (bookParam) {
            req.bookingParam = bookParam
        }
        next()
    } catch (error) {
        console.log(error)
    }

}