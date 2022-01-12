import { Router } from 'express'
import { findAllLocations, findLocation, createLocation, updateLocation, deleteLocation, confirmLocation } from './location.controllers.js'
import upload from '../../middleware/upload.js'

const router = Router()

router.get('/', findAllLocations)
router.post('/', upload, createLocation)

router.get('/confirm', confirmLocation)

router.get('/:id', findLocation)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

export default router