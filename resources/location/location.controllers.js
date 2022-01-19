import { Location } from "./location.model.js";
import { geocoder } from "../../middleware/geocoder.js";
import GreatCircle from "great-circle";
import { response } from "express";

export const confirmLocation = async (req, res) => {
  try {
    const query = Object.values(req.body);

    let coordinates;

    if (query.length !== 0) {
      coordinates = await geocoder.geocode(query[0]);
    }

    const returnedLocation = {
      // id: item.id,
      title: "Your location",
      type: "point",
      address: coordinates[0].formattedAddress,
      coordinates: [coordinates[0].longitude, coordinates[0].latitude],
    };

    console.log(returnedLocation);
    res.send({ returnedLocation });
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const findManyLocations = async (req, res) => {
  try {
    console.log("req body find many", req.body);
    // let query = Object.values(req.body.locationSearchName)
    // let query = req.body.locationSearchName;
    let query = "";
    console.log("query", typeof query); // string

    let locations, closestLocation;

    if (query === "") {
      locations = await Location.find({ formattedAddress: "Schwarzwald" });
      console.log(locations);
    } else {
      locations = await Location.find({ title: { $regex: query } });

      if (locations.length !== 0) {
        query = locations[0].location.formattedAddress;
      }

      // TODO take out of the else to use in the empty query
      const coordinates = await geocoder.geocode(query);
      const range = 5;
      const queryLatitude = coordinates[0].latitude;
      const queryLongitude = coordinates[0].longitude;
      const minLat = queryLatitude - range;
      const maxLat = queryLatitude + range;
      const minLon = queryLongitude - range;
      const maxLon = queryLongitude + range;

      locations = await Location.find({
        $and: [
          { "location.coordinates.0": { $gte: minLon } },
          { "location.coordinates.0": { $lte: maxLon } },
          { "location.coordinates.1": { $gte: minLat } },
          { "location.coordinates.1": { $lte: maxLat } },
        ],
      });

      closestLocation = locations.reduce((prev, curr) =>
        GreatCircle.distance(
          curr.location.coordinates[1],
          curr.location.coordinates[0],
          queryLatitude,
          queryLongitude
        ) <
        GreatCircle.distance(
          prev.location.coordinates[1],
          prev.location.coordinates[0],
          queryLatitude,
          queryLongitude
        )
          ? curr
          : prev
      );
    }

    const returnedLocations = locations.map((item) => {
      let location = {
        _id: item._id,
        id: item.id,
        title: item.title,
        type: "point",
        coordinates: item.location.coordinates,
        city: item.location.city,
        country: item.location.country,
        pricePerNight: item.pricePerNight,
        description: item.description,
      };
      return location;
    });

    // const returnedClosestLocation = {
    //   coordinates: closestLocation.location.coordinates
    // }

    res.send({ returnedLocations });
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const findLocation = async (req, res) => {
  //TODO
  //find by address?
  try {
    const location = await Location.findOne({ _id: req.params.id });
    // .select("title formattedAddress property")

    if (!location) return next(createError.NotFound());

    console.log("SPECIFICLOC", location);
    res.status(200).json(location);
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const createLocation = async (req, res) => {
  //TODO
  // what fields cant be duplicate?
  try {
    const parsedBody = JSON.parse(req.body.locationData);

    console.log(req.file);

    const requestLocation = {
      propertyType: parsedBody.propertyType,
      spaceType: parsedBody.spaceType,
      address: parsedBody.address,
      maxCapacity: parsedBody.maxCapacity,
      amenities: parsedBody.amenities,
      essentialAmenities: parsedBody.essentialAmenities,
      title: parsedBody.title,
      description: parsedBody.description,
      regionalDescription: parsedBody.regionalDescription,
      houseRules: parsedBody.houseRules,
      price: parsedBody.price,
      cancellation: parsedBody.cancellation,
      id: req.file.filename.split(".")[0],
    };

    const location = await Location.create(requestLocation);

    // await location.save();

    console.log(requestLocation);

    const response = {
      created: true,
    };

    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This location already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    res.status(200).json({ data: location }); // ? use namedspace?
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const removed = await Location.findOneAndRemove({
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};
