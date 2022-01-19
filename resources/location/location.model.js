import mongoose from "mongoose";
import { geocoder } from "../../middleware/geocoder.js";

const locationSchema = new mongoose.Schema(
  {
    host: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
    propertyType: {
      type: Array,
      // enum : ['Field','Forest', 'Lake', 'River'],
      default: [],
    },
    spaceType: {
      type: String,
      required: true,
    },
    //!ADDRESS ===============================================
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
      formattedAddress: String,
      streetNumber: Number,
      streetName: String,
      city: String,
      zipcode: Number,
      region: String,
      regionCode: String,
      country: String,
      countryCode: String,
    },
    img: String,
    id: String,
    //!======================================================
    maxCapacity: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    essentialAmenities: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    regionalDescription: {
      type: String,
      required: true,
    },
    houseRules: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cancellation: {
      type: String,
      required: true,
    },
    bookings: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Booking",
    },
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
    streetNumber: loc[0].streetNumber,
    streetName: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    region: loc[0].administrativeLevels.level1long,
    regionCode: loc[0].administrativeLevels.level1short,
    country: loc[0].country,
    countryCode: loc[0].countryCode,
  };

  // Do not save address
  this.address = undefined;
  next();
});

export const Location = mongoose.model("location", locationSchema);
