import { Location } from './location.model.js'
import { geocoder } from '../../middleware/geocoder.js'
import GreatCircle from 'great-circle'

export const confirmLocation = async (req,res) => {
  try {
    const query = Object.values(req.body)

    let coordinates

    if (query.length !== 0) {
      coordinates = await geocoder.geocode(query[0]);
      console.log(coordinates)
    } 
  
  const returnedLocation = {
        // id: item.id,
        title: "Your location",
        type: "point",
        address: coordinates[0].formattedAddress,
        coordinates: [coordinates[0].longitude, coordinates[0].latitude]
      }

    console.log(returnedLocation)
    res.send({returnedLocation})

  } catch (e) {
    console.error(e)
    res.status(400).end() // TODO create error
  }
}

export const findAllLocations = async (req,res) => {
    //TODO
    // Find All?
    try {
      const query = Object.values(req.body)

      let locations, closestLocation

      if (query.length === 0) {
        locations = await Location.find({})
      } else {
        console.log(query)
        // TODO uncomment for the name of the property
        // locations = await Location.find({name: {$regex: query[0]}})
        
        const coordinates = await geocoder.geocode(query[0]);
        const range = 5
        const queryLatitude = coordinates[0].latitude
        const queryLongitude = coordinates[0].longitude
        const minLat = queryLatitude - range
        const maxLat = queryLatitude + range
        const minLon = queryLongitude - range
        const maxLon = queryLongitude + range

        locations = await Location.find({ $and: [
          { "location.coordinates.0" : { $gte: minLon } },
          { "location.coordinates.0" : { $lte: maxLon } },
          { "location.coordinates.1" : { $gte: minLat } },
          { "location.coordinates.1" : { $lte: maxLat } }
        ]})
        

        closestLocation = locations.reduce((prev, curr) => GreatCircle.distance(curr.location.coordinates[1], curr.location.coordinates[0], queryLatitude, queryLongitude) < GreatCircle.distance(prev.location.coordinates[1], prev.location.coordinates[0], queryLatitude, queryLongitude) ? curr : prev);
        
        
      }
  
    const returnedLocations = locations.map(item => {
        let location = {
          id: item.id,
          title: item.name,
          type: "point",
          address: item.location.formattedAddress,
          coordinates: item.location.coordinates          
          // img: item.propertyType,
          // link: item.bookings
        }
        return location;
      }
      )
      // console.log("returnedLocations")
      // console.log(returnedLocations)
      // console.log("closestLocation") 
      // console.log(closestLocation) 
      res.send({returnedLocations,closestLocation})

    } catch (e) {
      console.error(e)
      res.status(400).end() // TODO create error
    }
}

export const findLocation = async (req,res) => {
    //TODO
    //find by address?
    try {
      const location = await User.findOne({  }) // TODO what parameters
    } catch (e) {
      console.error(e)
      res.status(400).end() // TODO create error
    }
}

export const createLocation = async (req,res) => {
    //TODO
    // what fields cant be duplicate?
      try {
        const requestLocation = {
          name: req.body.name,
          address: req.body.address,
          id: req.file.filename.split(".")[0]
        }
        const location = await Location.create(requestLocation);
    

        return res.status(201).json({
          success: true,
          data: location
        });
      } catch (err) {
        console.error(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'This store already exists' });
        }
        res.status(500).json({ error: 'Server error' });
      }
}

export const updateLocation = async (req,res) => {
  try {
    const location = await Location.findByIdAndUpdate({_id: req.params.id}, req.body, {
      new: true
    })
      .lean()
      .exec()

    res.status(200).json({ data: location }) // ? use namedspace?
  } catch (e) {
    console.error(e)
    res.status(400).end() // TODO create error
  }
}

export const deleteLocation = async (req,res) => {
    try {
        const removed = await Location.findOneAndRemove({
          _id: req.params.id
        })
    
        if (!removed) {
          return res.status(400).end()
        }
    
        return res.status(200).json({ data: removed })
      } catch (e) {
        console.error(e)
        res.status(400).end() // TODO create error
      }
}