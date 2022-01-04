import { Router } from 'express'
import { findAllLocations, findLocation, createLocation, updateLocation, deleteLocation } from './location.controllers.js'

const router = Router()

router.get('/', findAllLocations)
router.post('/', createLocation)

router.get('/:id', findLocation)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

export default router