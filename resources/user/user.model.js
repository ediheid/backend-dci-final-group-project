import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        street: String,
        number: Number,
        city: String,
        postcode: Number
    },
    birthday: {
        type: Date,
        required: true
    },
    locations: {
        type: [Schema.Types.ObjectId],
        ref: 'Location'
    },
    bookings: {
        type: [Schema.Types.ObjectId],
        ref: 'Booking'
    }
    //TODO Add reviews when we reach that feature
    //TODO Add wishlist when we reach that feature

}, { timestamps: true })

export const User = mongoose.model('user', userSchema)