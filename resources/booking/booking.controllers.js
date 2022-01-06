import { Booking } from './booking.model'

export const findManyBookings = async (req,res) => {
    //TODO
    // find bookings of one location
}

export const findBooking = async (req,res) => {
    //TODO
}

export const createBooking = async (req,res) => {
    //TODO
    // create the logic of availability
}

export const updateBooking = async (req,res) => {
    try {
        const booking = await Booking.findByIdAndUpdate({_id: req.params.id}, req.body, {
          new: true
        })
          .lean()
          .exec()
    
        res.status(200).json({ data: booking }) // ? use namedspace?
      } catch (e) {
        console.error(e)
        res.status(400).end() // TODO create error
      }
}

export const deleteBooking = async (req,res) => {
    try {
        const removed = await Booking.findOneAndRemove({
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