import { Location } from "./location.model.js";
import { Picture } from "../picture/picture.model.js"
import { geocoder } from "../../middleware/geocoder.js";
import GreatCircle from "great-circle";

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

export const findAllLocations = async (req, res) => {
  try {
    // let query = "";

    const closestLocation = {
      location: { coordinates: { lat: 51.1657, lng: 10.4515 } },
    };

    const locations = await Location.find({});

    const returnedLocations = locations.map((item) => {
      let location = {
        _id: item._id,
        id: item.id,
        img: item.img,
        title: item.title,
        type: "point",
        coordinates: item.location.coordinates,
        city: item.location.city,
        country: item.location.country,
        pricePerNight: item.price,
        description: item.description,
      };
      return location;
    });

    const returnedClosestLocation = {
      coordinates: closestLocation.location.coordinates,
    };

    res.send({ returnedLocations, returnedClosestLocation });
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const findManyLocations = async (req, res) => {
  try {
    console.log("req body find many", req.body);
    // let query = Object.values(req.body.locationSearchName)
    let query = req.body.locationSearchName;
    // let query = "";
    console.log("query", typeof query); // string

    let locations, closestLocation;

    if (query === "") {
      locations = await Location.find({});
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
        img: item.img,
        title: item.title,
        type: "point",
        coordinates: item.location.coordinates,
        city: item.location.city,
        country: item.location.country,
        pricePerNight: item.price,
        description: item.description,
      };
      return location;
    });

    const returnedClosestLocation = {
      coordinates: closestLocation.location.coordinates
    }

    res.send({ returnedLocations, returnedClosestLocation });
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const findLocation = async (req, res, next) => {
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

export const getLocationCards = async (req, res, next) => {
  console.log("Test");
  try {
    const locations = await Location.find().sort({ createdAt: -1 }).limit(6);

    if (!locations) return next(createError.NotFound());

    // console.log("SPECIFICLOC", locations);
    res.status(200).json(locations);
    console.log(locations);
  } catch (e) {
    console.error(e);
    res.status(400).end(); // TODO create error
  }
};

export const createLocation = async (req, res) => {
  try {
    const parsedBody = JSON.parse(req.body.locationData);

    const img = await Picture.create({ buffer: req.file.buffer, mimetype: req.file.mimetype, encoding: req.file.encoding, originalname: req.file.originalname, fieldname: req.file.fieldname });

    const requestLocation = {
      host: parsedBody.host,
      userId: parsedBody.userId,
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
      img: img._id.toString(),
      // id: req.file.filename.split(".")[0],
    };

    const location = await Location.create(requestLocation);

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
