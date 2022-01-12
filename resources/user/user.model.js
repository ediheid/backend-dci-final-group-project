import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
        street: { type: String },
        number: { type: Number },
        city: { type: String },
        postcode: { type: Number }
    },
    birthday: {
        type: Date,
        // required: true
    },
    locations: [
        { 
            type: mongoose.SchemaTypes.ObjectId,
            required: true, 
            ref: 'Location'
        }
    ],
    
    bookings: [
        { 
            type: mongoose.SchemaTypes.ObjectId,
            required: true, 
            ref: 'Bookings'
        }
    ],

    verified: {
        type: Boolean, 
        default: false
    },
    verificationToken: {
        type: String 
    } 

    //TODO Add reviews when we reach that feature
    //TODO Add wishlist when we reach that feature

}, { timestamps: true })

export const User = mongoose.model('user', userSchema)