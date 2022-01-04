import { Location } from './location.model.js'

export const findAllLocations = async (req,res) => {
    //TODO
    // Find all, restrict by region?
}

export const findLocation = async (req,res) => {
    //TODO
    //find by address?
}

export const createLocation = async (req,res) => {
    //TODO
    // what fields cant be duplicate?
    
      try {
        const location = await Location.create(req.body);
    
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