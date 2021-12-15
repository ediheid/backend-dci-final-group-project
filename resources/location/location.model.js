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
        enum: ['Equipment','Barrier-free','Toilet','Electricity','Water connection','Shower','Animals allowed','Grey water disposal','Daily waste disposal','Sink','WLAN','Sauna','Whirlpool','Swimming pool','Washing machine','Surroundings','On a Wieder','On the edge of a field','On the edge of a forest','On a private path','In a courtyard','By a body of water','By a pond','By a river','In a field','In a wood','At a lake','Extras','Seating','Fireplace','Garden','Playground','Farm shop','Battery charging station']
    }
    //TODO Add reviews when we reach that feature
}, { timestamps: true })

export const Location = mongoose.model('location', locationSchema)
