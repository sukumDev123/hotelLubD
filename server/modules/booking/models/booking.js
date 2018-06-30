import mongoose from 'mongoose'
const Schema = mongoose.Schema



const BookingSchema = new Schema({
    userBooking: {},
    room: [],
    create_at: {
        type: Date,
        default: Date.now

    },
    status: {
        type: Boolean,
        default: false
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})




mongoose.model('Booking', BookingSchema)