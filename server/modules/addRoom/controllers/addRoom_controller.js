import mongoose from 'mongoose'
const Room = mongoose.model('Room')

export async function getRoomData(req, res, next) {
    try {
        let find_ = await Room.find().limit(10).sort('-created_at')
        res.json({
            data: find_,
            message: null
        })

    } catch (error) {
        next(error)
    }
}

export async function add_new_room(req, res, next) {
    try {
        if (req.user) {
            let room_ = new Room(req.body)
            room_.userCreate = req.user._id
            let save_ = await room_.save()
            let find_ = await Room.findById(room_.id)
            res.json({
                message: "Add a new room success.",
                data: find_
            })
        } else {
            next({
                status: 401,
                message: "Reqire is not auth."
            })
        }
    } catch (error) {
        next(error)
    }
}
// export function param_show_data(req, res, next, id) {
//     let id_ = id
//     req.num_select = id
//     next()
// }