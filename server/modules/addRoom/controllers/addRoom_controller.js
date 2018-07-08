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
export async function edit_room(req, res, next) {
    try {
        let room_ = req.room_id
        let room_find_update = await Room.findByIdAndUpdate(room_._id,  req.body )
        let find_new_update_data = await Room.findById(room_._id)
        res.json({
            message: "Update date Success",
            data: find_new_update_data
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
export async function delete_room(req,res,next) {
    try {
        let id_room = req.room_id
        let delete_this_room = await Room.findByIdAndRemove(id_room)
        let find_ = await Room.find().limit(10).sort('-created_at')
        res.json({
            message : "Delete Room success.",
            data : find_
        })
    } catch (error) {
        next(error)
    }
}
export async function param_id_room(req, res, next, id) {
    try {
        let find_by_id = await Room.findById(id).select('_id')
        req.room_id = find_by_id._id
        next()
    } catch (error) {
        next(error)
    }
}
// export function param_show_data(req, res, next, id) {
//     let id_ = id
//     req.num_select = id
//     next()
// }