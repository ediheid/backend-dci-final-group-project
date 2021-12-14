import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true 
    },
    description: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    propertyType: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    bookings: {
        type: [Schema.Types.ObjectId],
        ref: 'Booking'
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    amenities: {
        type: String,
        enum: ['WiFi', 'Showers', 'Near to the sea', 'Washer'] //TODO Define all the amenities
    }
    //TODO Add reviews when we reach that feature
}, { timestamps: true })

export const Location = mongoose.model('location', locationSchema)
