import mongoose from "mongoose";
import { geocoder } from "../../middleware/geocoder.js";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
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
      required: [true, "Please add an address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    id: String,
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
    //     enum: ['Barrier-free','Lavatory', 'Showers', 'Electricity supply','Water supply','Animals welcome','Grey water disposal','Daily waste disposal','Basin','WiFi','Sauna','Whirlpool','Swimming pool','Washing machine', 'On a private path','In a courtyard','By a body of water','By a pond','By a river','On a field','In the woods','Outdoor seating area','Fireplace','Garden','Playground','Basic supplies available to purchase','Battery charging station']
    // }
    //TODO Add reviews when we reach that feature
  },
  { timestamps: true }
);

// Geocode & create location
locationSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  // Do not save address
  this.address = undefined;
  next();
});

export const Location = mongoose.model("location", locationSchema);
