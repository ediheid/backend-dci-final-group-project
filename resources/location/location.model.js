import mongoose from 'mongoose'
import { geocoder } from '../../middleware/geocoder.js'

const locationSchema = new mongoose.Schema({
    // name: { 
    //     type: String,
    //     required: true,
    //     unique: true 
    // },
    // description: { 
    //     type: String,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required:true
    // },
    // propertyType: {
    //     type: String,
    //     enum : ['user','admin'],
    //     default: 'user'
    // },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String
    },
    // bookings: {
    //     type: [mongoose.SchemaTypes.ObjectId],
    //     ref: 'Booking'
    // },
    // maxCapacity: {
    //     type: Number,
    //     required: true
    // },
    // amenities: {
    //     type: String,
    //     enum: ['Equipment','Barrier-free','Toilet','Electricity','Water connection','Shower','Animals allowed','Grey water disposal','Daily waste disposal','Sink','WLAN','Sauna','Whirlpool','Swimming pool','Washing machine','Surroundings','On a Wieder','On the edge of a field','On the edge of a forest','On a private path','In a courtyard','By a body of water','By a pond','By a river','In a field','In a wood','At a lake','Extras','Seating','Fireplace','Garden','Playground','Farm shop','Battery charging station']
    // }
    //TODO Add reviews when we reach that feature
}, { timestamps: true })

// Geocode & create location
locationSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc)
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    this.address = undefined;
    next();
  });

export const Location = mongoose.model('location', locationSchema)
