import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    date: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'booked'] //TODO Do we need more?
    },
    user: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    location: {
        type: [Schema.Types.ObjectId],
        ref: 'Location'
    }
    //TODO Add messages when we reach that feature
    //TODO Add payment when we reach that feature


}, { timestamps: true })

export const Booking = mongoose.model('booking', bookingSchema)