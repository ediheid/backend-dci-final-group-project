import { Router } from 'express'
import { findManyBookings, findBooking, createBooking, updateBooking, deleteBooking } from './booking.controllers'

const router = Router()

router.get('/', findManyBookings)
router.post('/', createBooking)

router.get('/:id', findBooking)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

export default router