import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    address: {
        street: String,
        number: Number,
        city: String,
        postcode: Number
    },
    birthday: {
        type: Date,
        // required: true
    },
    locations: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Location'
    },
    bookings: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Booking'
    },
    verification: {
        type: Boolean, default: false
    } 
    //TODO Add reviews when we reach that feature
    //TODO Add wishlist when we reach that feature

}, { timestamps: true })

export const User = mongoose.model('user', userSchema)