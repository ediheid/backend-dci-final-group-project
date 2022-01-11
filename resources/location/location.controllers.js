import { Location } from './location.model.js'

export const findAllLocations = async (req,res) => {
    //TODO
    // Find all, restrict by region?
    try {

      const locations = await Location.find({})

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

      console.log(returnedLocations)
      res.send({returnedLocations})

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