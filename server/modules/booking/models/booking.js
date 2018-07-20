import mongoose from 'mongoose'
const Schema = mongoose.Schema



const BookingSchema = new Schema({
    user_booking: {},
    room: [],
    create_at: {
        type: Date,
        default: Date.now

    },

    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    night_num: {
        type: Number,
        required: true
    },
    status_enroll: {
        type: Boolean,
        default: false
    }
})




mongoose.model('Booking', BookingSchema)