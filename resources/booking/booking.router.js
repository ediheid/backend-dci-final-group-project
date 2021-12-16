import { Router } from 'express'
import { findManyBookings, findBooking, createBooking, updateBooking, deleteBooking } from './booking.controllers'

const router = Router()

router.get('/', findManyBookings)

router.get('/:id', findBooking)
router.post('/:id', createBooking)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

export default router