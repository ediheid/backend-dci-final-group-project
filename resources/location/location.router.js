import { Router } from 'express'
import { findManyLocations, findLocation, createLocation, updateLocation, deleteLocation, confirmLocation, getLocationCards } from './location.controllers.js'
import upload from '../../middleware/upload.js'

const router = Router()

router.post('/', upload, createLocation)

router.post('/find', findManyLocations)

router.get('/confirm', confirmLocation)

router.get('/cards', getLocationCards)

router.get('/:id', findLocation)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

export default router