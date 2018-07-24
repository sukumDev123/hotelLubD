import mongoose from "mongoose";
const Booking = mongoose.model('Booking')
const User = mongoose.model('User')
const Room = mongoose.model('Room')

function userOrNotFunc(data) {
    return new Promise((res, rej) => {

        User.find({
            email: data.body.user_booking.email
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
    return new Promise(async (res, rej) => {
        console.log(data.body)
        let data_real = {
            user_booking: data.body.user_booking,
            room: data.body.room,
            create_at: data.body.create_at,
            check_in: data.body.check_in,
            check_out: data.body.check_out,
            total_price: data.body.total_price,
            night_num: data.body.night_num
        }
        let booking = new Booking(data_real)
        try {
            let save_ = await booking.save()

            res({
                message: 'Save booking list success.',
                status: 200,
                data: booking
            })
        } catch (error) {
            rej(error)
        }


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
        let updateBooking = await Booking.findByIdAndUpdate(req.bookingParam._id, req.body)
        let findUser = await Booking.findById(req.bookingParam._id)
        res.json(findUser)
    } catch (error) {
        res.status(403).json(error)
    }
}
export async function deleteReserveRoom(req, res) {
    try {
        let removeBooking = await Booking.findByIdAndRemove(req.bookingParam._id)
        let bookings = await Booking.find().limit(10)
        let num = await Booking.count()
        res.json({
            data_list: bookings,
            status: 200,
            size: num,
            message: "Delete list booking success."
        })
    } catch (error) {
        res.status(403).json(error)

    }
}
export function roomDateSetInSetOut(cI, cO, dataroom) {
    return new Promise((res, rej) => {
        try {
            let room_find = []
            dataroom.forEach(async room_id => {
                let find_by_id = await Room.findById(room_id).select("liveDate liveLatest _id")
                find_by_id.liveDate.push(cI) // check in date 
                find_by_id.liveLatest.push(cO)
                find_by_id.save()
            }) // room all reser
            res(true)
        } catch (error) {
            rej({
                message: error ? JSON.stringify(error) : "Room Save is problum",
                status: 503
            })
        }
    })
}
export async function reserveRoom(req, res) {

    try {

        let userOrNot = await userOrNotFunc(req) // check is user or not user
        if (userOrNot) { // if user +1 reservenum
            userOrNot.reserveNum += 1
            let checkture = await updateAsync(userOrNot) // update and find user
            req.body.user_booking = checkture
        }

        let roomCreateDate = roomDateSetInSetOut(req.body.check_in, req.body.check_out, req.body.room) // set room checkin date and checkout date

        let reserveNow = await reserveNowFunc(req) // booking success.
        res.json({
            message: reserveNow.message,
            status: reserveNow.status,
            datacall: reserveNow.data
        })

    } catch (error) {

        console.log(error)
        // res.status(error.status).json(error)

    }
}
export async function historyRoom(req, res, next) {
    try {

        if (req.query.start) {
            let bookings = await Booking.find().sort('-create_at').limit(10).skip(parseInt(req.query.start))
            let num = await Booking.count()
            res.json({
                data_list: bookings,
                message: "Find success.",
                status: 200,
                size: num
            })

        } else {
            next({
                message: "query string is not support",
                status: 400
            })
        }

    } catch (error) {
        next(error)
    }
}
export function getBookingOneList(req, res, next) {
    res.status(200).json(req.bookingParam)
}
export async function getParamRoom(req, res, next, paramReser) {

    try {
        let bookParam = await Booking.findById(paramReser)
        if (bookParam) {
            req.bookingParam = bookParam
        }
        next()
    } catch (error) {
        next({
            message: JSON.stringify(error),
            status: 400
        })
    }

}